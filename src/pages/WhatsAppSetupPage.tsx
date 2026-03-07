import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FACEBOOK_APP_ID = '889346333913449';
const CONFIG_ID = '4251954398390867';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

const WhatsAppSetupPage: React.FC = () => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [wabaData, setWabaData] = useState<{ phoneId?: string; wabaId?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load Facebook SDK
  useEffect(() => {
    if (document.getElementById('facebook-jssdk')) {
      setSdkLoaded(true);
      return;
    }

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v21.0',
      });
      setSdkLoaded(true);
    };

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    return () => {
      // Cleanup not needed for SDK
    };
  }, []);

  // Listen for session info from embedded signup
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.origin !== 'https://www.facebook.com' && event.origin !== 'https://web.facebook.com') return;

      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data.type === 'WA_EMBEDDED_SIGNUP') {
          if (data.data?.phone_number_id && data.data?.waba_id) {
            setWabaData({
              phoneId: data.data.phone_number_id,
              wabaId: data.data.waba_id,
            });
          }
        }
      } catch {
        // Not a relevant message
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const handleFBLogin = () => {
    if (!window.FB) {
      setError('لم يتم تحميل Facebook SDK بعد. يرجى الانتظار.');
      return;
    }

    setLoading(true);
    setError(null);

    window.FB.login(
      (response: any) => {
        if (response.authResponse) {
          const code = response.authResponse.code;
          exchangeCodeForToken(code);
        } else {
          setLoading(false);
          setError('تم إلغاء عملية تسجيل الدخول.');
        }
      },
      {
        config_id: CONFIG_ID,
        response_type: 'code',
        override_default_response_type: true,
        extras: {
          version: 'v3',
          setup: {
            business: {
              id: null,
              name: 'alazab.com',
              email: 'admin@alazab.com',
              phone: { code: 20, number: '1004006620' },
              website: 'https://alazab.com/',
              address: {
                streetAddress1: '500',
                city: 'cairo',
                state: 'Cairo Governorate',
                zipPostal: '11473',
                country: 'EG',
              },
              timezone: 'UTC+02:00',
            },
            phone: {
              displayName: 'Mohamed Azab',
              category: 'GOVT',
              description: 'Professionally managed maintenance solutions for shops and residential units',
            },
          },
          featureType: 'whatsapp_business_app_onboarding',
          features: [{ name: 'marketing_messages_lite' }, { name: 'app_only_install' }],
        },
      }
    );
  };

  const exchangeCodeForToken = async (code: string) => {
    try {
      const { data, error: fnError } = await supabase.functions.invoke('whatsapp-token-exchange', {
        body: {
          code,
          phone_number_id: wabaData?.phoneId,
          waba_id: wabaData?.wabaId,
        },
      });

      if (fnError) throw fnError;

      if (data?.success) {
        setSetupComplete(true);
        toast({
          title: 'تم الإعداد بنجاح! ✅',
          description: 'تم ربط حساب واتساب للأعمال بنجاح.',
        });
      } else {
        throw new Error(data?.error || 'فشل في تبادل الرمز');
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء إعداد واتساب');
      toast({
        title: 'خطأ',
        description: err.message || 'فشل في إتمام الإعداد',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-green-200 shadow-xl">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                إعداد واتساب للأعمال
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                قم بربط حساب واتساب للأعمال الخاص بك لبدء إرسال واستقبال الرسائل مع عملائك
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {setupComplete ? (
                <div className="text-center space-y-4 py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  <h3 className="text-xl font-semibold text-foreground">تم الربط بنجاح!</h3>
                  <p className="text-muted-foreground">
                    تم ربط حساب واتساب للأعمال بنجاح. يمكنك الآن البدء في التواصل مع عملائك.
                  </p>
                  {wabaData && (
                    <div className="bg-muted rounded-lg p-4 text-sm space-y-1">
                      <p><strong>WABA ID:</strong> {wabaData.wabaId}</p>
                      <p><strong>Phone ID:</strong> {wabaData.phoneId}</p>
                    </div>
                  )}
                  <Button onClick={() => navigate('/')} className="mt-4">
                    العودة للرئيسية
                  </Button>
                </div>
              ) : (
                <>
                  {/* Steps */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                      <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                      <div>
                        <h4 className="font-semibold text-foreground">تسجيل الدخول بفيسبوك</h4>
                        <p className="text-sm text-muted-foreground">سجّل دخولك بحساب فيسبوك المرتبط بنشاطك التجاري</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                      <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                      <div>
                        <h4 className="font-semibold text-foreground">إعداد حساب واتساب</h4>
                        <p className="text-sm text-muted-foreground">اتبع الخطوات لإعداد حساب واتساب للأعمال ورقم الهاتف</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                      <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                      <div>
                        <h4 className="font-semibold text-foreground">بدء الاستخدام</h4>
                        <p className="text-sm text-muted-foreground">بعد الإعداد، يمكنك البدء في إرسال واستقبال الرسائل</p>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <Button
                    onClick={handleFBLogin}
                    disabled={!sdkLoaded || loading}
                    className="w-full h-12 text-lg font-bold bg-[#1877f2] hover:bg-[#166fe5] text-white"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin ml-2" />
                        جاري الإعداد...
                      </>
                    ) : !sdkLoaded ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin ml-2" />
                        جاري تحميل SDK...
                      </>
                    ) : (
                      <>
                        <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        تسجيل الدخول بفيسبوك
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    بالنقر على الزر أعلاه، فإنك توافق على شروط استخدام واتساب للأعمال وسياسة الخصوصية الخاصة بـ Meta.
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WhatsAppSetupPage;
