import fs from "fs"
import path from "path"

export interface GalleryImage {
  id: string
  src: string
  category: string
  type: string
  title: string
}

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"])

const formatTitle = (filename: string) =>
  filename
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())

const normalizePath = (value: string) => value.split(path.sep).join("/")

const collectImages = (rootDir: string, category: string): GalleryImage[] => {
  const publicDir = path.join(process.cwd(), "public")
  const images: GalleryImage[] = []

  const walk = (currentDir: string) => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
        continue
      }

      const ext = path.extname(entry.name).toLowerCase()
      if (!IMAGE_EXTENSIONS.has(ext)) {
        continue
      }

      const relativeToRoot = path.relative(rootDir, fullPath)
      const type = path.dirname(relativeToRoot) === "." ? "general" : normalizePath(path.dirname(relativeToRoot))
      const relativeToPublic = normalizePath(path.relative(publicDir, fullPath))
      const id = normalizePath(relativeToRoot).replace(/\.[^/.]+$/, "")

      images.push({
        id: `${category}-${id}`,
        src: `/${relativeToPublic}`,
        category,
        type,
        title: formatTitle(entry.name),
      })
    }
  }

  walk(rootDir)
  return images
}

export const getGalleryImages = (): GalleryImage[] => {
  const galleryDir = path.join(process.cwd(), "public", "gallery")
  const projectsDir = path.join(process.cwd(), "public", "projects")
  const galleryImages = fs.existsSync(galleryDir) ? collectImages(galleryDir, "gallery") : []
  const projectImages = fs.existsSync(projectsDir) ? collectImages(projectsDir, "projects") : []

  return [...galleryImages, ...projectImages]
}
