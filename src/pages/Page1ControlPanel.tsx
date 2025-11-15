import { useState } from 'react'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Painel de Controle NIR
          </h1>
          <p className="text-lg text-gray-600">
            Gestão de Mobilização PCP Nível 1
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <div className="text-center">
            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-fuchsia-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-fuchsia-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </div>

            {/* Main Button */}
            <button
              onClick={handleActivatePCP}
              disabled={isLoading || state.pcpActivated}
              className={`
                w-full sm:w-auto px-8 py-4 sm:py-5
                text-lg sm:text-xl font-semibold
                rounded-xl
                transition-all duration-300
                focus:outline-none focus:ring-4 focus:ring-fuchsia-300
                disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  isLoading || state.pcpActivated
                    ? 'bg-fuchsia-400 text-white'
                    : 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                }
              `}
              aria-label="Declarar PCP Nível 1"
            >
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
                  Ativando...
                </span>
              ) : state.pcpActivated ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="w-6 h-6 mr-2"
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
                  PCP Nível 1 Ativado
                </span>
              ) : (
                'Declarar PCP Nível 1'
              )}
            </button>

            {/* Confirmation Message */}
            {showConfirmation && (
              <div
                className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in"
                role="alert"
                aria-live="polite"
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 mr-2"
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
                  <p className="text-green-800 font-medium">
                    PCP Nível 1 ATIVADO. Mobilizando equipes...
                  </p>
                </div>
              </div>
            )}

            {/* Info Text */}
            <p className="mt-8 text-sm text-gray-500">
              Este comando disparará alertas para as equipes médica e de higienização
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

