import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import {persistStore} from 'redux-persist'
import {rootReducer, rootSaga} from './RootReducer'

const sagaMiddleware = createSagaMiddleware()
const middleware = [...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  }),
  sagaMiddleware,
]

const store = configureStore({ reducer: rootReducer, middleware,})

export type AppDispatch = typeof store.dispatch


export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export default store