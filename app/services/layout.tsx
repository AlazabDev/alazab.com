import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "خدمات العزب | Alazab Construction Company",
  description:
    "خدمات التصميم المعماري والتصميم الداخلي وإدارة المشاريع والصيانة والتشغيل من شركة العزب.",
  openGraph: {
    title: "خدمات العزب | Alazab Construction Company",
    description: "حلول متكاملة في التصميم والتنفيذ وإدارة المشاريع.",


    images: ["/logo.png"],

  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
