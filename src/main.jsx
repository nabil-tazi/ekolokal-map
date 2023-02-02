import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ScopeProvider } from './utils/context/ScopeContext'
import { TypeCategoryProvider } from './utils/context/TypeCategoryMenuContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ScopeProvider>
            <TypeCategoryProvider>
                <App />
            </TypeCategoryProvider>
        </ScopeProvider>
    </React.StrictMode>
)
