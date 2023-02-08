import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ShopsDataProvider } from './utils/Context/ShopsDataContext'
import { FiltersMenuProvider } from './utils/Context/FiltersMenuContext'
import { UserInterfaceProvider } from './utils/Context/UserInterfaceContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserInterfaceProvider>
            <ShopsDataProvider>
                <FiltersMenuProvider>
                    <App />
                </FiltersMenuProvider>
            </ShopsDataProvider>
        </UserInterfaceProvider>
    </React.StrictMode>
)
