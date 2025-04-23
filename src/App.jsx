import './App.css'
import SimpleLayout from './components/layout/SimpleLayout'
import { CertificateProvider } from './context/CertificateContext'

function App() {
  return (
    <CertificateProvider>
      <SimpleLayout />
    </CertificateProvider>
  )
}

export default App
