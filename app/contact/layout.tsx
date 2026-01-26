import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "تواصل معنا | Alazab Construction Company",
  description: "تواصل مع شركة العزب للحصول على استشارة هندسية أو عرض سعر لمشروعك.",
  openGraph: {
    title: "تواصل معنا | Alazab Construction Company",
    description: "احصل على استشارة مجانية وخطة تنفيذ واضحة من فريق العزب.",
    images: ["/logo.png"],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
