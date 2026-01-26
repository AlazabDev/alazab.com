import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "عملاؤنا | Alazab Construction Company",
  description: "شهادات العملاء وشركاء النجاح الذين وثقوا بخدمات العزب للتصميم والتنفيذ.",
  openGraph: {
    title: "عملاؤنا | Alazab Construction Company",
    description: "تعرف على شركاء النجاح وثقة عملاء العزب.",
    images: ["/logo.png"],
  },
}

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  return children
}
