import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-hub-signature-256",
};

const VERIFY_TOKEN = Deno.env.get("WHATSAPP_WEBHOOK_VERIFY_TOKEN");
const PAGE_ACCESS_TOKEN = Deno.env.get("FACEBOOK_PAGE_ACCESS_TOKEN");
const APP_SECRET = Deno.env.get("FACEBOOK_APP_SECRET");

// HMAC-SHA256 signature verification
async function verifySignature(rawBody: string, signature: string | null, secret: string): Promise<boolean> {
  if (!signature) return false;
  const expected = signature.replace("sha256=", "");
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  const hex = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
  return hex === expected;
}

serve(async (req) => {
  const url = new URL(req.url);
  const path = url.pathname;

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Determine platform from path
  const platform = path.includes("/facebook") ? "facebook" : path.includes("/meta") ? "meta" : "unknown";

  // ─── GET: Webhook Verification (shared for Meta/Facebook) ───
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log(`✅ [${platform}] Webhook verified`);
      return new Response(challenge, { status: 200 });
    }

    console.warn(`❌ [${platform}] Verification failed`);
    return new Response("Forbidden", { status: 403 });
  }

  // ─── POST: Incoming Events ───
  if (req.method === "POST") {
    const rawBody = await req.text();

    // Signature verification
    if (APP_SECRET) {
      const sig = req.headers.get("x-hub-signature-256");
      const valid = await verifySignature(rawBody, sig, APP_SECRET);
      if (!valid) {
        console.error(`❌ [${platform}] Invalid signature`);
        return new Response("Invalid signature", { status: 401 });
      }
    }

    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return new Response("Bad Request", { status: 400 });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    try {
      // Store raw event
      const eventHash = await hashEvent(rawBody);
      await supabase.from("webhook_events").insert({
        source: `azabot-${platform}`,
        payload: body,
        raw_body: rawBody.length > 50000 ? null : rawBody,
        signature: req.headers.get("x-hub-signature-256") || null,
        event_hash: eventHash,
      });

      // ─── Facebook Messenger Events ───
      if (platform === "facebook" && body.object === "page") {
        for (const entry of body.entry || []) {
          // Messaging events
          for (const event of entry.messaging || []) {
            const senderId = event.sender?.id;
            const message = event.message;

            if (message && senderId) {
              console.log(`📩 [FB] Message from ${senderId}: ${message.text || "[media]"}`);

              // Auto-reply (simple echo for now)
              if (PAGE_ACCESS_TOKEN && message.text) {
                await sendFacebookReply(senderId, `شكراً لتواصلك معنا! سنرد عليك قريباً. 🏗️`, PAGE_ACCESS_TOKEN);
              }
            }

            // Postback handling
            if (event.postback) {
              console.log(`🔘 [FB] Postback from ${senderId}: ${event.postback.payload}`);
            }
          }
        }

        return new Response(JSON.stringify({ success: true, platform }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // ─── Meta/Instagram Events ───
      if (platform === "meta") {
        const objectType = body.object;
        console.log(`📨 [Meta] Event type: ${objectType}`);

        // Instagram messaging
        if (objectType === "instagram") {
          for (const entry of body.entry || []) {
            for (const event of entry.messaging || []) {
              const senderId = event.sender?.id;
              const message = event.message;

              if (message && senderId) {
                console.log(`📩 [IG] Message from ${senderId}: ${message.text || "[media]"}`);
              }
            }
          }
        }

        return new Response(JSON.stringify({ success: true, platform }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Generic fallback
      console.log(`ℹ️ [${platform}] Unhandled object: ${body.object}`);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (error: unknown) {
      console.error(`❌ [${platform}] Error:`, error);
      return new Response(
        JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }

  return new Response("Method not allowed", { status: 405, headers: corsHeaders });
});

async function hashEvent(body: string): Promise<string> {
  const data = new TextEncoder().encode(body);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("").slice(0, 64);
}

async function sendFacebookReply(recipientId: string, text: string, token: string) {
  try {
    const resp = await fetch(`https://graph.facebook.com/v25.0/me/messages?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text },
      }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      console.error("FB send error:", err);
    } else {
      console.log(`✅ [FB] Reply sent to ${recipientId}`);
    }
  } catch (err) {
    console.error("FB send exception:", err);
  }
}
