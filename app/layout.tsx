import type React from "react"
import ClientLayout from "./client-layout"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}

export const metadata = {
  title: "شركة العزب للمقاولات | Alazab Construction Company",
  description:
    "شركة العزب للمقاولات وإدارة التنفيذ تقدم حلول التصميم المعماري والتصميم الداخلي وإدارة المشاريع والصيانة وفق معايير عالية.",
  applicationName: "شركة العزب للبناء والتشطيبات",
  keywords: "بناء، تشطيبات، صيانة، عمارات، مصر، القاهرة، بناء سكني، تشطيبات فاخرة",
  authors: [{ name: "AL-AZAB Construction" }],
  creator: "AL-AZAB Construction",
  publisher: "AL-AZAB Construction",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://al-azab.co"),
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://al-azab.co",
    title: "شركة العزب للمقاولات",
    description: "خدمات التصميم المعماري وإدارة المشاريع والصيانة.",
    images: [
      {
        url: "/og-alazab.svg",
        width: 1200,
        height: 630,
        alt: "شركة العزب للمقاولات",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "شركة العزب للمقاولات",
    description: "خدمات التصميم المعماري وإدارة المشاريع والصيانة.",
    images: ["/og-alazab.svg"],
  },
  generator: "v0.app",
}
