import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface CtaBannerProps {
  title: string
  description: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function CtaBanner({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CtaBannerProps) {
  return (
    <section className="py-14 sm:py-16 bg-[var(--color-deep)] text-white">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-sm sm:text-base md:text-lg text-white/80 mb-8">{description}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={primaryHref}>
            <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-alt)] text-[var(--color-deep)] font-semibold px-6">
              {primaryLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link href={secondaryHref}>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-6">
                {secondaryLabel}
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}
