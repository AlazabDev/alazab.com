import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message, type } = body

    // Determine email template based on type
    let subject = ""
    let htmlContent = ""

    if (type === "contact") {
      subject = `رسالة جديدة من ${name} - موقع العزب للإنشاءات`
      htmlContent = `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">العزب للإنشاءات</h1>
          </div>
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #1f2937;">رسالة تواصل جديدة</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">الاسم:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">البريد الإلكتروني:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">الهاتف:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${phone || "غير محدد"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">الخدمة:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${service || "غير محدد"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;" colspan="2">الرسالة:</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: white; border-radius: 8px;" colspan="2">${message}</td>
              </tr>
            </table>
          </div>
          <div style="background: #1f2937; padding: 20px; text-align: center;">
            <p style="color: #9ca3af; margin: 0;">© ${new Date().getFullYear()} العزب للإنشاءات والتوريدات</p>
          </div>
        </div>
      `
    } else if (type === "consultation") {
      subject = `طلب استشارة جديد من ${name} - موقع العزب للإنشاءات`
      htmlContent = `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">طلب استشارة مجانية</h1>
          </div>
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #1f2937;">بيانات العميل</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">الاسم:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">البريد الإلكتروني:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">الهاتف:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;" colspan="2">تفاصيل المشروع:</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: white; border-radius: 8px;" colspan="2">${message || "لم يتم تحديد تفاصيل"}</td>
              </tr>
            </table>
          </div>
          <div style="background: #1f2937; padding: 20px; text-align: center;">
            <p style="color: #9ca3af; margin: 0;">© ${new Date().getFullYear()} العزب للإنشاءات والتوريدات</p>
          </div>
        </div>
      `
    }

    const { data, error } = await resend.emails.send({
      from: "Al-Azab Construction <onboarding@resend.dev>",
      to: ["info@al-azab.co"],
      subject,
      html: htmlContent,
      replyTo: email,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ أثناء إرسال الرسالة" }, { status: 500 })
  }
}
