import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useInventory, InventoryItem } from '../context/InventoryContext'

export default function Page5InventoryManagement() {
  const { items, addItem, removeItem, updateItem } = useInventory()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState<string | null>(null)
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Medicamentos',
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unit: 'unidades',
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [isUpdating, setIsUpdating] = useState(false)

  const categories = useMemo(() => {
    const cats = new Set(items.map((item) => item.category))
    return Array.from(cats)
  }, [items])

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [items, searchTerm, filterCategory, filterStatus])

  const handleUpdateStock = () => {
    setIsUpdating(true)
    setTimeout(() => {
      // Simular atualização - atualiza todos os itens
      items.forEach(item => {
        updateItem(item.id, {})
      })
      setIsUpdating(false)
    }, 1000)
  }

  const handleAddStock = (itemId: string, amount: number) => {
    const item = items.find(i => i.id === itemId)
    if (item) {
      updateItem(itemId, {
        currentStock: item.currentStock + amount,
      })
    }
  }

  const handleAddItem = () => {
    if (newItem.name && newItem.minStock > 0 && newItem.maxStock > newItem.minStock) {
      addItem(newItem)
      setNewItem({
        name: '',
        category: 'Medicamentos',
        currentStock: 0,
        minStock: 0,
        maxStock: 0,
        unit: 'unidades',
      })
      setShowAddModal(false)
    }
  }

  const handleRemoveItem = (id: string) => {
    if (confirm('Tem certeza que deseja remover este item?')) {
      removeItem(id)
    }
  }

  const handleEditItem = (item: InventoryItem) => {
    setNewItem({
      name: item.name,
      category: item.category,
      currentStock: item.currentStock,
      minStock: item.minStock,
      maxStock: item.maxStock,
      unit: item.unit,
    })
    setShowEditModal(item.id)
  }

  const handleUpdateItem = () => {
    if (showEditModal && newItem.name && newItem.minStock > 0 && newItem.maxStock > newItem.minStock) {
      updateItem(showEditModal, {
        name: newItem.name,
        category: newItem.category,
        currentStock: newItem.currentStock,
        minStock: newItem.minStock,
        maxStock: newItem.maxStock,
        unit: newItem.unit,
      })
      setShowEditModal(null)
      setNewItem({
        name: '',
        category: 'Medicamentos',
        currentStock: 0,
        minStock: 0,
        maxStock: 0,
        unit: 'unidades',
      })
    }
  }

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

        {/* Filtros e Busca */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Busca */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Buscar Item
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nome do item..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filtro por Categoria */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por Status */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos</option>
                <option value="ok">OK</option>
                <option value="low">Baixo</option>
                <option value="critical">Crítico</option>
                <option value="out">Esgotado</option>
              </select>
            </div>

            {/* Botão Atualizar */}
            <div className="flex items-end">
              <button
                onClick={handleUpdateStock}
                disabled={isUpdating}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Atualizando...' : 'Atualizar Estoque'}
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Itens */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Itens em Estoque ({filteredItems.length})
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Adicionar Item</span>
              <span className="sm:hidden">+</span>
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
                  <th className="text-center py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      Nenhum item encontrado com os filtros aplicados
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-2 sm:px-4">
                        <p className="text-sm sm:text-base font-medium text-gray-900">{item.name}</p>
                      </td>
                      <td className="py-3 px-2 sm:px-4">
                        <span className="text-xs sm:text-sm text-gray-600">{item.category}</span>
                      </td>
                      <td className="py-3 px-2 sm:px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm sm:text-base font-semibold text-gray-900">
                            {item.currentStock} {item.unit}
                          </span>
                          {(item.status === 'low' || item.status === 'critical' || item.status === 'out') && (
                            <button
                              onClick={() => handleAddStock(item.id, 50)}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                            >
                              +50
                            </button>
                          )}
                        </div>
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
                      <td className="py-3 px-2 sm:px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditItem(item)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            aria-label="Editar item"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                            aria-label="Remover item"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
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

      {/* Modal Adicionar Item */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Adicionar Novo Item</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Item</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Soro Fisiológico"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Medicamentos">Medicamentos</option>
                  <option value="Insumos">Insumos</option>
                  <option value="EPI">EPI</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estoque Atual</label>
                  <input
                    type="number"
                    value={newItem.currentStock}
                    onChange={(e) => setNewItem({ ...newItem, currentStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unidade</label>
                  <input
                    type="text"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="unidades"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estoque Mínimo</label>
                  <input
                    type="number"
                    value={newItem.minStock}
                    onChange={(e) => setNewItem({ ...newItem, minStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estoque Máximo</label>
                  <input
                    type="number"
                    value={newItem.maxStock}
                    onChange={(e) => setNewItem({ ...newItem, maxStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setNewItem({
                    name: '',
                    category: 'Medicamentos',
                    currentStock: 0,
                    minStock: 0,
                    maxStock: 0,
                    unit: 'unidades',
                  })
                }}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddItem}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Item */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Editar Item</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Item</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Medicamentos">Medicamentos</option>
                  <option value="Insumos">Insumos</option>
                  <option value="EPI">EPI</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estoque Atual</label>
                  <input
                    type="number"
                    value={newItem.currentStock}
                    onChange={(e) => setNewItem({ ...newItem, currentStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unidade</label>
                  <input
                    type="text"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estoque Mínimo</label>
                  <input
                    type="number"
                    value={newItem.minStock}
                    onChange={(e) => setNewItem({ ...newItem, minStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estoque Máximo</label>
                  <input
                    type="number"
                    value={newItem.maxStock}
                    onChange={(e) => setNewItem({ ...newItem, maxStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(null)
                  setNewItem({
                    name: '',
                    category: 'Medicamentos',
                    currentStock: 0,
                    minStock: 0,
                    maxStock: 0,
                    unit: 'unidades',
                  })
                }}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdateItem}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

