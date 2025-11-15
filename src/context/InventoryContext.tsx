import { createContext, useContext, useState, ReactNode } from 'react'

export interface InventoryItem {
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

interface InventoryContextType {
  items: InventoryItem[]
  addItem: (item: Omit<InventoryItem, 'id' | 'status' | 'lastUpdate'>) => void
  removeItem: (id: string) => void
  updateItem: (id: string, updates: Partial<InventoryItem>) => void
  getItemByName: (name: string) => InventoryItem | undefined
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined)

const initialItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Soro Fisiológico 0,9% 500ml',
    category: 'Medicamentos',
    currentStock: 450,
    minStock: 200,
    maxStock: 800,
    unit: 'unidades',
    status: 'ok',
    lastUpdate: new Date().toLocaleString('pt-BR'),
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
    lastUpdate: new Date().toLocaleString('pt-BR'),
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
    lastUpdate: new Date().toLocaleString('pt-BR'),
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
    lastUpdate: new Date().toLocaleString('pt-BR'),
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
    lastUpdate: new Date().toLocaleString('pt-BR'),
  },
]

function calculateStatus(item: { currentStock: number; minStock: number }): 'ok' | 'low' | 'critical' | 'out' {
  if (item.currentStock === 0) return 'out'
  if (item.currentStock < item.minStock * 0.3) return 'critical'
  if (item.currentStock < item.minStock) return 'low'
  return 'ok'
}

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InventoryItem[]>(initialItems)

  const addItem = (item: Omit<InventoryItem, 'id' | 'status' | 'lastUpdate'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: Date.now().toString(),
      status: calculateStatus(item),
      lastUpdate: new Date().toLocaleString('pt-BR'),
    }
    setItems((prev) => [...prev, newItem])
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, updates: Partial<InventoryItem>) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updates }
          return {
            ...updated,
            status: calculateStatus(updated),
            lastUpdate: new Date().toLocaleString('pt-BR'),
          }
        }
        return item
      })
    )
  }

  const getItemByName = (name: string) => {
    return items.find((item) => item.name.toLowerCase() === name.toLowerCase())
  }

  return (
    <InventoryContext.Provider value={{ items, addItem, removeItem, updateItem, getItemByName }}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const context = useContext(InventoryContext)
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider')
  }
  return context
}

