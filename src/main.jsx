import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ShopsDataProvider } from './utils/context/ShopsDataContext'
import { FiltersMenuProvider } from './utils/context/FiltersMenuContext'
import { UserInterfaceProvider } from './utils/context/UserInterfaceContext'

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
