import GalleryClient from "@/components/gallery/gallery-client"
import { getGalleryImages } from "@/lib/gallery-data"

export default function GalleryPage() {
  const images = getGalleryImages()

  return <GalleryClient images={images} />
}
