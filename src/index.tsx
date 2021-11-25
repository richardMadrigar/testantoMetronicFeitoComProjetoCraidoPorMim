import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

//ContextUsers
import { AuthContextProvider } from './context/authContext'

import store, { persistor } from './setup/redux/Store'
import { PersistGate } from 'redux-persist/integration/react'

import { App } from './app/App'

import './_metronic/assets/sass/style.react.scss'
import './_metronic/assets/sass/style.scss'


const { PUBLIC_URL } = process.env


ReactDOM.render(
  <AuthContextProvider> {/*contexto de dados de todos usuarios*/}
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
          <App basename={PUBLIC_URL} />
        </PersistGate>
      </Provider>
  </AuthContextProvider>
  ,
  document.getElementById('root')
)