"use client"

import { useCallback, useEffect, useRef, useState } from "react"

// Lazy loading hook for images
export function useLazyLoading() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return { imgRef, isLoaded, isInView, handleLoad }
}

// Debounce hook for search and form inputs
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Performance monitoring
export function measurePerformance(name: string, fn: () => void) {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`[Performance] ${name}: ${end - start}ms`)
}

// Image optimization helper
export function getOptimizedImageUrl(src: string, width: number, quality = 75): string {
  if (src.startsWith("/placeholder.svg")) {
    return src
  }

  // For Next.js Image optimization
  const params = new URLSearchParams({
    url: src,
    w: width.toString(),
    q: quality.toString(),
  })

  return `/_next/image?${params.toString()}`
}

// Preload critical resources
export function preloadResource(href: string, as: "script" | "style" | "font" | "image") {
  const link = document.createElement("link")
  link.rel = "preload"
  link.href = href
  link.as = as
  if (as === "font") {
    link.crossOrigin = "anonymous"
  }
  document.head.appendChild(link)
}
