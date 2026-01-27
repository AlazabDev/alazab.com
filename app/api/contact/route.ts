import { NextResponse } from "next/server"
import { Resend } from "resend"

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const requestLog = new Map<string, number[]>()
const MAX_MESSAGE_LENGTH = 2000
const MIN_MESSAGE_LENGTH = 10

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown"
  }
  return request.headers.get("x-real-ip") ?? "unknown"
}

const isRateLimited = (ip: string) => {
  const now = Date.now()
  const timestamps = requestLog.get(ip)?.filter((time) => now - time < RATE_LIMIT_WINDOW_MS) ?? []
  timestamps.push(now)
  requestLog.set(ip, timestamps)
  return timestamps.length > RATE_LIMIT_MAX
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }

    const { name, email, phone, service, message, company } = await request.json()

    if (company) {
      return NextResponse.json({ status: "ok" })
    }

    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    if (message.length < MIN_MESSAGE_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "Invalid message length" }, { status: 400 })
    }

    if (!process.env.RESEND_SMTP_KEY) {
      return NextResponse.json({ error: "Missing Resend key" }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_SMTP_KEY)

    await resend.emails.send({
      from: "Alazab Construction <noreply@al-azab.co>",
      to: ["info@al-azab.co"],
      subject: `New inquiry from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 })
  }
}
