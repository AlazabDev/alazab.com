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
  title: "شركة العزب للبناء والتشطيبات | AL-AZAB Construction",
  description: "شركة العزب متخصصة في البناء السكني والتجاري والتشطيبات الفاخرة والصيانة والهوية التجارية. نقدم حلول بناء احترافية بجودة عالية منذ عام 2000.",
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
    title: "شركة العزب للبناء والتشطيبات",
    description: "متخصصون في البناء السكني والتشطيبات الفاخرة والصيانة",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "شركة العزب للبناء والتشطيبات",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "شركة العزب للبناء والتشطيبات",
    description: "متخصصون في البناء السكني والتشطيبات الفاخرة",
    images: ["/og-image.png"],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  generator: "v0.app",
}
