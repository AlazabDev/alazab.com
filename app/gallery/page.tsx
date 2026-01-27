import GalleryClient from "@/components/gallery/gallery-client"
import { getGalleryImages } from "@/lib/gallery-data"

export const revalidate = 3600

export default async function GalleryPage() {
  const images = await getGalleryImages()

  return <GalleryClient images={images} />
}
