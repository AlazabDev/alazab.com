import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Webhook verify token - set this in your Meta App dashboard
const VERIFY_TOKEN = 'alazab_whatsapp_verify_2024';

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);

  // GET = Webhook verification (Meta sends this to verify the endpoint)
  if (req.method === 'GET') {
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verified successfully');
      return new Response(challenge, { status: 200, headers: corsHeaders });
    }

    return new Response('Forbidden', { status: 403, headers: corsHeaders });
  }

  // POST = Incoming webhook events
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      console.log('Webhook event received:', JSON.stringify(body));

      // Process WhatsApp messages
      if (body.object === 'whatsapp_business_account') {
        const entries = body.entry || [];

        for (const entry of entries) {
          const changes = entry.changes || [];

          for (const change of changes) {
            if (change.field === 'messages') {
              const value = change.value;
              const messages = value.messages || [];
              const statuses = value.statuses || [];

              // Handle incoming messages
              for (const message of messages) {
                console.log('Incoming message:', {
                  from: message.from,
                  type: message.type,
                  timestamp: message.timestamp,
                  text: message.text?.body,
                });

                // TODO: Store message in database or forward to your app
              }

              // Handle message status updates
              for (const status of statuses) {
                console.log('Status update:', {
                  id: status.id,
                  status: status.status,
                  recipient: status.recipient_id,
                });
              }
            }
          }
        }
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error: unknown) {
      console.error('Webhook processing error:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      return new Response(
        JSON.stringify({ error: message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }

  return new Response('Method not allowed', { status: 405, headers: corsHeaders });
});
