import { configureStore } from '@reduxjs/toolkit'

import { balancesSlice } from '@/entities/balance'
import { operationsSlice } from '@/entities/operation'
import { APP_REDUCER_PATH, appApi } from '@/shared/api'
import { balancesListSlice } from '@/widgets/balances-list'
import { categoriesListSlice } from '@/widgets/categories-list'

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
    reducer: {
        [balancesSlice.reducerPath]: balancesSlice.reducer,
        [operationsSlice.reducerPath]: operationsSlice.reducer,
        [categoriesListSlice.name]: categoriesListSlice.reducer,
        [balancesListSlice.name]: balancesListSlice.reducer,
        [APP_REDUCER_PATH]: appApi.reducer,
    },
})
