import { createBrowserClient } from "@supabase/ssr"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  if (req.nextUrl.pathname.startsWith("/admin")) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    const supabase = createBrowserClient(supabaseUrl, supabaseKey)

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    res.headers.set("x-user-id", session.user.id)
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}
