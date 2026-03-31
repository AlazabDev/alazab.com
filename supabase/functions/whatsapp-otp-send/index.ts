import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const WHATSAPP_API = "https://graph.facebook.com/v21.0";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { phone_number } = await req.json();

    if (!phone_number || !/^\+?\d{10,15}$/.test(phone_number.replace(/[\s\-]/g, ""))) {
      return new Response(
        JSON.stringify({ error: "رقم هاتف غير صالح" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const cleanPhone = phone_number.replace(/[\s\-\+]/g, "");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const whatsappToken = Deno.env.get("WHATSAPP_ACCESS_TOKEN");
    const phoneNumberId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");

    if (!whatsappToken || !phoneNumberId) {
      console.error("Missing WhatsApp credentials");
      return new Response(
        JSON.stringify({ error: "خطأ في إعداد النظام" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    // Rate limit: max 3 OTPs per phone per 10 minutes
    const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("otp_codes")
      .select("*", { count: "exact", head: true })
      .eq("phone_number", cleanPhone)
      .gte("created_at", tenMinAgo);

    if ((count ?? 0) >= 3) {
      return new Response(
        JSON.stringify({ error: "تم تجاوز عدد المحاولات، حاول بعد 10 دقائق" }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 min

    // Store OTP
    const { error: insertError } = await supabase.from("otp_codes").insert({
      phone_number: cleanPhone,
      otp_code: otp,
      expires_at: expiresAt,
    });

    if (insertError) {
      console.error("OTP insert error:", insertError.message);
      return new Response(
        JSON.stringify({ error: "خطأ في حفظ رمز التحقق" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send via WhatsApp Cloud API - Authentication Template
    const waResponse = await fetch(
      `${WHATSAPP_API}/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${whatsappToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: cleanPhone,
          type: "template",
          template: {
            name: "otp_verification",
            language: { code: "ar" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: otp },
                ],
              },
              {
                type: "button",
                sub_type: "url",
                index: "0",
                parameters: [
                  { type: "text", text: otp },
                ],
              },
            ],
          },
        }),
      }
    );

    const waData = await waResponse.json();

    if (!waResponse.ok) {
      console.error("WhatsApp API error:", JSON.stringify(waData));
      
      // Fallback: send as regular text message
      const fallbackResponse = await fetch(
        `${WHATSAPP_API}/${phoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${whatsappToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: cleanPhone,
            type: "text",
            text: {
              body: `رمز التحقق الخاص بك من العزب للمقاولات: ${otp}\n\nصالح لمدة 5 دقائق. لا تشارك هذا الرمز مع أحد.`,
            },
          }),
        }
      );

      const fallbackData = await fallbackResponse.json();
      if (!fallbackResponse.ok) {
        console.error("WhatsApp fallback error:", JSON.stringify(fallbackData));
        return new Response(
          JSON.stringify({ error: "فشل إرسال رمز التحقق" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    console.log(`OTP sent to ${cleanPhone.slice(-4)}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "تم إرسال رمز التحقق عبر واتساب",
        expires_in: 300,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("OTP send error:", err);
    return new Response(
      JSON.stringify({ error: "حدث خطأ غير متوقع" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
