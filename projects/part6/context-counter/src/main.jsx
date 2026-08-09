import { createRoot } from 'react-dom/client'
import { CounterContextProvider } from './components/CounterContext'
import App from './App'

createRoot(document.getElementById('root')).render(
  <CounterContextProvider>
    <App />
  </CounterContextProvider>,
)
