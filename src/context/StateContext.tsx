import { createContext, useContext, useState, ReactNode } from 'react'

export type BedStatus = 'WAITING_SIGNATURE' | 'WAITING_CLEANING' | 'READY'

interface AppState {
  pcpActivated: boolean
  medicalConfirmed: boolean
  cleaningCompleted: boolean
  bedStatus: BedStatus
  bedNumber: string
}

interface StateContextType {
  state: AppState
  activatePCP: () => void
  confirmMedical: () => void
  completeCleaning: () => void
  reset: () => void
}

const initialState: AppState = {
  pcpActivated: false,
  medicalConfirmed: false,
  cleaningCompleted: false,
  bedStatus: 'WAITING_SIGNATURE',
  bedNumber: '501A',
}

const StateContext = createContext<StateContextType | undefined>(undefined)

export function StateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState)

  const activatePCP = () => {
    setState(prev => ({
      ...prev,
      pcpActivated: true,
      bedStatus: 'WAITING_SIGNATURE',
    }))
  }

  const confirmMedical = () => {
    setState(prev => ({
      ...prev,
      medicalConfirmed: true,
      bedStatus: 'WAITING_CLEANING',
    }))
  }

  const completeCleaning = () => {
    setState(prev => ({
      ...prev,
      cleaningCompleted: true,
      bedStatus: 'READY',
    }))
  }

  const reset = () => {
    setState(initialState)
  }

  return (
    <StateContext.Provider value={{ state, activatePCP, confirmMedical, completeCleaning, reset }}>
      {children}
    </StateContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(StateContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within a StateProvider')
  }
  return context
}

