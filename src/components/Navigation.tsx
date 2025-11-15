import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

export default function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Painel NIR', icon: '🏥' },
    { path: '/medico', label: 'Médico', icon: '👨‍⚕️' },
    { path: '/higienizacao', label: 'Higienização', icon: '🧹' },
    { path: '/ps', label: 'Dashboard PS', icon: '📊' },
    { path: '/estoque', label: 'Estoque', icon: '📦' },
    { path: '/farmacia', label: 'Farmácia IA', icon: '🤖' },
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg sticky top-0 z-50" role="navigation" aria-label="Navegação principal">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-all duration-300 hover:scale-105">
                <Logo size="md" className="scale-150" />
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-fuchsia-700 bg-clip-text text-transparent">FluxusAI</span>
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
      <div className="sm:hidden border-t border-gray-200 bg-white/98 backdrop-blur-sm">
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

