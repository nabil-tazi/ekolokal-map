import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ShopsDataProvider } from './utils/Context/ShopsDataContext'
import { FiltersMenuProvider } from './utils/Context/FiltersMenuContext'
import { UserInterfaceProvider } from './utils/Context/UserInterfaceContext'
import { LayoutProvider } from './utils/Context/LayoutContext'
import { ScopeProvider } from './utils/Context/ScopeContext'
import { LanguageProvider } from './utils/Context/LanguageContext'
import GlobalStyle from './utils/Style/GlobalStyle'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <LayoutProvider>
            <LanguageProvider>
                <UserInterfaceProvider>
                    <ScopeProvider>
                        <ShopsDataProvider>
                            <FiltersMenuProvider>
                                <GlobalStyle />
                                <App />
                            </FiltersMenuProvider>
                        </ShopsDataProvider>
                    </ScopeProvider>
                </UserInterfaceProvider>
            </LanguageProvider>
        </LayoutProvider>
    </React.StrictMode>
)
