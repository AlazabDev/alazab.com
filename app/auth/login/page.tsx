import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import LoginForm from "@/components/login-form"

export default async function LoginPage() {
  const supabase = createClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      redirect("/admin")
    }
  } catch (error) {
    // Continue to login page if there's an error
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="https://al-azab.co/images/logaz.gif" alt="Al-Azab Construction" className="h-20 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">تسجيل الدخول</h1>
          <p className="text-slate-400">ادخل إلى لوحة التحكم الإدارية</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
