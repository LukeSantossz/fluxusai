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
    <div className="min-h-screen bg-gray-900 relative">
      {/* Simulated Electronic Medical Record Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 opacity-80 blur-sm" />
        <div className="absolute inset-0 p-8 text-white opacity-30">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">Prontuário Eletrônico</h2>
              <div className="space-y-2 text-sm">
                <p>Paciente: [Nome]</p>
                <p>Leito: 501A</p>
                <p>Diagnóstico: [Diagnóstico]</p>
                <p>Evolução: [Texto borrado...]</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-2">Prescrições</h3>
              <ul className="space-y-1 text-sm list-disc list-inside">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="alert-title"
          aria-describedby="alert-description"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-fuchsia-500 rounded-full p-1"
              aria-label="Fechar alerta"
            >
              <svg
                className="w-6 h-6"
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
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2
              id="alert-title"
              className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4"
            >
              ALERTA DE PRIORIDADE COLETIVA
            </h2>
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 bg-fuchsia-100 text-fuchsia-800 text-sm font-semibold rounded-full">
                PCP NÍVEL 1
              </span>
            </div>

            {/* Task Description */}
            <div
              id="alert-description"
              className="bg-gray-50 rounded-lg p-4 mb-6 border-l-4 border-fuchsia-600"
            >
              <p className="text-sm text-gray-600 mb-2 font-medium">Tarefa Delegada:</p>
              <p className="text-lg font-semibold text-gray-900">
                PRIORIDADE (PCP): Assinar alta Leito {state.bedNumber}
              </p>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={isConfirming}
              className={`
                w-full py-4 px-6
                text-lg font-semibold
                rounded-xl
                transition-all duration-300
                focus:outline-none focus:ring-4 focus:ring-fuchsia-300
                disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  isConfirming
                    ? 'bg-fuchsia-400 text-white'
                    : 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-lg hover:shadow-xl'
                }
              `}
              aria-label="Confirmar ação e assinar altas"
            >
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
                  Processando...
                </span>
              ) : (
                'Confirmar Ação / Altas Assinadas'
              )}
            </button>

            {/* Status Message */}
            {state.medicalConfirmed && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                <p className="text-sm text-green-800 font-medium">
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
          <div className="text-center text-white">
            <p className="text-lg mb-2">Aguardando ativação do PCP Nível 1</p>
            <p className="text-sm text-gray-300">
              O alerta aparecerá automaticamente quando o PCP for declarado
            </p>
          </div>
        </div>
      )}

      {state.medicalConfirmed && (
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="text-center text-white">
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-green-400 mx-auto"
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
            <p className="text-xl font-semibold mb-2">Ação Confirmada</p>
            <p className="text-sm text-gray-300">
              Altas assinadas. Tarefa enviada para higienização.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

