import { useEffect, useState } from 'react'
import { useAppState } from '../context/StateContext'

export default function Page2MedicalAlert() {
  const { state, confirmMedical } = useAppState()
  const [showModal, setShowModal] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  useEffect(() => {
    // Simular pop-up quando PCP é ativado
    if (state.pcpActivated && !state.medicalConfirmed) {
      setShowModal(true)
    }
  }, [state.pcpActivated, state.medicalConfirmed])

  const handleConfirm = () => {
    setIsConfirming(true)
    setTimeout(() => {
      confirmMedical()
      setIsConfirming(false)
      setShowModal(false)
    }, 800)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Simulated Electronic Medical Record Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 opacity-90 blur-sm animate-glow" />
        <div className="absolute inset-0 p-4 sm:p-8 text-white opacity-30">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="bg-white/10 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Prontuário Eletrônico</h2>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <p>Paciente: [Nome]</p>
                <p>Leito: 501A</p>
                <p>Diagnóstico: [Diagnóstico]</p>
                <p>Evolução: [Texto borrado...]</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Prescrições</h3>
              <ul className="space-y-1 text-xs sm:text-sm list-disc list-inside">
                <li>[Prescrição 1]</li>
                <li>[Prescrição 2]</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="alert-title"
          aria-describedby="alert-description"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            className="relative bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full p-5 sm:p-6 md:p-8 animate-scale-in border-2 border-white/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-fuchsia-500 rounded-full p-1.5 sm:p-2 hover:bg-gray-100"
              aria-label="Fechar alerta"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Alert Icon */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-red-400/40 rounded-full blur-xl animate-pulse" />
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center shadow-2xl animate-bounce-in border-4 border-white">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-600 drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Title */}
            <h2
              id="alert-title"
              className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3 sm:mb-4"
            >
              ALERTA DE PRIORIDADE COLETIVA
            </h2>
            <div className="text-center mb-4 sm:mb-6">
              {state.pcpLevel && (
                <span className={`inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-full shadow-sm ${
                  state.pcpLevel === 1 ? 'bg-blue-100 text-blue-800' :
                  state.pcpLevel === 2 ? 'bg-yellow-100 text-yellow-800' :
                  state.pcpLevel === 3 ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  PCP NÍVEL {state.pcpLevel}
                </span>
              )}
            </div>

            {/* Task Description */}
            <div
              id="alert-description"
              className="bg-gradient-to-r from-gray-50 to-fuchsia-50/30 rounded-lg sm:rounded-xl p-4 sm:p-5 mb-4 sm:mb-6 border-l-4 border-fuchsia-600 shadow-sm"
            >
              <p className="text-xs sm:text-sm text-gray-600 mb-2 font-medium">Tarefa Delegada:</p>
              <p className="text-base sm:text-lg font-semibold text-gray-900">
                PRIORIDADE (PCP): Assinar alta Leito {state.bedNumber}
              </p>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={isConfirming}
              className={`
                relative w-full py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8
                text-base sm:text-lg font-bold
                rounded-xl sm:rounded-2xl
                transition-all duration-300
                focus:outline-none focus:ring-4 focus:ring-fuchsia-300 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                active:scale-95
                overflow-hidden
                ${
                  isConfirming
                    ? 'bg-gradient-to-r from-fuchsia-400 to-fuchsia-500 text-white shadow-xl'
                    : 'bg-gradient-to-r from-fuchsia-600 via-fuchsia-700 to-purple-600 hover:from-fuchsia-700 hover:via-fuchsia-800 hover:to-purple-700 text-white shadow-2xl hover:shadow-fuchsia-500/50 transform hover:scale-105'
                }
              `}
              aria-label="Confirmar ação e assinar altas"
            >
              {!isConfirming && (
                <div className="absolute inset-0 -top-2 -left-2 w-8 h-full bg-white/20 rotate-12 animate-shimmer" />
              )}
              {isConfirming ? (
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
                  <span className="sm:hidden">Processando...</span>
                  <span className="hidden sm:inline">Processando...</span>
                </span>
              ) : (
                <>
                  <span className="sm:hidden">Confirmar Ação</span>
                  <span className="hidden sm:inline">Confirmar Ação / Altas Assinadas</span>
                </>
              )}
            </button>

            {/* Status Message */}
            {state.medicalConfirmed && (
              <div className="mt-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg sm:rounded-xl text-center animate-slide-up">
                <p className="text-xs sm:text-sm text-green-800 font-medium">
                  ✓ Altas confirmadas com sucesso
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Info when modal is not shown */}
      {!showModal && !state.medicalConfirmed && (
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="text-center text-white animate-fade-in">
            <div className="mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-base sm:text-lg mb-2 font-medium">Aguardando ativação do PCP</p>
            <p className="text-sm sm:text-base text-gray-300">
              O alerta aparecerá automaticamente quando um nível de PCP for declarado
            </p>
          </div>
        </div>
      )}

      {state.medicalConfirmed && (
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="text-center text-white animate-fade-in">
            <div className="mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-bounce-in">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-green-400"
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
              </div>
            </div>
            <p className="text-lg sm:text-xl font-semibold mb-2">Ação Confirmada</p>
            <p className="text-sm sm:text-base text-gray-300">
              Altas assinadas. Tarefa enviada para higienização.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
