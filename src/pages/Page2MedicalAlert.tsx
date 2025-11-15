import { useEffect, useState, useMemo } from 'react'
import { useAppState, Patient } from '../context/StateContext'

export default function Page2MedicalAlert() {
  const { state, confirmMedical, setSelectedPatient } = useAppState()
  const [showModal, setShowModal] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [selectedPatientDetails, setSelectedPatientDetails] = useState<Patient | null>(null)

  // Ordenar pacientes: PCP primeiro, depois por status crítico
  const sortedPatients = useMemo(() => {
    return [...state.patients].sort((a, b) => {
      // Prioridade PCP primeiro
      if (a.pcpPriority && !b.pcpPriority) return -1
      if (!a.pcpPriority && b.pcpPriority) return 1
      
      // Depois por status crítico
      const statusOrder = { critical: 0, monitoring: 1, discharge_pending: 2, stable: 3 }
      return statusOrder[a.status] - statusOrder[b.status]
    })
  }, [state.patients])

  useEffect(() => {
    // Mostrar modal quando PCP é ativado e há paciente prioritário
    if (state.pcpActivated && !state.medicalConfirmed) {
      const pcpPatient = state.patients.find(p => p.pcpPriority)
      if (pcpPatient) {
        setSelectedPatientDetails(pcpPatient)
        setShowModal(true)
      }
    }
  }, [state.pcpActivated, state.medicalConfirmed, state.patients])

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

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'monitoring':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'discharge_pending':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'stable':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusLabel = (status: Patient['status']) => {
    switch (status) {
      case 'critical':
        return 'Crítico'
      case 'monitoring':
        return 'Em Monitoramento'
      case 'discharge_pending':
        return 'Alta Pendente'
      case 'stable':
        return 'Estável'
      default:
        return 'Indefinido'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-200/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-10 animate-slide-down">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-2">
            Área Médica - Lista de Pacientes
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium">
            Gestão de Pacientes e Assinatura de Altas
          </p>
        </div>

        {/* PCP Alert Banner */}
        {state.pcpActivated && state.pcpLevel && (
          <div className={`mb-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 shadow-lg animate-slide-down ${
            state.pcpLevel === 1 ? 'bg-blue-50 border-blue-300' :
            state.pcpLevel === 2 ? 'bg-yellow-50 border-yellow-300' :
            state.pcpLevel === 3 ? 'bg-orange-50 border-orange-300' :
            'bg-red-50 border-red-300'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  state.pcpLevel === 1 ? 'bg-blue-200' :
                  state.pcpLevel === 2 ? 'bg-yellow-200' :
                  state.pcpLevel === 3 ? 'bg-orange-200' :
                  'bg-red-200'
                }`}>
                  <span className="text-2xl">⚠️</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">PCP Nível {state.pcpLevel} Ativado</h3>
                  <p className="text-sm text-gray-700">
                    {sortedPatients.filter(p => p.pcpPriority).length} paciente(s) com prioridade PCP
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Pacientes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedPatients.map((patient) => (
            <div
              key={patient.id}
              className={`bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 animate-slide-down ${
                patient.pcpPriority
                  ? 'border-fuchsia-500 bg-gradient-to-br from-fuchsia-50/50 to-white'
                  : 'border-gray-200'
              }`}
              style={{ animationDelay: `${sortedPatients.indexOf(patient) * 0.1}s` }}
            >
              {/* Header do Card */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{patient.name}</h3>
                    {patient.pcpPriority && (
                      <span className="px-2 py-1 bg-fuchsia-600 text-white text-xs font-bold rounded-full animate-pulse">
                        PCP
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">Leito: <span className="font-semibold">{patient.bed}</span></p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(patient.status)}`}>
                  {getStatusLabel(patient.status)}
                </span>
              </div>

              {/* Diagnóstico */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Diagnóstico</p>
                <p className="text-sm font-medium text-gray-900">{patient.diagnosis}</p>
              </div>

              {/* Medicamentos */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Medicamentos</p>
                <div className="flex flex-wrap gap-2">
                  {patient.medications.map((med, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                    >
                      {med}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSelectedPatient(patient.id)
                    if (patient.pcpPriority && !state.medicalConfirmed) {
                      setSelectedPatientDetails(patient)
                      setShowModal(true)
                    }
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    patient.pcpPriority && !state.medicalConfirmed
                      ? 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-lg'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  {patient.pcpPriority && !state.medicalConfirmed ? 'Assinar Alta' : 'Ver Detalhes'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Alerta PCP */}
      {showModal && selectedPatientDetails && (
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

            {/* Patient Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">Paciente:</p>
              <p className="text-base text-gray-700">{selectedPatientDetails.name}</p>
              <p className="text-sm text-gray-600 mt-1">Leito: {selectedPatientDetails.bed} | Diagnóstico: {selectedPatientDetails.diagnosis}</p>
            </div>

            {/* Task Description */}
            <div
              id="alert-description"
              className="bg-gradient-to-r from-gray-50 to-fuchsia-50/30 rounded-lg sm:rounded-xl p-4 sm:p-5 mb-4 sm:mb-6 border-l-4 border-fuchsia-600 shadow-sm"
            >
              <p className="text-xs sm:text-sm text-gray-600 mb-2 font-medium">Tarefa Delegada:</p>
              <p className="text-base sm:text-lg font-semibold text-gray-900">
                PRIORIDADE (PCP): Assinar alta Leito {selectedPatientDetails.bed}
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
    </div>
  )
}
