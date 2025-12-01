"use client"

// Supabase Storage configuration - Public bucket access
const SUPABASE_URL = "https://zrrffsjbfkphridqyais.supabase.co"
const BUCKET_NAME = "az_gallery"

// Image categories matching the folder structure
export const IMAGE_CATEGORIES = {
  commercial: "images/commercial",
  construction: "images/construction",
  cuate: "images/cuate",
  live_edge: "images/live_edge",
  logo: "images/logo",
  maintenance: "images/maintenance",
  projects: "images/projects",
  residential: "images/residential",
  shops: "images/shops",
  uberfix: "images/uberfix",
} as const

export type ImageCategory = keyof typeof IMAGE_CATEGORIES

// Get public URL for an image
export function getImageUrl(category: ImageCategory, filename: string): string {
  const path = `${IMAGE_CATEGORIES[category]}/${filename}`
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${path}`
}

// List all images in a category using public API
export async function listImages(category: ImageCategory): Promise<string[]> {
  const path = IMAGE_CATEGORIES[category]

  try {
    // Use the public list endpoint for public buckets
    const response = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${BUCKET_NAME}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prefix: path,
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      }),
    })

    if (!response.ok) {
      // If the API doesn't work, fall back to predefined images
      return getHardcodedImages(category)
    }

    const data = await response.json()

    // Filter out folders and return only image files
    return (
      data
        ?.filter((file: { name: string }) => {
          const ext = file.name.split(".").pop()?.toLowerCase()
          return ["jpg", "jpeg", "png", "webp", "gif"].includes(ext || "")
        })
        .map((file: { name: string }) => file.name) || getHardcodedImages(category)
    )
  } catch (error) {
    console.error(`[v0] Error listing images from ${category}:`, error)
    // Fall back to hardcoded images for production reliability
    return getHardcodedImages(category)
  }
}

function getHardcodedImages(category: ImageCategory): string[] {
  const imageMap: Record<ImageCategory, string[]> = {
    commercial: [
      "abuauf_18.jpg",
      "abuauf_17.jpg",
      "abuauf_16.jpg",
      "abuauf_15.jpg",
      "abuauf_14.jpg",
      "abuauf_13.jpg",
      "abuauf_12.jpg",
      "abuauf_11.jpg",
      "abuauf_10.jpg",
      "abuauf_9.jpg",
    ],
    construction: [
      "construction_1.jpg",
      "construction_2.jpg",
      "construction_3.jpg",
      "construction_4.jpg",
      "construction_5.jpg",
    ],
    residential: [
      "residential_1.jpg",
      "residential_2.jpg",
      "residential_3.jpg",
      "residential_4.jpg",
      "residential_5.jpg",
    ],
    shops: ["abuauf_18.jpg", "abuauf_17.jpg", "abuauf_16.jpg", "abuauf_15.jpg", "abuauf_14.jpg"],
    projects: ["project_1.jpg", "project_2.jpg", "project_3.jpg", "project_4.jpg"],
    maintenance: ["2008390_pi_bd_5650a_273468_crop.jpg"],
    live_edge: ["live_edge_1.jpg", "live_edge_2.jpg"],
    logo: [],
    cuate: [],
    uberfix: ["uberfix_1.jpg", "uberfix_2.jpg"],
  }

  return imageMap[category] || []
}

// Get all images with their full URLs for a category
export async function getImagesForCategory(category: ImageCategory): Promise<Array<{ name: string; url: string }>> {
  const filenames = await listImages(category)
  return filenames.map((name) => ({
    name,
    url: getImageUrl(category, name),
  }))
}

// Get images for multiple categories
export async function getImagesForCategories(
  categories: ImageCategory[],
): Promise<Record<ImageCategory, Array<{ name: string; url: string }>>> {
  const results = await Promise.all(
    categories.map(async (category) => ({
      category,
      images: await getImagesForCategory(category),
    })),
  )

  return results.reduce(
    (acc, { category, images }) => {
      acc[category] = images
      return acc
    },
    {} as Record<ImageCategory, Array<{ name: string; url: string }>>,
  )
}

export function buildDirectImageUrl(folder: string, filename: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/images/${folder}/${filename}`
}

export function getSampleImages(): Array<{ category: string; url: string; title: string }> {
  return [
    { category: "commercial", url: buildDirectImageUrl("shops", "abuauf_18.jpg"), title: "محل أبو عوف" },
    { category: "commercial", url: buildDirectImageUrl("shops", "abuauf_17.jpg"), title: "تجهيزات المحلات" },
    { category: "commercial", url: buildDirectImageUrl("shops", "abuauf_16.jpg"), title: "ديكورات تجارية" },
    { category: "commercial", url: buildDirectImageUrl("shops", "abuauf_15.jpg"), title: "واجهات المحلات" },
    { category: "commercial", url: buildDirectImageUrl("shops", "abuauf_14.jpg"), title: "تصميم داخلي" },
    { category: "commercial", url: buildDirectImageUrl("shops", "abuauf_13.jpg"), title: "إضاءة تجارية" },
    { category: "commercial", url: buildDirectImageUrl("shops", "abuauf_12.jpg"), title: "تشطيبات فاخرة" },
    { category: "commercial", url: buildDirectImageUrl("shops", "abuauf_11.jpg"), title: "أرضيات" },
    { category: "commercial", url: buildDirectImageUrl("shops", "abuauf_10.jpg"), title: "سقف معلق" },
    { category: "commercial", url: buildDirectImageUrl("shops", "abuauf_9.jpg"), title: "تفاصيل الديكور" },
    {
      category: "maintenance",
      url: buildDirectImageUrl("maintenance", "2008390_pi_bd_5650a_273468_crop.jpg"),
      title: "أعمال صيانة",
    },
  ]
}
