import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { phone_number, otp_code } = await req.json();

    if (!phone_number || !otp_code) {
      return new Response(
        JSON.stringify({ error: "رقم الهاتف ورمز التحقق مطلوبان" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!/^\d{6}$/.test(otp_code)) {
      return new Response(
        JSON.stringify({ error: "رمز التحقق يجب أن يكون 6 أرقام" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const cleanPhone = phone_number.replace(/[\s\-\+]/g, "");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Get latest unverified OTP for this phone
    const { data: otpRecord, error: fetchError } = await supabase
      .from("otp_codes")
      .select("*")
      .eq("phone_number", cleanPhone)
      .eq("verified", false)
      .gte("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !otpRecord) {
      return new Response(
        JSON.stringify({ error: "رمز التحقق منتهي الصلاحية أو غير موجود" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check max attempts (5)
    if (otpRecord.attempts >= 5) {
      return new Response(
        JSON.stringify({ error: "تم تجاوز عدد المحاولات المسموحة" }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Increment attempts
    await supabase
      .from("otp_codes")
      .update({ attempts: otpRecord.attempts + 1 })
      .eq("id", otpRecord.id);

    // Verify OTP
    if (otpRecord.otp_code !== otp_code) {
      return new Response(
        JSON.stringify({
          error: "رمز التحقق غير صحيح",
          remaining_attempts: 4 - otpRecord.attempts,
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Mark as verified
    await supabase
      .from("otp_codes")
      .update({ verified: true })
      .eq("id", otpRecord.id);

    // Check if user exists with this phone, create if not
    const email = `${cleanPhone}@whatsapp.alazab.com`;

    // Try to find existing user by email
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find((u) => u.email === email);

    let session = null;
    let user = null;

    if (existingUser) {
      // Generate magic link session for existing user
      const { data, error } = await supabase.auth.admin.generateLink({
        type: "magiclink",
        email,
      });

      if (error) {
        console.error("Magic link error:", error.message);
        return new Response(
          JSON.stringify({ error: "خطأ في تسجيل الدخول" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Sign in with the token
      const { data: signInData, error: signInError } =
        await supabase.auth.admin.generateLink({
          type: "magiclink",
          email,
          options: { data: { phone: cleanPhone } },
        });

      user = existingUser;
    } else {
      // Create new user
      const { data: newUser, error: createError } =
        await supabase.auth.admin.createUser({
          email,
          email_confirm: true,
          user_metadata: {
            phone: cleanPhone,
            auth_method: "whatsapp_otp",
          },
        });

      if (createError) {
        console.error("Create user error:", createError.message);
        return new Response(
          JSON.stringify({ error: "خطأ في إنشاء الحساب" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      user = newUser.user;
    }

    // Generate a session token
    const { data: tokenData, error: tokenError } =
      await supabase.auth.admin.generateLink({
        type: "magiclink",
        email,
      });

    if (tokenError) {
      console.error("Token generation error:", tokenError.message);
      return new Response(
        JSON.stringify({ error: "خطأ في إنشاء الجلسة" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`OTP verified for ${cleanPhone.slice(-4)}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "تم التحقق بنجاح",
        user_id: user?.id,
        email,
        token_hash: tokenData?.properties?.hashed_token,
        verification_type: tokenData?.properties?.verification_type,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("OTP verify error:", err);
    return new Response(
      JSON.stringify({ error: "حدث خطأ غير متوقع" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
