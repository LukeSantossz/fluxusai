import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppState } from '../context/StateContext'

export default function Page1ControlPanel() {
  const { state, activatePCP } = useAppState()
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleActivatePCP = () => {
    setIsLoading(true)
    
    // Simular delay de processamento
    setTimeout(() => {
      activatePCP()
      setIsLoading(false)
      setShowConfirmation(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-fuchsia-50/30 to-purple-50/20 flex items-center justify-center px-4 py-6 sm:py-8 md:py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-fuchsia-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-2xl w-full relative z-10 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 animate-slide-down">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-fuchsia-700 to-gray-900 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4">
            Painel de Controle NIR
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium">
            Gestão de Mobilização PCP Nível 1
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl sm:shadow-3xl p-5 sm:p-8 md:p-12 border border-white/50 hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 animate-scale-in">
          <div className="text-center">
            {/* Icon with animation */}
            <div className="mb-6 sm:mb-8 md:mb-10 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-fuchsia-400/30 rounded-full blur-xl animate-pulse-glow" />
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-fuchsia-100 via-fuchsia-200 to-purple-200 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 animate-bounce-in border-4 border-white">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-fuchsia-600 drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Main Button */}
            <button
              onClick={handleActivatePCP}
              disabled={isLoading || state.pcpActivated}
              className={`
                relative w-full sm:w-auto px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6
                text-base sm:text-lg md:text-xl font-bold
                rounded-2xl sm:rounded-3xl
                transition-all duration-300
                focus:outline-none focus:ring-4 focus:ring-fuchsia-300 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                active:scale-95
                overflow-hidden
                ${
                  isLoading || state.pcpActivated
                    ? 'bg-gradient-to-r from-fuchsia-400 to-fuchsia-500 text-white shadow-xl'
                    : 'bg-gradient-to-r from-fuchsia-600 via-fuchsia-700 to-purple-600 hover:from-fuchsia-700 hover:via-fuchsia-800 hover:to-purple-700 text-white shadow-2xl hover:shadow-fuchsia-500/50 transform hover:scale-105 animate-pulse-glow'
                }
              `}
              aria-label="Declarar PCP Nível 1"
            >
              {/* Shine effect */}
              {!isLoading && !state.pcpActivated && (
                <div className="absolute inset-0 -top-2 -left-2 w-8 h-full bg-white/20 rotate-12 animate-shimmer" />
              )}
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="sm:hidden">Ativando...</span>
                  <span className="hidden sm:inline">Ativando...</span>
                </span>
              ) : state.pcpActivated ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="sm:hidden">Ativado</span>
                  <span className="hidden sm:inline">PCP Nível 1 Ativado</span>
                </span>
              ) : (
                <>
                  <span className="sm:hidden">Declarar PCP</span>
                  <span className="hidden sm:inline">Declarar PCP Nível 1</span>
                </>
              )}
            </button>

            {/* Confirmation Message */}
            {showConfirmation && (
              <div
                className="mt-6 sm:mt-8 md:mt-10 p-4 sm:p-5 md:p-6 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border-2 border-green-300 rounded-xl sm:rounded-2xl animate-slide-up shadow-xl"
                role="alert"
                aria-live="polite"
              >
                <div className="flex items-center justify-center sm:justify-start">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm sm:text-base text-green-800 font-medium text-center sm:text-left">
                    PCP Nível 1 ATIVADO. Mobilizando equipes...
                  </p>
                </div>
              </div>
            )}

            {/* Info Text */}
            <p className="mt-6 sm:mt-8 md:mt-10 text-xs sm:text-sm text-gray-500 px-2 text-center leading-relaxed">
              Este comando disparará alertas para as equipes médica e de higienização
            </p>

            {/* Quick Navigation */}
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-500 mb-4 text-center">Outras áreas do sistema:</p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <Link
                  to="/estoque"
                  className="flex flex-col items-center p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200 hover:scale-105 border border-blue-200"
                >
                  <span className="text-2xl sm:text-3xl mb-2">📦</span>
                  <span className="text-xs sm:text-sm font-semibold text-blue-800 text-center">Gestão de Estoque</span>
                </Link>
                <Link
                  to="/farmacia"
                  className="flex flex-col items-center p-3 sm:p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all duration-200 hover:scale-105 border border-purple-200"
                >
                  <span className="text-2xl sm:text-3xl mb-2">🤖</span>
                  <span className="text-xs sm:text-sm font-semibold text-purple-800 text-center">Farmácia com IA</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
