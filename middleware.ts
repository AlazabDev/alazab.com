import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  if (req.nextUrl.pathname.startsWith("/admin")) {
    // Check if user is authenticated for admin routes only
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const token = req.cookies.get("sb-access-token")?.value

      if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url))
      }
    }
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}
