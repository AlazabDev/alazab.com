"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Calendar, MapPin, User, DollarSign, Square, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { ProjectGallery } from "@/components/project-gallery"
import { Model3DViewer } from "@/components/model-3d-viewer"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProject() {
      try {
        const supabase = createClient()

        const { data, error } = await supabase
          .from("projects")
          .select(`
            *,
            project_images (*),
            project_files (*),
            project_3d_models (*)
          `)
          .eq("id", params.id)
          .single()

        if (error) {
          setError(error.message)
          return
        }

        if (!data) {
          setError("Project not found")
          return
        }

        setProject(data)
      } catch (err) {
        setError("Failed to fetch project")
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading project...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}

function ProjectDetailClient({ project }: { project: any }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50/30">
      {/* Hero Section */}
      <ProjectHero project={project} />

      {/* Project Details */}
      <ProjectDetails project={project} />

      {/* Gallery and 3D Models */}
      <ProjectMedia project={project} />

      {/* Project Files */}
      <ProjectFiles project={project} />

      {/* Related Projects */}
      <RelatedProjects category={project.category} currentId={project.id} />
    </div>
  )
}

function ProjectHero({ project }: { project: any }) {
  const primaryImage = project.project_images?.find((img: any) => img.is_primary) || project.project_images?.[0]

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70 z-10" />
      {primaryImage && (
        <Image
          src={primaryImage.image_url || "/placeholder.svg"}
          alt={primaryImage.alt_text_en || project.title_en}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      )}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <Link
            href="/projects"
            className="inline-flex items-center text-amber-300 hover:text-amber-200 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Projects
          </Link>

          <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30 mb-4">
            {getCategoryLabel(project.category)}
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">{project.title_en}</h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed mb-8">{project.description_en}</p>

          <div className="flex flex-wrap gap-6 text-white/80">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-amber-400" />
              {project.location}
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-amber-400" />
              {project.client_name}
            </div>
            {project.completion_date && (
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-amber-400" />
                {new Date(project.completion_date).toLocaleDateString()}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectDetails({ project }: { project: any }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{project.description_en}</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge variant={project.status === "completed" ? "default" : "secondary"}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Badge>
                  </div>

                  {project.project_area && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Area</span>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1 text-amber-500" />
                        {project.project_area} m²
                      </div>
                    </div>
                  )}

                  {project.budget_range && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Budget Range</span>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-amber-500" />
                        {project.budget_range}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">{getCategoryLabel(project.category)}</span>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full bg-amber-500 hover:bg-amber-600">
                      <Eye className="h-4 w-4 mr-2" />
                      Request Similar Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectMedia({ project }: { project: any }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Project Gallery</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Explore detailed images and 3D visualizations of this project
          </p>
        </motion.div>

        <Tabs defaultValue="gallery" className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="gallery">Image Gallery</TabsTrigger>
              <TabsTrigger value="3d-models">3D Models</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="gallery">
            <ProjectGallery images={project.project_images || []} />
          </TabsContent>

          <TabsContent value="3d-models">
            <div className="grid md:grid-cols-2 gap-8">
              {project.project_3d_models?.map((model: any) => (
                <Model3DViewer key={model.id} model={model} />
              ))}
              {(!project.project_3d_models || project.project_3d_models.length === 0) && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No 3D models available for this project</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

function ProjectFiles({ project }: { project: any }) {
  if (!project.project_files || project.project_files.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Project Documents</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {project.project_files.map((file: any) => (
              <Card key={file.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-2">{file.file_name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{file.description_en}</p>
                      <p className="text-xs text-gray-500">
                        {file.file_type.toUpperCase()} • {formatFileSize(file.file_size)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={file.file_url} target="_blank" rel="noopener noreferrer">
                        Download
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function RelatedProjects({ category, currentId }: { category: string; currentId: string }) {
  const [relatedProjects, setRelatedProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRelatedProjects() {
      try {
        const supabase = createClient()

        const { data } = await supabase
          .from("projects")
          .select("*, project_images!inner(*)")
          .eq("category", category)
          .neq("id", currentId)
          .eq("project_images.is_primary", true)
          .limit(3)

        if (data) {
          setRelatedProjects(data)
        }
      } catch (err) {
        console.error("Failed to fetch related projects:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProjects()
  }, [category, currentId])

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (!relatedProjects || relatedProjects.length === 0) {
    return null
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Related Projects</h2>
          <p className="text-lg text-gray-700">Discover more projects in the {getCategoryLabel(category)} category</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {relatedProjects.map((project: any) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="relative h-64 w-full">
                  <Image
                    src={project.project_images[0]?.image_url || "/placeholder.svg"}
                    alt={project.title_en}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{project.title_en}</CardTitle>
                  <CardDescription className="line-clamp-3">{project.description_en}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/projects/${project.id}`}>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                      View Project
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Helper functions
function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    "luxury-finishing": "Luxury Finishing",
    "brand-identity": "Brand Identity",
    "maintenance-renovations": "Maintenance & Renovations",
    "general-supplies": "General Supplies",
  }
  return labels[category] || category
}

function formatFileSize(bytes: number): string {
  if (!bytes) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
