import { store } from './index'
import { appApi, getFetchBaseQueryError } from '../api'

export { store, appApi, getFetchBaseQueryError }

export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatchType = typeof store.dispatch
