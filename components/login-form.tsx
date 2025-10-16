"use client"

import { useActionState } from "react"
import { signIn, bypassLogin } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, AlertCircle, UserPlus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function LoginForm() {
  const [state, formAction] = useActionState(signIn, null)
  const router = useRouter()
  const { t, language } = useLanguage()

  useEffect(() => {
    if (state?.success) {
      router.push("/admin")
    }
  }, [state?.success, router])

  const handleBypassLogin = async () => {
    await bypassLogin()
  }

  return (
    <div className="space-y-4">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <AlertCircle className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-400">
          {language === "ar" ? (
            <>
              <strong>ملاحظة مهمة:</strong> إذا قمت بإنشاء حساب جديد، يجب عليك تأكيد بريدك الإلكتروني أولاً قبل تسجيل
              الدخول. تحقق من صندوق الوارد الخاص بك.
            </>
          ) : (
            <>
              <strong>Important:</strong> If you created a new account, you must confirm your email first before logging
              in. Check your inbox.
            </>
          )}
        </AlertDescription>
      </Alert>

      <Alert className="border-yellow-500/50 bg-yellow-500/10">
        <UserPlus className="h-4 w-4 text-yellow-400" />
        <AlertDescription className="text-yellow-400">
          {language === "ar" ? (
            <>
              <strong>مستخدم جديد؟</strong> يجب عليك{" "}
              <Link href="/auth/sign-up" className="underline font-semibold hover:text-yellow-300">
                إنشاء حساب جديد
              </Link>{" "}
              أولاً قبل تسجيل الدخول.
            </>
          ) : (
            <>
              <strong>New user?</strong> You need to{" "}
              <Link href="/auth/sign-up" className="underline font-semibold hover:text-yellow-300">
                create a new account
              </Link>{" "}
              first before logging in.
            </>
          )}
        </AlertDescription>
      </Alert>

      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="text-white text-center text-2xl">{t("loginToAccount")}</CardTitle>
          <CardDescription className="text-slate-400 text-center">
            {language === "ar"
              ? "أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى لوحة التحكم"
              : "Enter your email and password to access the admin panel"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            {state?.error && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-400 space-y-2">
                  <p className="font-semibold">{language === "ar" ? "فشل تسجيل الدخول" : "Login Failed"}</p>
                  <p>
                    {state.error === "Invalid login credentials"
                      ? language === "ar"
                        ? "بيانات الدخول غير صحيحة. يرجى التحقق من البريد الإلكتروني وكلمة المرور."
                        : "Invalid login credentials. Please check your email and password."
                      : state.error}
                  </p>
                  <p className="text-sm">
                    {language === "ar" ? (
                      <>
                        إذا لم يكن لديك حساب،{" "}
                        <Link href="/auth/sign-up" className="underline font-semibold hover:text-red-300">
                          قم بإنشاء حساب جديد
                        </Link>
                      </>
                    ) : (
                      <>
                        If you don't have an account,{" "}
                        <Link href="/auth/sign-up" className="underline font-semibold hover:text-red-300">
                          create a new account
                        </Link>
                      </>
                    )}
                  </p>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                {t("email")}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder={language === "ar" ? "admin@al-azab.co" : "admin@al-azab.co"}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                {t("password")}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold"
              disabled={state?.loading}
            >
              {state?.loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("login")}...
                </>
              ) : (
                t("login")
              )}
            </Button>

            <Button
              type="button"
              onClick={handleBypassLogin}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              {language === "ar" ? "دخول مباشر للاختبار" : "Direct Login (Testing)"}
            </Button>

            <div className="space-y-3 pt-4 border-t border-slate-700">
              <p className="text-center text-slate-400 text-sm">
                {language === "ar" ? "ليس لديك حساب؟" : "Don't have an account?"}
              </p>
              <Link href="/auth/sign-up" className="block">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300 bg-transparent"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  {language === "ar" ? "إنشاء حساب جديد" : "Create New Account"}
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
