import './App.css'
import Layout from './components/layout/Layout'
import { CertificateProvider } from './context/CertificateContext'

function App() {
  return (
    <CertificateProvider>
      <Layout />
    </CertificateProvider>
  )
}

export default App
