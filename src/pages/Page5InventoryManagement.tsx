import { useState } from 'react'
import { Link } from 'react-router-dom'

interface InventoryItem {
  id: string
  name: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  status: 'ok' | 'low' | 'critical' | 'out'
  lastUpdate: string
}

export default function Page5InventoryManagement() {
  const [items] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Soro Fisiológico 0,9% 500ml',
      category: 'Medicamentos',
      currentStock: 450,
      minStock: 200,
      maxStock: 800,
      unit: 'unidades',
      status: 'ok',
      lastUpdate: '2024-01-15 14:30',
    },
    {
      id: '2',
      name: 'Luvas Cirúrgicas Estéreis',
      category: 'Insumos',
      currentStock: 85,
      minStock: 100,
      maxStock: 500,
      unit: 'caixas',
      status: 'low',
      lastUpdate: '2024-01-15 13:15',
    },
    {
      id: '3',
      name: 'Máscara N95',
      category: 'EPI',
      currentStock: 0,
      minStock: 50,
      maxStock: 300,
      unit: 'unidades',
      status: 'out',
      lastUpdate: '2024-01-15 12:00',
    },
    {
      id: '4',
      name: 'Gaze Estéril 10x10cm',
      category: 'Insumos',
      currentStock: 1200,
      minStock: 500,
      maxStock: 2000,
      unit: 'pacotes',
      status: 'ok',
      lastUpdate: '2024-01-15 15:00',
    },
    {
      id: '5',
      name: 'Álcool 70% 1L',
      category: 'Medicamentos',
      currentStock: 25,
      minStock: 30,
      maxStock: 150,
      unit: 'frascos',
      status: 'critical',
      lastUpdate: '2024-01-15 11:45',
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'critical':
        return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'out':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ok':
        return 'Estoque OK'
      case 'low':
        return 'Estoque Baixo'
      case 'critical':
        return 'Crítico'
      case 'out':
        return 'Esgotado'
      default:
        return 'Indefinido'
    }
  }

  const criticalItems = items.filter((item) => item.status === 'critical' || item.status === 'out')
  const lowStockItems = items.filter((item) => item.status === 'low')
  const okItems = items.filter((item) => item.status === 'ok')

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
            Gestão de Estoque Hospitalar
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium">
            Controle e Rastreabilidade de Insumos e Medicamentos
          </p>
        </div>

        {/* Alertas Críticos */}
        {criticalItems.length > 0 && (
          <div className="mb-6 animate-slide-down">
            <div className="bg-red-50 border-2 border-red-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 className="text-lg sm:text-xl font-bold text-red-900">
                  Alertas Críticos de Estoque ({criticalItems.length})
                </h2>
              </div>
              <div className="space-y-2">
                {criticalItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg p-3 border border-red-200">
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Estoque: {item.currentStock} {item.unit} | Mínimo: {item.minStock} {item.unit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base text-gray-600 font-medium">Total de Itens</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{items.length}</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base text-gray-600 font-medium">Estoque OK</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">{okItems.length}</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base text-gray-600 font-medium">Estoque Baixo</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{lowStockItems.length}</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base text-gray-600 font-medium">Críticos</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-red-600">{criticalItems.length}</p>
          </div>
        </div>

        {/* Lista de Itens */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Itens em Estoque
            </h2>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105">
              Atualizar Estoque
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Item</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Categoria</th>
                  <th className="text-center py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Estoque Atual</th>
                  <th className="text-center py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Mín/Máx</th>
                  <th className="text-center py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-right py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Última Atualização</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-2 sm:px-4">
                      <p className="text-sm sm:text-base font-medium text-gray-900">{item.name}</p>
                    </td>
                    <td className="py-3 px-2 sm:px-4">
                      <span className="text-xs sm:text-sm text-gray-600">{item.category}</span>
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-center">
                      <span className="text-sm sm:text-base font-semibold text-gray-900">
                        {item.currentStock} {item.unit}
                      </span>
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-center">
                      <span className="text-xs sm:text-sm text-gray-600">
                        {item.minStock} / {item.maxStock}
                      </span>
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                        {getStatusLabel(item.status)}
                      </span>
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-right">
                      <span className="text-xs text-gray-500">{item.lastUpdate}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Informações do Sistema */}
        <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 border border-gray-200">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Sistema de Rastreabilidade
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            <div>
              <p className="font-medium mb-2">✓ Integração entre setores</p>
              <p className="text-xs sm:text-sm">Sistema conectado com farmácia, enfermagem e compras</p>
            </div>
            <div>
              <p className="font-medium mb-2">✓ Alertas automáticos</p>
              <p className="text-xs sm:text-sm">Notificações quando estoque atinge níveis críticos</p>
            </div>
            <div>
              <p className="font-medium mb-2">✓ Histórico completo</p>
              <p className="text-xs sm:text-sm">Rastreabilidade de todas as movimentações</p>
            </div>
            <div>
              <p className="font-medium mb-2">✓ Prevenção de desabastecimento</p>
              <p className="text-xs sm:text-sm">Cálculo automático de reposição necessária</p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="pt-6 border-t border-gray-200">
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Áreas Relacionadas</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/farmacia"
                className="flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-all duration-200 hover:scale-105 border border-purple-200"
              >
                <span className="text-2xl mr-3">🤖</span>
                <div>
                  <p className="text-sm font-semibold text-purple-900">Farmácia Clínica</p>
                  <p className="text-xs text-purple-700">Verificar medicamentos</p>
                </div>
              </Link>
              <Link
                to="/ps"
                className="flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-all duration-200 hover:scale-105 border border-green-200"
              >
                <span className="text-2xl mr-3">📊</span>
                <div>
                  <p className="text-sm font-semibold text-green-900">Dashboard PS</p>
                  <p className="text-xs text-green-700">Status de leitos</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

