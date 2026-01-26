import Image from "next/image"

interface PageHeroProps {
  title: string
  subtitle: string
  image: string
  badge?: string
}

export function PageHero({ title, subtitle, image, badge }: PageHeroProps) {
  return (
    <section className="relative h-[360px] sm:h-[420px] lg:h-[480px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/70 z-10" />
      <Image src={image} alt={title} fill className="object-cover" priority sizes="100vw" />
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        {badge ? (
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm font-medium text-white mb-4">
            {badge}
          </span>
        ) : null}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl">{subtitle}</p>
      </div>
    </section>
  )
}
