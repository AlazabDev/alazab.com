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
} as const

export type ImageCategory = keyof typeof IMAGE_CATEGORIES

// Get public URL for an image
export function getImageUrl(category: ImageCategory, filename: string): string {
  const path = `${IMAGE_CATEGORIES[category]}/${filename}`
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${path}`
}

// List all images in a category
export async function listImages(category: ImageCategory): Promise<string[]> {
  const supabase = createClient()
  const path = IMAGE_CATEGORIES[category]

  const { data, error } = await supabase.storage.from(BUCKET_NAME).list(path, {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  })

  if (error) {
    console.error(`[v0] Error listing images from ${category}:`, error)
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
