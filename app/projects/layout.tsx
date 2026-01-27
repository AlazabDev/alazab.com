import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "مشاريع العزب | Alazab Construction Company",
  description: "استعرض مشاريع العزب المنفذة في التصميم المعماري والتشطيبات وإدارة المشاريع.",
  openGraph: {
    title: "مشاريع العزب | Alazab Construction Company",
    description: "معرض المشاريع المنفذة وفق معايير الجودة والتنفيذ.",
    images: ["/og-alazab.svg"],
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
