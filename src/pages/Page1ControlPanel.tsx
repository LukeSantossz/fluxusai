import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppState } from '../context/StateContext'

export default function Page1ControlPanel() {
  const { state, activatePCP } = useAppState()
  const [isLoading, setIsLoading] = useState<number | null>(null)
  const [showConfirmation, setShowConfirmation] = useState<number | null>(null)
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null)

  const handleActivatePCP = (level: 1 | 2 | 3 | 4, patientId?: string) => {
    setIsLoading(level)
    
    // Simular delay de processamento
    setTimeout(() => {
      activatePCP(level, patientId)
      setIsLoading(null)
      setShowConfirmation(level)
    }, 1000)
  }

  const getPCPLevelInfo = (level: 1 | 2 | 3 | 4) => {
    const levels = {
      1: { 
        name: 'Nível 1', 
        description: 'Situação normal ou próxima do normal',
        color: 'from-blue-600 via-blue-700 to-indigo-600',
        hoverColor: 'hover:from-blue-700 hover:via-blue-800 hover:to-indigo-700',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-800',
        borderColor: 'border-blue-300'
      },
      2: { 
        name: 'Nível 2', 
        description: 'Aumento moderado de demanda',
        color: 'from-yellow-600 via-yellow-700 to-orange-600',
        hoverColor: 'hover:from-yellow-700 hover:via-yellow-800 hover:to-orange-700',
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-800',
        borderColor: 'border-yellow-300'
      },
      3: { 
        name: 'Nível 3', 
        description: 'Alta demanda, recursos intensivos',
        color: 'from-orange-600 via-orange-700 to-red-600',
        hoverColor: 'hover:from-orange-700 hover:via-orange-800 hover:to-red-700',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-800',
        borderColor: 'border-orange-300'
      },
      4: { 
        name: 'Nível 4', 
        description: 'Situação crítica, recursos esgotados',
        color: 'from-red-600 via-red-700 to-red-800',
        hoverColor: 'hover:from-red-700 hover:via-red-800 hover:to-red-900',
        bgColor: 'bg-red-50',
        textColor: 'text-red-800',
        borderColor: 'border-red-300'
      },
    }
    return levels[level]
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
            Gestão de Mobilização PCP - Escala de Níveis
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl sm:shadow-3xl p-5 sm:p-8 md:p-12 border border-white/50 hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 animate-scale-in">
          <div className="text-center">
            {/* PCP Level Buttons - Accordion on Mobile, Full on Desktop */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {([1, 2, 3, 4] as const).map((level) => {
                const levelInfo = getPCPLevelInfo(level)
                const isActive = state.pcpLevel === level
                const isLoadingLevel = isLoading === level
                const showConfirmationLevel = showConfirmation === level
                const isExpanded = expandedLevel === level
                
                return (
                  <div 
                    key={level} 
                    className={`
                      animate-slide-down overflow-hidden
                      bg-white/50 sm:bg-transparent rounded-xl sm:rounded-none
                      border border-gray-200 sm:border-none
                      transition-all duration-300
                    `}
                    style={{ animationDelay: `${level * 0.1}s` }}
                  >
                    {/* Mobile: Accordion Header */}
                    <div className="sm:hidden">
                      <button
                        onClick={() => setExpandedLevel(isExpanded ? null : level)}
                        className={`
                          w-full px-4 py-4 flex items-center justify-between
                          bg-gradient-to-r ${levelInfo.color} text-white
                          rounded-xl transition-all duration-300
                          ${isExpanded ? 'rounded-b-none' : ''}
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50
                        `}
                        aria-expanded={isExpanded}
                        aria-label={`${isExpanded ? 'Recolher' : 'Expandir'} PCP ${levelInfo.name}`}
                      >
                        <div className="flex items-center flex-1">
                          <span className="text-base font-bold mr-2">PCP {levelInfo.name}</span>
                          {isActive && (
                            <svg
                              className="w-5 h-5 mr-2"
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
                          )}
                        </div>
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Mobile: Accordion Content */}
                      <div
                        className={`
                          overflow-hidden transition-all duration-300 ease-in-out
                          ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                        `}
                      >
                        <div className={`p-4 bg-gradient-to-br ${levelInfo.color} text-white rounded-b-xl`}>
                          <p className="text-sm mb-4 opacity-90">{levelInfo.description}</p>
                          
                          <button
                            onClick={() => {
                              handleActivatePCP(level)
                              setExpandedLevel(null)
                            }}
                            disabled={isLoadingLevel || (state.pcpActivated && !isActive)}
                            className={`
                              w-full px-4 py-3
                              text-sm font-bold
                              rounded-lg
                              transition-all duration-300
                              focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2
                              disabled:opacity-50 disabled:cursor-not-allowed
                              active:scale-95
                              ${
                                isLoadingLevel || (state.pcpActivated && !isActive)
                                  ? 'bg-white/20 text-white'
                                  : 'bg-white text-gray-900 hover:bg-white/90 shadow-lg'
                              }
                            `}
                            aria-label={`Declarar PCP ${levelInfo.name}`}
                          >
                            {isLoadingLevel ? (
                              <span className="flex items-center justify-center">
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                                Ativando...
                              </span>
                            ) : isActive ? (
                              <span className="flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 mr-2"
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
                                PCP {levelInfo.name} Ativado
                              </span>
                            ) : (
                              'Ativar PCP ' + levelInfo.name
                            )}
                          </button>

                          {/* Confirmation Message Mobile */}
                          {showConfirmationLevel && (
                            <div
                              className={`mt-4 p-3 ${levelInfo.bgColor} border-2 ${levelInfo.borderColor} rounded-lg animate-slide-up`}
                              role="alert"
                              aria-live="polite"
                            >
                              <div className="flex items-center">
                                <svg
                                  className={`w-4 h-4 ${levelInfo.textColor} mr-2 flex-shrink-0`}
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
                                <p className={`text-xs ${levelInfo.textColor} font-medium`}>
                                  PCP {levelInfo.name} ATIVADO
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Full Button (Original Layout) */}
                    <div className="hidden sm:block">
                      <button
                        onClick={() => handleActivatePCP(level)}
                        disabled={isLoadingLevel || (state.pcpActivated && !isActive)}
                        className={`
                          relative w-full px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6
                          text-base sm:text-lg md:text-xl font-bold
                          rounded-xl sm:rounded-2xl
                          transition-all duration-300
                          focus:outline-none focus:ring-4 focus:ring-offset-2
                          disabled:opacity-50 disabled:cursor-not-allowed
                          active:scale-95
                          overflow-hidden
                          ${
                            isLoadingLevel || (state.pcpActivated && !isActive)
                              ? `bg-gradient-to-r ${levelInfo.color} text-white shadow-xl opacity-60`
                              : `bg-gradient-to-r ${levelInfo.color} ${levelInfo.hoverColor} text-white shadow-2xl hover:shadow-xl transform hover:scale-105`
                          }
                        `}
                        aria-label={`Declarar PCP ${levelInfo.name}`}
                      >
                        {/* Shine effect */}
                        {!isLoadingLevel && !state.pcpActivated && (
                          <div className="absolute inset-0 -top-2 -left-2 w-8 h-full bg-white/20 rotate-12 animate-shimmer" />
                        )}
                        {isLoadingLevel ? (
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
                            <span>Ativando...</span>
                          </span>
                        ) : isActive ? (
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
                            <span>PCP {levelInfo.name} Ativado</span>
                          </span>
                        ) : (
                          <div className="flex flex-col items-center">
                            <span>Declarar PCP {levelInfo.name}</span>
                            <span className="text-xs sm:text-sm opacity-90 mt-1 font-normal">
                              {levelInfo.description}
                            </span>
                          </div>
                        )}
                      </button>

                      {/* Confirmation Message Desktop */}
                      {showConfirmationLevel && (
                        <div
                          className={`mt-4 p-4 sm:p-5 ${levelInfo.bgColor} border-2 ${levelInfo.borderColor} rounded-xl sm:rounded-2xl animate-slide-up shadow-xl`}
                          role="alert"
                          aria-live="polite"
                        >
                          <div className="flex items-center justify-center sm:justify-start">
                            <svg
                              className={`w-5 h-5 sm:w-6 sm:h-6 ${levelInfo.textColor} mr-2 flex-shrink-0`}
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
                            <p className={`text-sm sm:text-base ${levelInfo.textColor} font-medium text-center sm:text-left`}>
                              PCP {levelInfo.name} ATIVADO. Mobilizando equipes...
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Info Text */}
            <p className="mt-6 sm:mt-8 md:mt-10 text-xs sm:text-sm text-gray-500 px-2 text-center leading-relaxed">
              Selecione o nível de PCP conforme a situação. O sistema disparará alertas para as equipes médica e de higienização
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
