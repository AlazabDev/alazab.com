interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "center" | "start"
}

export function SectionHeader({ eyebrow, title, description, align = "center" }: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-start"

  return (
    <div className={`${alignment} max-w-3xl`}>
      {eyebrow ? (
        <span className="inline-flex items-center rounded-full bg-[color:rgba(245,191,35,0.18)] px-4 py-2 text-xs sm:text-sm font-medium text-[var(--color-deep)] mb-4">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-deep)] dark:text-white mb-4">
        {title}
      </h2>
      {description ? (
        <p className="text-sm sm:text-base md:text-lg text-[var(--color-dark)] dark:text-gray-300">{description}</p>
      ) : null}
    </div>
  )
}
