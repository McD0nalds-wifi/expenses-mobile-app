import { configureStore } from '@reduxjs/toolkit'

import { balancesSlice } from '@/entities/balance'
import { operationsSlice } from '@/entities/operation'
import { addOperationSlice } from '@/features/add-operation'
import { APP_REDUCER_PATH, appApi } from '@/shared/api'

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
    reducer: {
        [balancesSlice.reducerPath]: balancesSlice.reducer,
        [addOperationSlice.reducerPath]: addOperationSlice.reducer,
        [operationsSlice.reducerPath]: operationsSlice.reducer,
        [APP_REDUCER_PATH]: appApi.reducer,
    },
})
