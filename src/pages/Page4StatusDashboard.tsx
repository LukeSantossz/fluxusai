import { useEffect, useState } from 'react'
import { useAppState, BedStatus } from '../context/StateContext'

interface StatusConfig {
  label: string
  color: string
  bgColor: string
  borderColor: string
  icon: string
}

const statusConfigs: Record<BedStatus, StatusConfig> = {
  WAITING_SIGNATURE: {
    label: 'AGUARDANDO ASSINATURA MÉDICA',
    color: 'text-orange-800',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-300',
    icon: '⏳',
  },
  WAITING_CLEANING: {
    label: 'AGUARDANDO HIGIENIZAÇÃO',
    color: 'text-yellow-800',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
    icon: '🧹',
  },
  READY: {
    label: 'LEITO PRONTO',
    color: 'text-green-800',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300',
    icon: '✅',
  },
}

export default function Page4StatusDashboard() {
  const { state } = useAppState()
  const [previousStatus, setPreviousStatus] = useState<BedStatus | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    // Simular transição suave quando status muda
    if (previousStatus !== null && previousStatus !== state.bedStatus) {
      setIsUpdating(true)
      setTimeout(() => {
        setIsUpdating(false)
      }, 600)
    }
    setPreviousStatus(state.bedStatus)
  }, [state.bedStatus, previousStatus])

  const currentStatus = statusConfigs[state.bedStatus]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Dashboard de Status
          </h1>
          <p className="text-lg text-gray-600">Pronto-Socorro - Monitoramento em Tempo Real</p>
        </div>

        {/* Status Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Bed Card */}
          <div
            className={`
              col-span-1 md:col-span-2 lg:col-span-3
              bg-white rounded-2xl shadow-xl border-2 p-6 sm:p-8
              transition-all duration-500
              ${currentStatus.borderColor}
              ${isUpdating ? 'animate-pulse' : ''}
            `}
            role="article"
            aria-label={`Status do leito ${state.bedNumber}`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex-1 mb-4 sm:mb-0">
                <div className="flex items-center mb-3">
                  <span className="text-2xl sm:text-3xl mr-3" aria-hidden="true">
                    {currentStatus.icon}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Leito {state.bedNumber}
                  </h2>
                </div>
                <div
                  className={`
                    inline-flex items-center px-4 py-2 rounded-lg
                    ${currentStatus.bgColor} ${currentStatus.borderColor} border-2
                    transition-all duration-500
                  `}
                >
                  <span className={`text-base sm:text-lg font-semibold ${currentStatus.color}`}>
                    {currentStatus.label}
                  </span>
                </div>
              </div>

              {/* Status Indicator Circle */}
              <div className="flex-shrink-0">
                <div
                  className={`
                    w-20 h-20 sm:w-24 sm:h-24 rounded-full
                    flex items-center justify-center
                    transition-all duration-500
                    ${
                      state.bedStatus === 'WAITING_SIGNATURE'
                        ? 'bg-orange-200'
                        : state.bedStatus === 'WAITING_CLEANING'
                        ? 'bg-yellow-200'
                        : 'bg-green-200'
                    }
                  `}
                  aria-hidden="true"
                >
                  <span className="text-3xl sm:text-4xl">{currentStatus.icon}</span>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                {[
                  { status: 'WAITING_SIGNATURE' as BedStatus, label: 'Assinatura' },
                  { status: 'WAITING_CLEANING' as BedStatus, label: 'Higienização' },
                  { status: 'READY' as BedStatus, label: 'Pronto' },
                ].map((step, index) => {
                  const isActive =
                    state.bedStatus === step.status ||
                    (step.status === 'WAITING_CLEANING' &&
                      state.bedStatus === 'READY') ||
                    (step.status === 'WAITING_SIGNATURE' &&
                      (state.bedStatus === 'WAITING_CLEANING' || state.bedStatus === 'READY'))
                  const isCurrent = state.bedStatus === step.status

                  return (
                    <div key={step.status} className="flex-1 flex items-center">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            text-sm font-semibold
                            transition-all duration-500
                            ${
                              isActive
                                ? isCurrent
                                  ? statusConfigs[step.status].bgColor +
                                    ' ' +
                                    statusConfigs[step.status].color +
                                    ' border-2 ' +
                                    statusConfigs[step.status].borderColor
                                  : 'bg-gray-200 text-gray-600'
                                : 'bg-gray-100 text-gray-400'
                            }
                          `}
                          aria-label={`Etapa ${index + 1}: ${step.label}`}
                        >
                          {isActive && !isCurrent ? (
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            index + 1
                          )}
                        </div>
                        <span
                          className={`
                            mt-2 text-xs sm:text-sm font-medium text-center
                            ${isActive ? 'text-gray-900' : 'text-gray-400'}
                          `}
                        >
                          {step.label}
                        </span>
                      </div>
                      {index < 2 && (
                        <div
                          className={`
                            flex-1 h-1 mx-2
                            transition-all duration-500
                            ${
                              isActive && state.bedStatus !== step.status
                                ? statusConfigs[step.status].bgColor
                                : 'bg-gray-200'
                            }
                          `}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Informações do Sistema
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">Status atual:</span>{' '}
              {currentStatus.label}
            </p>
            <p>
              <span className="font-medium">Leito monitorado:</span> {state.bedNumber}
            </p>
            <p>
              <span className="font-medium">PCP Nível 1:</span>{' '}
              {state.pcpActivated ? (
                <span className="text-green-600 font-semibold">Ativado</span>
              ) : (
                <span className="text-gray-400">Não ativado</span>
              )}
            </p>
            <p className="text-xs text-gray-500 mt-4">
              Atualizações automáticas em tempo real. Não é necessário atualizar a página.
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Legenda de Status
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(statusConfigs).map(([status, config]) => (
              <div
                key={status}
                className={`flex items-center p-3 rounded-lg ${config.bgColor} border ${config.borderColor}`}
              >
                <span className="text-2xl mr-3" aria-hidden="true">
                  {config.icon}
                </span>
                <span className={`text-sm font-medium ${config.color}`}>
                  {config.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

