import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './app/router/router.tsx'
import { Provider } from 'react-redux'
import {persistor, store} from './app/store/store.ts'
import "./shared/config/i18n"
import {PersistGate} from "redux-persist/integration/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            <RouterProvider router={router} />
        </PersistGate>
    </Provider>
  </StrictMode>,
)
