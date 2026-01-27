import { v2 as cloudinary } from "cloudinary"

export interface GalleryImage {
  id: string
  src: string
  category: string
  type: string
  title: string
}

const FOLDERS = [
  { id: "catalog-101", labelAr: "تصميم داخلي", labelEn: "Interior Design" },
  { id: "catalog-102", labelAr: "وحدات أثاث", labelEn: "Furniture Units" },
  { id: "catalog-103", labelAr: "محلات تجارية", labelEn: "Commercial Shops" },
  { id: "catalog-104", labelAr: "الإضاءة والديكورات", labelEn: "Lighting & Decor" },
  { id: "catalog-105", labelAr: "مشروعات متنوعة", labelEn: "Project Highlights" },
]

const formatTitle = (filename: string) =>
  filename.replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())

const getPublicIdTitle = (publicId: string) => {
  const parts = publicId.split("/")
  return formatTitle(parts[parts.length - 1] ?? "")
}

const fetchFolderImages = async (folder: string): Promise<GalleryImage[]> => {
  const images: GalleryImage[] = []
  let nextCursor: string | undefined

  do {
    const response = await cloudinary.search
      .expression(`folder:${folder}/*`)
      .sort_by("public_id", "desc")
      .max_results(500)
      .next_cursor(nextCursor)
      .execute()

    response.resources.forEach((resource: { secure_url: string; public_id: string }) => {
      images.push({
        id: `${folder}-${resource.public_id}`,
        src: resource.secure_url,
        category: folder,
        type: folder,
        title: getPublicIdTitle(resource.public_id),
      })
    })

    nextCursor = response.next_cursor
  } while (nextCursor)

  return images
}

export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  if (!process.env.CLOUDINARY_URL) {
    return []
  }

  cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
  })

  const results = await Promise.all(FOLDERS.map((folder) => fetchFolderImages(folder.id)))
  return results.flat()
}

export const GALLERY_FOLDERS = FOLDERS
