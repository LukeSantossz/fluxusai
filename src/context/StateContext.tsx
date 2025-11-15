import { createContext, useContext, useState, ReactNode } from 'react'

export type BedStatus = 'WAITING_SIGNATURE' | 'WAITING_CLEANING' | 'READY'
export type PCPLevel = 1 | 2 | 3 | 4 | null

export interface Patient {
  id: string
  name: string
  bed: string
  diagnosis: string
  status: 'stable' | 'monitoring' | 'critical' | 'discharge_pending'
  medications: string[]
  pcpPriority: boolean
}

interface AppState {
  pcpLevel: PCPLevel
  pcpActivated: boolean
  medicalConfirmed: boolean
  cleaningCompleted: boolean
  bedStatus: BedStatus
  bedNumber: string
  selectedPatientId: string | null
  patients: Patient[]
}

interface StateContextType {
  state: AppState
  activatePCP: (level: PCPLevel, patientId?: string) => void
  confirmMedical: () => void
  completeCleaning: () => void
  setSelectedPatient: (patientId: string) => void
  updatePatient: (patientId: string, updates: Partial<Patient>) => void
  reset: () => void
}

const initialPatients: Patient[] = [
  {
    id: '1',
    name: 'Maria Silva',
    bed: '501A',
    diagnosis: 'Pneumonia',
    status: 'discharge_pending',
    medications: ['Warfarina', 'AAS', 'Omeprazol'],
    pcpPriority: false,
  },
  {
    id: '2',
    name: 'João Santos',
    bed: '302B',
    diagnosis: 'Diabetes Mellitus',
    status: 'monitoring',
    medications: ['Insulina Regular', 'Metformina'],
    pcpPriority: false,
  },
  {
    id: '3',
    name: 'Ana Costa',
    bed: '405A',
    diagnosis: 'Sepse',
    status: 'critical',
    medications: ['Noradrenalina', 'Fentanil', 'Midazolam'],
    pcpPriority: false,
  },
  {
    id: '4',
    name: 'Pedro Oliveira',
    bed: '203C',
    diagnosis: 'Infecção Respiratória',
    status: 'stable',
    medications: ['Amoxicilina', 'Paracetamol'],
    pcpPriority: false,
  },
]

const initialState: AppState = {
  pcpLevel: null,
  pcpActivated: false,
  medicalConfirmed: false,
  cleaningCompleted: false,
  bedStatus: 'WAITING_SIGNATURE',
  bedNumber: '501A',
  selectedPatientId: '1',
  patients: initialPatients,
}

const StateContext = createContext<StateContextType | undefined>(undefined)

export function StateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState)

  const activatePCP = (level: PCPLevel, patientId?: string) => {
    setState(prev => {
      const updatedPatients = prev.patients.map(p => ({
        ...p,
        pcpPriority: patientId ? p.id === patientId : p.bed === prev.bedNumber
      }))
      
      const selectedPatient = patientId 
        ? updatedPatients.find(p => p.id === patientId)
        : updatedPatients.find(p => p.bed === prev.bedNumber)
      
      return {
        ...prev,
        pcpLevel: level,
        pcpActivated: true,
        bedStatus: 'WAITING_SIGNATURE',
        patients: updatedPatients,
        selectedPatientId: selectedPatient?.id || prev.selectedPatientId,
        bedNumber: selectedPatient?.bed || prev.bedNumber,
      }
    })
  }

  const setSelectedPatient = (patientId: string) => {
    setState(prev => ({
      ...prev,
      selectedPatientId: patientId,
      bedNumber: prev.patients.find(p => p.id === patientId)?.bed || prev.bedNumber,
    }))
  }

  const updatePatient = (patientId: string, updates: Partial<Patient>) => {
    setState(prev => ({
      ...prev,
      patients: prev.patients.map(p => 
        p.id === patientId ? { ...p, ...updates } : p
      ),
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
    <StateContext.Provider value={{ 
      state, 
      activatePCP, 
      confirmMedical, 
      completeCleaning, 
      setSelectedPatient,
      updatePatient,
      reset 
    }}>
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

