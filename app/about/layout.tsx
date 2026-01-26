import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "عن شركة العزب | Alazab Construction Company",
  description:
    "تعرف على شركة العزب للمقاولات وإدارة التنفيذ، رؤيتنا ورسالتنا وفريقنا الذي يقود مشاريع عالية الجودة.",
  openGraph: {
    title: "عن شركة العزب | Alazab Construction Company",
    description: "نبذة عن شركة العزب للمقاولات والخدمات المعمارية وإدارة التنفيذ.",
    images: ["/logo.png"],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
