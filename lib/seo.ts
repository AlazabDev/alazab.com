export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article" | "product"
  locale?: string
  alternateLocales?: string[]
}

export function generateSEOTags(config: SEOConfig) {
  const {
    title,
    description,
    keywords = [],
    image = "/og-image.jpg",
    url = "",
    type = "website",
    locale = "ar",
    alternateLocales = ["en"],
  } = config

  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      type,
      locale,
      alternateLocale: alternateLocales,
      url,
      siteName: "شركة العزب للإنشاءات - Al-Azab Construction",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
      languages: {
        ar: url,
        en: url.replace("/ar/", "/en/"),
      },
    },
  }
}

export const defaultSEO: SEOConfig = {
  title: "شركة العزب للإنشاءات - Al-Azab Construction",
  description:
    "شركة رائدة في مجال البناء والإنشاءات في مصر. نقدم خدمات البناء السكني والتجاري والصناعي بأعلى معايير الجودة والأمان.",
  keywords: [
    "شركة إنشاءات",
    "بناء منازل",
    "مقاولات",
    "تشطيبات",
    "العزب للإنشاءات",
    "construction company",
    "building contractor",
    "residential construction",
    "commercial construction",
  ],
  type: "website",
  locale: "ar",
}
