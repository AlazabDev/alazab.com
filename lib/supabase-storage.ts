"use client"

import { createClient } from "@/lib/supabase/client"

// Supabase Storage configuration
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

export function getImageUrl(category: ImageCategory, filename: string): string {
  const path = `${IMAGE_CATEGORIES[category]}/${filename}`
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${path}`
}

export async function listImages(category: ImageCategory): Promise<string[]> {
  try {
    const supabase = createClient()
    const path = IMAGE_CATEGORIES[category]

    const { data, error } = await supabase.storage.from(BUCKET_NAME).list(path, {
      limit: 200,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    })

    if (error) {
      // Fallback: try to fetch images directly from known URLs
      return []
    }

    // Filter out folders and return only image files
    return (
      data
        ?.filter((file) => {
          const ext = file.name.split(".").pop()?.toLowerCase()
          return ["jpg", "jpeg", "png", "webp", "gif"].includes(ext || "")
        })
        .map((file) => file.name) || []
    )
  } catch {
    return []
  }
}

const FALLBACK_IMAGES: Record<ImageCategory, string[]> = {
  commercial: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
  construction: ["1.jpg", "2.jpg", "3.jpg"],
  cuate: [],
  live_edge: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
  logo: [],
  maintenance: ["2008390_pi_bd_5650a_273468_crop.jpg"],
  projects: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
  residential: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
  shops: ["abuauf_18.jpg", "abuauf_19.jpg", "abuauf_20.jpg"],
  uberfix: ["1.jpg", "2.jpg", "3.jpg"],
}

// Get all images with their full URLs for a category
export async function getImagesForCategory(category: ImageCategory): Promise<Array<{ name: string; url: string }>> {
  let filenames = await listImages(category)

  if (filenames.length === 0) {
    filenames = FALLBACK_IMAGES[category] || []
  }

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

export function getDirectImageUrl(path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${path}`
}
