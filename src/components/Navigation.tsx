import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Painel NIR', icon: '🏥' },
    { path: '/medico', label: 'Médico', icon: '👨‍⚕️' },
    { path: '/higienizacao', label: 'Higienização', icon: '🧹' },
    { path: '/ps', label: 'Dashboard PS', icon: '📊' },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm" role="navigation" aria-label="Navegação principal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900">FluxusAI</span>
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
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1 px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium rounded-md ${
                location.pathname === item.path
                  ? 'bg-fuchsia-50 border-fuchsia-500 text-fuchsia-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300'
              }`}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              <span className="mr-2" aria-hidden="true">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

