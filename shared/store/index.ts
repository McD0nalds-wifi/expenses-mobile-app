import { configureStore } from '@reduxjs/toolkit'

import { APP_REDUCER_PATH, appApi } from '@/shared/api'

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
    reducer: {
        [APP_REDUCER_PATH]: appApi.reducer,
    },
})
