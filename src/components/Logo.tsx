interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
  }

  // Try to load the PNG logo, fallback to SVG if PNG doesn't exist
  const logoSrc = '/logo.png'
  const logoSvg = '/logo.svg'

  // O scale já é aplicado via className do componente pai
  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`} aria-label="FluxusAI Logo">
      <img
        src={logoSrc}
        alt="FluxusAI Logo"
        className="w-full h-full object-contain"
        loading="eager"
        onError={(e) => {
          // Fallback to SVG if PNG is not found
          const target = e.target as HTMLImageElement
          if (target.src !== logoSvg) {
            target.src = logoSvg
          }
        }}
      />
    </div>
  )
}

