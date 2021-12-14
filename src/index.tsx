import React from 'react'
import ReactDOM from 'react-dom'


//contextos
import { AuthContextProvider } from './context/authContext'
import { SettingsProviderContext } from './context/settingsContext'

import store, { persistor } from './setup/redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import { App } from './app/App'

import './_metronic/assets/sass/style.react.scss'
import './_metronic/assets/sass/style.scss'


const { PUBLIC_URL } = process.env

ReactDOM.render(
  <AuthContextProvider> {/*contexto do perfil do usuario*/}
    <SettingsProviderContext >
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
          <App basename={PUBLIC_URL} />
        </PersistGate>
      </Provider>
    </SettingsProviderContext>
  </AuthContextProvider>
  ,
  document.getElementById('root')
)