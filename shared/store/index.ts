import { configureStore } from '@reduxjs/toolkit'

// import { authorizationSlice } from 'features/authorization'

import { APP_REDUCER_PATH, appApi } from '@/shared/api'

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
    reducer: {
        // [authorizationSlice.name]: authorizationSlice.reducer,
        [APP_REDUCER_PATH]: appApi.reducer,
    },
})
