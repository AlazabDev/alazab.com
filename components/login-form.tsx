"use client"

import { useActionState } from "react"
import { signIn, signInDemo } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, TestTube, Info } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function LoginForm() {
  const [state, formAction] = useActionState(signIn, null)
  const [demoState, demoFormAction] = useActionState(signInDemo, null)
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    if (state?.success || demoState?.success) {
      router.push("/admin")
    }
  }, [state?.success, demoState?.success, router])

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-center">{t("loginToAccount")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            {(state?.error || demoState?.error) && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertDescription className="text-red-400">{state?.error || demoState?.error}</AlertDescription>
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
                  placeholder="admin@al-azab.co"
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

            <div className="text-center">
              <Link href="/auth/sign-up" className="text-yellow-400 hover:text-yellow-300 text-sm">
                {t("dontHaveAccount")} {t("signUpHere")}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-blue-900/20 border-blue-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-300 text-center flex items-center justify-center gap-2">
            <TestTube className="h-5 w-5" />
            {t("demoAccount")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-800/20 p-3 rounded-lg border border-blue-700/30">
              <div className="flex items-start gap-2 mb-2">
                <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-blue-300 text-sm">{t("demoAccountInfo")}</p>
              </div>
              <div className="space-y-1 text-xs text-blue-200">
                <p>{t("demoEmail")}</p>
                <p>{t("demoPassword")}</p>
              </div>
            </div>

            <form action={demoFormAction}>
              <Button
                type="submit"
                variant="outline"
                className="w-full border-blue-600 text-blue-300 hover:bg-blue-800/30 hover:text-blue-200 bg-transparent"
                disabled={demoState?.loading}
              >
                {demoState?.loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("login")}...
                  </>
                ) : (
                  <>
                    <TestTube className="mr-2 h-4 w-4" />
                    {t("loginWithDemo")}
                  </>
                )}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
