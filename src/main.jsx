import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ShopsDataProvider } from './utils/Context/ShopsDataContext'
import { FiltersMenuProvider } from './utils/Context/FiltersMenuContext'
import { UserInterfaceProvider } from './utils/Context/UserInterfaceContext'
import { LayoutProvider } from './utils/Context/LayoutContext'
import { ScopeProvider } from './utils/Context/ScopeContext'
import GlobalStyle from './utils/Style/GlobalStyle'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GlobalStyle />
        <LayoutProvider>
            <UserInterfaceProvider>
                <ScopeProvider>
                    <ShopsDataProvider>
                        <FiltersMenuProvider>
                            <App />
                        </FiltersMenuProvider>
                    </ShopsDataProvider>
                </ScopeProvider>
            </UserInterfaceProvider>
        </LayoutProvider>
    </React.StrictMode>
)
