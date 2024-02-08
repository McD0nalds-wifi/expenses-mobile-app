import { configureStore } from '@reduxjs/toolkit'

import { balanceSlice } from '@/entities/balance'
import { APP_REDUCER_PATH, appApi } from '@/shared/api'

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
    reducer: {
        [balanceSlice.reducerPath]: balanceSlice.reducer,
        [APP_REDUCER_PATH]: appApi.reducer,
    },
})
