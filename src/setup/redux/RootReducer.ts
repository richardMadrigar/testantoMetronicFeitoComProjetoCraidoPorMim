import {combineReducers} from 'redux'

import * as auth from '../../app/auth'

export const rootReducer = combineReducers({
  auth: auth.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {}