import { configureStore } from '@reduxjs/toolkit'

import { exploreCategoriesSlice } from '@/features/explore-categories'
import { APP_REDUCER_PATH, appApi } from '@/shared/api'

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
    reducer: {
        [exploreCategoriesSlice.name]: exploreCategoriesSlice.reducer,
        [APP_REDUCER_PATH]: appApi.reducer,
    },
})
