import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ScopeProvider } from './utils/context'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ScopeProvider>
            <App />
        </ScopeProvider>
    </React.StrictMode>
)
