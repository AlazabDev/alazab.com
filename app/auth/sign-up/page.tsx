import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import SignUpForm from "@/components/sign-up-form"

export default async function SignUpPage() {
  const supabase = createClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      redirect("/admin")
    }
  } catch (error) {
    // Continue to sign up page if there's an error
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="https://al-azab.co/images/logaz.gif" alt="Al-Azab Construction" className="h-20 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">إنشاء حساب جديد</h1>
          <p className="text-slate-400">انضم إلى فريق شركة العزب للإنشاءات</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}
