import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

interface Alert {
  id: string
  type: 'interaction' | 'dose' | 'allergy' | 'critical'
  priority: 'high' | 'medium' | 'low'
  patient: string
  bed: string
  medication: string
  description: string
  time: string
  status: 'pending' | 'reviewed' | 'resolved'
}

interface Prescription {
  id: string
  patient: string
  bed: string
  medications: string[]
  status: 'normal' | 'flagged' | 'critical'
  aiScore: number
}

export default function Page6ClinicalPharmacy() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'interaction',
      priority: 'high',
      patient: 'Maria Silva',
      bed: '302B',
      medication: 'Warfarina + AAS',
      description: 'Risco de sangramento aumentado - interação medicamentosa detectada',
      time: '2024-01-15 15:30',
      status: 'pending',
    },
    {
      id: '2',
      type: 'dose',
      priority: 'high',
      patient: 'João Santos',
      bed: '405A',
      medication: 'Insulina Regular',
      description: 'Dose acima do padrão recomendado para perfil do paciente',
      time: '2024-01-15 14:45',
      status: 'reviewed',
    },
    {
      id: '3',
      type: 'critical',
      priority: 'high',
      patient: 'Ana Costa',
      bed: '501A',
      medication: 'Múltiplos',
      description: 'Paciente em situação crítica - múltiplos alertas de segurança',
      time: '2024-01-15 16:00',
      status: 'pending',
    },
    {
      id: '4',
      type: 'allergy',
      priority: 'medium',
      patient: 'Pedro Oliveira',
      bed: '203C',
      medication: 'Penicilina',
      description: 'Alergia documentada - prescrição contém alérgeno conhecido',
      time: '2024-01-15 13:20',
      status: 'resolved',
    },
  ])

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: '1',
      patient: 'Maria Silva',
      bed: '302B',
      medications: ['Warfarina', 'AAS', 'Omeprazol'],
      status: 'flagged',
      aiScore: 85,
    },
    {
      id: '2',
      patient: 'João Santos',
      bed: '405A',
      medications: ['Insulina Regular', 'Metformina'],
      status: 'flagged',
      aiScore: 72,
    },
    {
      id: '3',
      patient: 'Ana Costa',
      bed: '501A',
      medications: ['Noradrenalina', 'Fentanil', 'Midazolam'],
      status: 'critical',
      aiScore: 95,
    },
    {
      id: '4',
      patient: 'Pedro Oliveira',
      bed: '203C',
      medications: ['Amoxicilina', 'Paracetamol'],
      status: 'normal',
      aiScore: 15,
    },
  ])

  const [filterAlertType, setFilterAlertType] = useState<string>('all')
  const [filterAlertPriority, setFilterAlertPriority] = useState<string>('all')
  const [filterPrescriptionStatus, setFilterPrescriptionStatus] = useState<string>('all')
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)
  const [selectedPrescription, setSelectedPrescription] = useState<string | null>(null)

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesType = filterAlertType === 'all' || alert.type === filterAlertType
      const matchesPriority = filterAlertPriority === 'all' || alert.priority === filterAlertPriority
      return matchesType && matchesPriority
    })
  }, [alerts, filterAlertType, filterAlertPriority])

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter((prescription) => {
      return filterPrescriptionStatus === 'all' || prescription.status === filterPrescriptionStatus
    })
  }, [prescriptions, filterPrescriptionStatus])

  const handleReviewAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, status: 'reviewed' as const } : alert
      )
    )
  }

  const handleResolveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, status: 'resolved' as const } : alert
      )
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'interaction':
        return '⚠️'
      case 'dose':
        return '📊'
      case 'allergy':
        return '🚫'
      case 'critical':
        return '🔴'
      default:
        return 'ℹ️'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-red-50 text-red-700 border-red-200'
      case 'reviewed':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'resolved':
        return 'bg-green-50 text-green-700 border-green-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const pendingAlerts = alerts.filter((a) => a.status === 'pending')
  const criticalPrescriptions = prescriptions.filter((p) => p.status === 'critical' || p.status === 'flagged')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/20 py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-200/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-10 animate-slide-down">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <span className="text-2xl sm:text-3xl">🤖</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-700 to-pink-700 bg-clip-text text-transparent">
                Farmácia Clínica com IA
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium mt-1">
                Prevenção de Erros e Segurança do Paciente
              </p>
            </div>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base text-gray-600 font-medium">Alertas Pendentes</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-red-600">{pendingAlerts.length}</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base text-gray-600 font-medium">Prescrições Analisadas</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">{prescriptions.length}</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base text-gray-600 font-medium">Prescrições Sinalizadas</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-orange-600">{criticalPrescriptions.length}</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base text-gray-600 font-medium">Erros Prevenidos (24h)</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">12</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-6 border border-gray-200">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">Filtros</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Tipo de Alerta
              </label>
              <select
                value={filterAlertType}
                onChange={(e) => setFilterAlertType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">Todos</option>
                <option value="interaction">Interação</option>
                <option value="dose">Dose</option>
                <option value="allergy">Alergia</option>
                <option value="critical">Crítico</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Prioridade
              </label>
              <select
                value={filterAlertPriority}
                onChange={(e) => setFilterAlertPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">Todas</option>
                <option value="high">Alta</option>
                <option value="medium">Média</option>
                <option value="low">Baixa</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Status Prescrição
              </label>
              <select
                value={filterPrescriptionStatus}
                onChange={(e) => setFilterPrescriptionStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">Todas</option>
                <option value="normal">Normal</option>
                <option value="flagged">Sinalizada</option>
                <option value="critical">Crítica</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alertas Críticos */}
        <div className="mb-6 sm:mb-8 animate-slide-down">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Alertas de Segurança ({filteredAlerts.filter((a) => a.status === 'pending').length} pendentes)
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhum alerta encontrado com os filtros aplicados
              </div>
            ) : (
              filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border-2 border-red-300 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getTypeIcon(alert.type)}</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm sm:text-base">
                          {alert.patient} - Leito {alert.bed}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">{alert.medication}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(alert.priority)}`}>
                        {alert.priority === 'high' ? 'Alta' : alert.priority === 'medium' ? 'Média' : 'Baixa'}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 mb-2">{alert.description}</p>
                    <p className="text-xs text-gray-500">Detectado em: {alert.time}</p>
                  </div>
                  <div className="flex gap-2 sm:flex-col">
                    {alert.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleReviewAlert(alert.id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 whitespace-nowrap"
                        >
                          Revisar Agora
                        </button>
                        <button
                          onClick={() => handleResolveAlert(alert.id)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 whitespace-nowrap"
                        >
                          Resolver
                        </button>
                      </>
                    )}
                    {alert.status === 'reviewed' && (
                      <button
                        onClick={() => handleResolveAlert(alert.id)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 whitespace-nowrap"
                      >
                        Marcar como Resolvido
                      </button>
                    )}
                    {alert.status === 'resolved' && (
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-semibold whitespace-nowrap">
                        ✓ Resolvido
                      </span>
                    )}
                    <button
                      onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 whitespace-nowrap"
                    >
                      {selectedAlert === alert.id ? 'Ocultar' : 'Detalhes'}
                    </button>
                  </div>
                </div>
                {selectedAlert === alert.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Detalhes do Alerta:</p>
                    <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                      <li>• Tipo: {alert.type === 'interaction' ? 'Interação Medicamentosa' : alert.type === 'dose' ? 'Dose Fora do Padrão' : alert.type === 'allergy' ? 'Alergia' : 'Crítico'}</li>
                      <li>• Prioridade: {alert.priority === 'high' ? 'Alta' : alert.priority === 'medium' ? 'Média' : 'Baixa'}</li>
                      <li>• Status: {alert.status === 'pending' ? 'Pendente' : alert.status === 'reviewed' ? 'Revisado' : 'Resolvido'}</li>
                      <li>• Medicamento: {alert.medication}</li>
                    </ul>
                  </div>
                )}
              </div>
              ))
            )}
          </div>
        </div>

        {/* Prescrições Analisadas pela IA */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Prescrições Analisadas pela IA ({filteredPrescriptions.length})
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {filteredPrescriptions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhuma prescrição encontrada com os filtros aplicados
              </div>
            ) : (
              filteredPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  prescription.status === 'critical'
                    ? 'bg-red-50 border-red-300'
                    : prescription.status === 'flagged'
                    ? 'bg-orange-50 border-orange-300'
                    : 'bg-green-50 border-green-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-bold text-gray-900 text-sm sm:text-base">
                        {prescription.patient} - Leito {prescription.bed}
                      </p>
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          prescription.status === 'critical'
                            ? 'bg-red-100 text-red-800'
                            : prescription.status === 'flagged'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {prescription.status === 'critical'
                          ? 'Crítico'
                          : prescription.status === 'flagged'
                          ? 'Sinalizado'
                          : 'Normal'}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-600">
                        Score IA: {prescription.aiScore}%
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {prescription.medications.map((med, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white/80 text-gray-700 border border-gray-200"
                        >
                          {med}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPrescription(selectedPrescription === prescription.id ? null : prescription.id)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 whitespace-nowrap"
                  >
                    {selectedPrescription === prescription.id ? 'Ocultar' : 'Analisar Detalhes'}
                  </button>
                </div>
                {selectedPrescription === prescription.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Análise Detalhada pela IA:</p>
                    <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                      <div className="flex items-center justify-between">
                        <span>Score de Risco:</span>
                        <span className={`font-bold ${prescription.aiScore > 70 ? 'text-red-600' : prescription.aiScore > 40 ? 'text-orange-600' : 'text-green-600'}`}>
                          {prescription.aiScore}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Status:</span>
                        <span className={`font-semibold ${
                          prescription.status === 'critical' ? 'text-red-600' : 
                          prescription.status === 'flagged' ? 'text-orange-600' : 
                          'text-green-600'
                        }`}>
                          {prescription.status === 'critical' ? 'Crítico' : 
                           prescription.status === 'flagged' ? 'Sinalizado' : 
                           'Normal'}
                        </span>
                      </div>
                      <div className="mt-3">
                        <p className="font-medium mb-2">Medicamentos Prescritos:</p>
                        <div className="flex flex-wrap gap-2">
                          {prescription.medications.map((med, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white text-gray-700 border border-gray-300"
                            >
                              {med}
                            </span>
                          ))}
                        </div>
                      </div>
                      {prescription.aiScore > 70 && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="font-semibold text-red-900 text-xs">⚠️ Atenção: Esta prescrição requer revisão imediata do farmacêutico clínico.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              ))
            )}
          </div>
        </div>

        {/* Funcionalidades da IA */}
        <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 border border-gray-200">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Capacidades da Inteligência Artificial
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            <div>
              <p className="font-medium mb-2">✓ Identificação de interações medicamentosas</p>
              <p className="text-xs sm:text-sm">Análise em tempo real de possíveis interações perigosas</p>
            </div>
            <div>
              <p className="font-medium mb-2">✓ Detecção de doses fora do padrão</p>
              <p className="text-xs sm:text-sm">Comparação com protocolos clínicos e histórico do paciente</p>
            </div>
            <div>
              <p className="font-medium mb-2">✓ Alertas de alergias conhecidas</p>
              <p className="text-xs sm:text-sm">Verificação automática contra banco de alergias</p>
            </div>
            <div>
              <p className="font-medium mb-2">✓ Priorização inteligente</p>
              <p className="text-xs sm:text-sm">Classificação automática por risco e urgência</p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="pt-6 border-t border-gray-200">
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Áreas Relacionadas</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/estoque"
                className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-105 border border-blue-200"
              >
                <span className="text-2xl mr-3">📦</span>
                <div>
                  <p className="text-sm font-semibold text-blue-900">Gestão de Estoque</p>
                  <p className="text-xs text-blue-700">Verificar disponibilidade</p>
                </div>
              </Link>
              <Link
                to="/medico"
                className="flex items-center p-3 bg-fuchsia-50 hover:bg-fuchsia-100 rounded-lg transition-all duration-200 hover:scale-105 border border-fuchsia-200"
              >
                <span className="text-2xl mr-3">👨‍⚕️</span>
                <div>
                  <p className="text-sm font-semibold text-fuchsia-900">Área Médica</p>
                  <p className="text-xs text-fuchsia-700">Prescrições e alertas</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

