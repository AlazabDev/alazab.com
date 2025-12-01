export const metadata = {
  title: "العزاب للبناء والتشطيبات | شركة بناء متخصصة في مصر - AL-AZAB Construction",
  description:
    "شركة العزاب للبناء والتشطيبات متخصصة في البناء السكني والتشطيبات الفاخرة والصيانة والهوية التجارية. نقدم خدمات بناء احترافية بجودة عالية.",
  keywords: "بناء، تشطيبات، صيانة، بناء سكني، تشطيبات فاخرة، مصر، القاهرة",
  openGraph: {
    title: "العزاب للبناء والتشطيبات | شركة بناء متخصصة",
    description: "خدمات البناء والتشطيبات الفاخرة من الشركة الرائدة في مصر",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://al-azab.com",
    image: "/og-image.png",
    type: "website",
  },
}

import HomePageClient from "./HomePageClient"

export default function HomePageServer() {
  return <HomePageClient />
}
