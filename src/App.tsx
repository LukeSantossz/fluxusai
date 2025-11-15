import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StateProvider } from './context/StateContext'
import Page1ControlPanel from './pages/Page1ControlPanel'
import Page2MedicalAlert from './pages/Page2MedicalAlert'
import Page3CleaningTasks from './pages/Page3CleaningTasks'
import Page4StatusDashboard from './pages/Page4StatusDashboard'
import Navigation from './components/Navigation'

function App() {
  return (
    <StateProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<Page1ControlPanel />} />
            <Route path="/medico" element={<Page2MedicalAlert />} />
            <Route path="/higienizacao" element={<Page3CleaningTasks />} />
            <Route path="/ps" element={<Page4StatusDashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </StateProvider>
  )
}

export default App

