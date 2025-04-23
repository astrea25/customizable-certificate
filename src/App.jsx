import './App.css'
import SimpleLayout from './components/layout/Layout'
import { CertificateProvider } from './context/CertificateContext'

function App() {
  return (
    <CertificateProvider>
      <SimpleLayout />
    </CertificateProvider>
  )
}

export default App
