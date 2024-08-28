import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { ErrorBoundary } from 'react-error-boundary'
// import Error from './components/Error.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ErrorBoundary
      FallbackComponent={Error}
      onReset={() => window.location.replace("/")}
    > */}
      <App />
    {/* </ErrorBoundary> */}
  </StrictMode>
)
