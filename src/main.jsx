import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ShopsDataProvider } from './utils/Context/ShopsDataContext'
import { FiltersMenuProvider } from './utils/Context/FiltersMenuContext'
import { UserInterfaceProvider } from './utils/Context/UserInterfaceContext'
import { ScopeProvider } from './utils/Context/ScopeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserInterfaceProvider>
            <ScopeProvider>
                <ShopsDataProvider>
                    <FiltersMenuProvider>
                        <App />
                    </FiltersMenuProvider>
                </ShopsDataProvider>
            </ScopeProvider>
        </UserInterfaceProvider>
    </React.StrictMode>
)
