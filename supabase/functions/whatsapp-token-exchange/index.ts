import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FACEBOOK_APP_ID = '889346333913449';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const FACEBOOK_APP_SECRET = Deno.env.get('FACEBOOK_APP_SECRET');
    if (!FACEBOOK_APP_SECRET) {
      throw new Error('FACEBOOK_APP_SECRET is not configured');
    }

    const { code, phone_number_id, waba_id } = await req.json();

    if (!code) {
      return new Response(
        JSON.stringify({ success: false, error: 'Authorization code is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Exchange code for access token
    const tokenUrl = new URL('https://graph.facebook.com/v21.0/oauth/access_token');
    tokenUrl.searchParams.set('client_id', FACEBOOK_APP_ID);
    tokenUrl.searchParams.set('client_secret', FACEBOOK_APP_SECRET);
    tokenUrl.searchParams.set('code', code);

    const tokenResponse = await fetch(tokenUrl.toString());
    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || tokenData.error) {
      console.error('Token exchange failed:', tokenData);
      throw new Error(tokenData.error?.message || `Token exchange failed [${tokenResponse.status}]`);
    }

    const accessToken = tokenData.access_token;

    // Store the token and WABA info securely
    // Log successful setup
    console.log('WhatsApp Business setup successful:', {
      waba_id,
      phone_number_id,
      token_type: tokenData.token_type,
    });

    // If we have WABA ID, subscribe the app to the WABA
    if (waba_id) {
      const subscribeResponse = await fetch(
        `https://graph.facebook.com/v21.0/${waba_id}/subscribed_apps`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const subscribeData = await subscribeResponse.json();
      console.log('WABA subscription result:', subscribeData);
    }

    // Store credentials in app_secrets table
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const storeSecrets = async (key: string, value: string) => {
      await fetch(`${SUPABASE_URL}/rest/v1/app_secrets`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates',
        },
        body: JSON.stringify({ key, value, encrypted: true, updated_at: new Date().toISOString() }),
      });
    };

    await Promise.all([
      storeSecrets('WHATSAPP_ACCESS_TOKEN', accessToken),
      storeSecrets('WHATSAPP_WABA_ID', waba_id || ''),
      storeSecrets('WHATSAPP_PHONE_NUMBER_ID', phone_number_id || ''),
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        waba_id,
        phone_number_id,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('WhatsApp token exchange error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
