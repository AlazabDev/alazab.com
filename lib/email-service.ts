// Email service for maintenance requests
interface EmailData {
  to: string
  subject: string
  html: string
}

interface MaintenanceRequestData {
  referenceNumber: string
  clientName: string
  clientEmail: string
  maintenanceType: string
  priority: string
  category: string
  description: string
  preferredDate: string
  preferredTime: string
  status?: string
  assignedTechnician?: string
  estimatedCost?: number
}

export class EmailService {
  private static instance: EmailService

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  async sendEmail(data: EmailData): Promise<boolean> {
    try {
      // In a real application, you would use a service like SendGrid, Nodemailer, or Resend
      console.log("[v0] Sending email:", data)

      // Simulate email sending
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return true
    } catch (error) {
      console.error("[v0] Email sending failed:", error)
      return false
    }
  }

  async sendMaintenanceRequestConfirmation(data: MaintenanceRequestData): Promise<boolean> {
    const clientEmailHtml = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تأكيد طلب الصيانة</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .reference { background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center; }
          .details { background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .priority-urgent { color: #dc2626; font-weight: bold; }
          .priority-high { color: #ea580c; font-weight: bold; }
          .priority-medium { color: #ca8a04; font-weight: bold; }
          .priority-low { color: #16a34a; font-weight: bold; }
          .footer { background: #374151; color: white; padding: 20px; text-align: center; }
          .track-button { display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>تم استلام طلب الصيانة بنجاح</h1>
            <p>شكراً لك على ثقتك في خدماتنا</p>
          </div>
          
          <div class="content">
            <p>عزيزي/عزيزتي <strong>${data.clientName}</strong>,</p>
            
            <p>تم استلام طلب الصيانة الخاص بك بنجاح وسيتم التواصل معك قريباً من قبل فريقنا المختص.</p>
            
            <div class="reference">
              <h3>رقم الطلب</h3>
              <h2 style="color: #f59e0b; font-family: monospace;">${data.referenceNumber}</h2>
              <p><small>احتفظ بهذا الرقم للمتابعة</small></p>
            </div>
            
            <div class="details">
              <h3>تفاصيل الطلب</h3>
              <div class="detail-row">
                <span><strong>نوع الصيانة:</strong></span>
                <span>${this.getMaintenanceTypeArabic(data.maintenanceType)}</span>
              </div>
              <div class="detail-row">
                <span><strong>الأولوية:</strong></span>
                <span class="priority-${data.priority}">${this.getPriorityArabic(data.priority)}</span>
              </div>
              <div class="detail-row">
                <span><strong>الفئة:</strong></span>
                <span>${this.getCategoryArabic(data.category)}</span>
              </div>
              <div class="detail-row">
                <span><strong>التاريخ المفضل:</strong></span>
                <span>${data.preferredDate}</span>
              </div>
              <div class="detail-row">
                <span><strong>الوقت المفضل:</strong></span>
                <span>${this.getTimeArabic(data.preferredTime)}</span>
              </div>
            </div>
            
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <p style="color: #dc2626; margin: 0;"><strong>للحالات الطارئة:</strong></p>
              <p style="color: #dc2626; margin: 5px 0 0 0;">اتصل على: 201004006620+</p>
            </div>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/track-request?ref=${data.referenceNumber}" class="track-button">
                تتبع الطلب
              </a>
            </div>
          </div>
          
          <div class="footer">
            <p>شركة الأزعب للمقاولات والإنشاءات</p>
            <p>للاستفسارات: info@alazab.com | 201004006620+</p>
          </div>
        </div>
      </body>
      </html>
    `

    const adminEmailHtml = `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <title>طلب صيانة جديد</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
          .container { max-width: 700px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
          .urgent { background: #dc2626 !important; }
          .high { background: #ea580c !important; }
          .medium { background: #ca8a04 !important; }
          .low { background: #16a34a !important; }
          .content { padding: 30px; }
          .client-info, .request-info { background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin: 8px 0; padding: 5px 0; border-bottom: 1px solid #e5e7eb; }
          .action-buttons { text-align: center; margin: 30px 0; }
          .btn { display: inline-block; padding: 12px 24px; margin: 0 10px; text-decoration: none; border-radius: 6px; color: white; }
          .btn-primary { background: #2563eb; }
          .btn-success { background: #16a34a; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header ${data.priority}">
            <h1>طلب صيانة جديد - ${this.getPriorityArabic(data.priority)}</h1>
            <h2>${data.referenceNumber}</h2>
          </div>
          
          <div class="content">
            <div class="client-info">
              <h3>معلومات العميل</h3>
              <div class="detail-row"><span><strong>الاسم:</strong></span><span>${data.clientName}</span></div>
              <div class="detail-row"><span><strong>البريد الإلكتروني:</strong></span><span>${data.clientEmail}</span></div>
              <div class="detail-row"><span><strong>رقم الهاتف:</strong></span><span>غير متوفر</span></div>
            </div>
            
            <div class="request-info">
              <h3>تفاصيل الطلب</h3>
              <div class="detail-row"><span><strong>نوع الصيانة:</strong></span><span>${this.getMaintenanceTypeArabic(data.maintenanceType)}</span></div>
              <div class="detail-row"><span><strong>الفئة:</strong></span><span>${this.getCategoryArabic(data.category)}</span></div>
              <div class="detail-row"><span><strong>الأولوية:</strong></span><span>${this.getPriorityArabic(data.priority)}</span></div>
              <div class="detail-row"><span><strong>التاريخ المفضل:</strong></span><span>${data.preferredDate}</span></div>
              <div class="detail-row"><span><strong>الوقت المفضل:</strong></span><span>${this.getTimeArabic(data.preferredTime)}</span></div>
            </div>
            
            <div style="background: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h4>وصف المشكلة:</h4>
              <p>${data.description}</p>
            </div>
            
            <div class="action-buttons">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/maintenance" class="btn btn-primary">
                إدارة الطلبات
              </a>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/maintenance/${data.referenceNumber}" class="btn btn-success">
                عرض التفاصيل
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Send confirmation email to client
    const clientEmailSent = await this.sendEmail({
      to: data.clientEmail,
      subject: `تأكيد طلب الصيانة - ${data.referenceNumber}`,
      html: clientEmailHtml,
    })

    // Send notification email to admin
    const adminEmailSent = await this.sendEmail({
      to: "admin@alazab.com", // Replace with actual admin email
      subject: `طلب صيانة جديد - ${data.referenceNumber} - ${this.getPriorityArabic(data.priority)}`,
      html: adminEmailHtml,
    })

    return clientEmailSent && adminEmailSent
  }

  async sendStatusUpdateEmail(data: MaintenanceRequestData): Promise<boolean> {
    const statusUpdateHtml = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>تحديث حالة طلب الصيانة</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: #2563eb; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .status-update { background: #dbeafe; border: 2px solid #2563eb; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
          .details { background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .footer { background: #374151; color: white; padding: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>تحديث حالة طلب الصيانة</h1>
            <h2>${data.referenceNumber}</h2>
          </div>
          
          <div class="content">
            <p>عزيزي/عزيزتي <strong>${data.clientName}</strong>,</p>
            
            <div class="status-update">
              <h3>الحالة الجديدة</h3>
              <h2 style="color: #2563eb;">${this.getStatusArabic(data.status || "pending")}</h2>
            </div>
            
            ${
              data.assignedTechnician
                ? `
              <div class="details">
                <h4>الفني المكلف:</h4>
                <p><strong>${data.assignedTechnician}</strong></p>
              </div>
            `
                : ""
            }
            
            ${
              data.estimatedCost
                ? `
              <div class="details">
                <h4>التكلفة المتوقعة:</h4>
                <p><strong>${data.estimatedCost} جنيه مصري</strong></p>
              </div>
            `
                : ""
            }
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/track-request?ref=${data.referenceNumber}" 
                 style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                تتبع الطلب
              </a>
            </div>
          </div>
          
          <div class="footer">
            <p>شركة الأزعب للمقاولات والإنشاءات</p>
            <p>للاستفسارات: info@alazab.com | 201004006620+</p>
          </div>
        </div>
      </body>
      </html>
    `

    return await this.sendEmail({
      to: data.clientEmail,
      subject: `تحديث طلب الصيانة - ${data.referenceNumber}`,
      html: statusUpdateHtml,
    })
  }

  private getMaintenanceTypeArabic(type: string): string {
    const types: Record<string, string> = {
      emergency: "صيانة طارئة",
      routine: "صيانة دورية",
      repair: "إصلاح",
      renovation: "تجديد",
      inspection: "فحص",
    }
    return types[type] || type
  }

  private getPriorityArabic(priority: string): string {
    const priorities: Record<string, string> = {
      urgent: "عاجل",
      high: "عالي",
      medium: "متوسط",
      low: "منخفض",
    }
    return priorities[priority] || priority
  }

  private getCategoryArabic(category: string): string {
    const categories: Record<string, string> = {
      structural: "إنشائي",
      electrical: "كهربائي",
      plumbing: "سباكة",
      hvac: "تكييف وتهوية",
      finishing: "تشطيبات",
      other: "أخرى",
    }
    return categories[category] || category
  }

  private getTimeArabic(time: string): string {
    const times: Record<string, string> = {
      morning: "صباحاً (8 ص - 12 ظ)",
      afternoon: "بعد الظهر (12 ظ - 5 م)",
      evening: "مساءً (5 م - 8 م)",
      anytime: "أي وقت",
    }
    return times[time] || time
  }

  private getStatusArabic(status: string): string {
    const statuses: Record<string, string> = {
      pending: "قيد المراجعة",
      confirmed: "مؤكد",
      assigned: "تم التكليف",
      in_progress: "قيد التنفيذ",
      completed: "مكتمل",
      cancelled: "ملغي",
    }
    return statuses[status] || status
  }
}
