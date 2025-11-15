import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

export default function Navigation() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY

          // No mobile, controlar visibilidade e tamanho baseado no scroll
          if (isMobile) {
            if (currentScrollY < 10) {
              // No topo, sempre mostrar completo
              setIsScrolled(false)
              setIsVisible(true)
            } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
              // Scrolling down - reduzir barra e esconder menu mobile
              setIsScrolled(true)
              setIsVisible(false)
            } else if (currentScrollY < lastScrollY) {
              // Scrolling up - mostrar barra compacta mas visível
              setIsScrolled(true)
              setIsVisible(true)
            }
          } else {
            // Desktop: apenas marcar como scrolled
            setIsScrolled(currentScrollY > 10)
            setIsVisible(true)
          }

          setLastScrollY(currentScrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, isMobile])

  const navItems = [
    { path: '/', label: 'Painel NIR', icon: '🏥' },
    { path: '/medico', label: 'Médico', icon: '👨‍⚕️' },
    { path: '/higienizacao', label: 'Higienização', icon: '🧹' },
    { path: '/ps', label: 'Dashboard PS', icon: '📊' },
    { path: '/estoque', label: 'Estoque', icon: '📦' },
    { path: '/farmacia', label: 'Farmácia IA', icon: '🤖' },
  ]

  return (
    <nav 
      className={`bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled && isMobile 
          ? 'shadow-md h-12' 
          : 'shadow-lg h-14 sm:h-16'
      }`}
      role="navigation" 
      aria-label="Navegação principal"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          isScrolled && isMobile ? 'h-12' : 'h-14 sm:h-16'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-all duration-300 hover:scale-105">
                <Logo 
                  size={isScrolled && isMobile ? "sm" : "md"} 
                  className={isScrolled && isMobile ? "scale-125" : "scale-150"} 
                />
                <span className={`font-bold bg-gradient-to-r from-gray-900 to-fuchsia-700 bg-clip-text text-transparent transition-all duration-300 ${
                  isScrolled && isMobile ? 'text-base' : 'text-lg sm:text-xl'
                }`}>
                  FluxusAI
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'border-fuchsia-500 text-fuchsia-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  <span className="mr-2" aria-hidden="true">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`sm:hidden border-t border-gray-200 bg-white/98 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-in-out ${
          isVisible && isMobile ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-t-0'
        }`}
      >
        <div className="pt-2 pb-3 space-y-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block pl-3 pr-4 py-3 border-l-4 text-sm font-semibold rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-fuchsia-50 to-purple-50 border-fuchsia-500 text-fuchsia-700 shadow-sm'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 active:scale-95'
              }`}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              <span className="mr-2 text-base" aria-hidden="true">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

