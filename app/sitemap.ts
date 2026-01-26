import { PROJECTS } from "@/lib/data/projects"

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://al-azab.co"

  const routes = ["", "/about", "/services", "/projects", "/clients", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(project.completionDate).toISOString(),
  }))

  return [...routes, ...projectRoutes]
}
