export const metadata = {
  title: "شركة العزب للمقاولات | Alazab Construction Company",
  description:
    "شركة العزب للمقاولات وإدارة التنفيذ. نقدم خدمات التصميم المعماري والتصميم الداخلي وإدارة المشاريع والصيانة وفق معايير عالية.",
  keywords: "شركة العزب, مقاولات, تصميم معماري, تصميم داخلي, إدارة مشاريع, صيانة, القاهرة, مصر",
  openGraph: {
    title: "شركة العزب للمقاولات | Alazab Construction Company",
    description: "خدمات التصميم والتنفيذ وإدارة المشاريع من شركة العزب.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://al-azab.com",
    images: ["/logo.png"],
    type: "website",
  },
}

import HomePageClient from "./HomePageClient"

export default function HomePageServer() {
  return <HomePageClient />
}
