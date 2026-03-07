import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone, message, customer_name } = await req.json();

    if (!phone || !message) {
      return new Response(
        JSON.stringify({ error: 'رقم الهاتف والرسالة مطلوبان' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get WhatsApp credentials from app_secrets
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: secrets } = await supabase
      .from('app_secrets')
      .select('key, value')
      .in('key', ['WHATSAPP_ACCESS_TOKEN', 'WHATSAPP_PHONE_NUMBER_ID']);

    const secretsMap: Record<string, string> = {};
    secrets?.forEach((s: any) => { secretsMap[s.key] = s.value; });

    const accessToken = secretsMap['WHATSAPP_ACCESS_TOKEN'];
    const phoneNumberId = secretsMap['WHATSAPP_PHONE_NUMBER_ID'];

    if (!accessToken || !phoneNumberId) {
      return new Response(
        JSON.stringify({ error: 'لم يتم إعداد حساب واتساب للأعمال بعد' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clean phone number
    let cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '20' + cleanPhone.substring(1); // Egypt country code
    }
    if (!cleanPhone.startsWith('+') && !cleanPhone.match(/^\d{10,15}$/)) {
      return new Response(
        JSON.stringify({ error: 'رقم هاتف غير صالح' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send message via WhatsApp Cloud API
    const waResponse = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: cleanPhone,
          type: 'text',
          text: { body: message },
        }),
      }
    );

    const waResult = await waResponse.json();

    if (!waResponse.ok) {
      console.error('WhatsApp API error:', waResult);
      return new Response(
        JSON.stringify({ error: 'فشل إرسال الرسالة', details: waResult }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Store the conversation in database
    const messageId = waResult.messages?.[0]?.id;
    
    // Store in whatsapp_messages table
    await supabase.from('whatsapp_messages').insert({
      wa_message_id: messageId,
      phone_number: cleanPhone,
      customer_name: customer_name || null,
      direction: 'outbound',
      message_type: 'text',
      content: message,
      status: 'sent',
    });

    return new Response(
      JSON.stringify({ success: true, message_id: messageId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
