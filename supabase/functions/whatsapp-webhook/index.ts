import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const VERIFY_TOKEN = 'alazab_whatsapp_verify_2024';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);

  // GET = Webhook verification
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

      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, serviceRoleKey);

      if (body.object === 'whatsapp_business_account') {
        const entries = body.entry || [];

        for (const entry of entries) {
          const changes = entry.changes || [];

          for (const change of changes) {
            if (change.field === 'messages') {
              const value = change.value;
              const messages = value.messages || [];
              const statuses = value.statuses || [];
              const contacts = value.contacts || [];

              // Handle incoming messages - store in DB
              for (const message of messages) {
                const contactName = contacts.find((c: any) => c.wa_id === message.from)?.profile?.name;
                
                let content = '';
                switch (message.type) {
                  case 'text':
                    content = message.text?.body || '';
                    break;
                  case 'image':
                    content = message.image?.caption || '[صورة]';
                    break;
                  case 'document':
                    content = message.document?.caption || '[مستند]';
                    break;
                  case 'audio':
                    content = '[رسالة صوتية]';
                    break;
                  case 'video':
                    content = message.video?.caption || '[فيديو]';
                    break;
                  case 'location':
                    content = `[موقع: ${message.location?.latitude}, ${message.location?.longitude}]`;
                    break;
                  default:
                    content = `[${message.type}]`;
                }

                await supabase.from('whatsapp_messages').insert({
                  wa_message_id: message.id,
                  phone_number: message.from,
                  customer_name: contactName || null,
                  direction: 'inbound',
                  message_type: message.type,
                  content: content,
                  media_url: message.image?.url || message.document?.url || message.video?.url || null,
                  status: 'received',
                });

                console.log('Stored inbound message from:', message.from);
              }

              // Handle status updates
              for (const status of statuses) {
                if (status.id) {
                  await supabase
                    .from('whatsapp_messages')
                    .update({ status: status.status, updated_at: new Date().toISOString() })
                    .eq('wa_message_id', status.id);
                }
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
