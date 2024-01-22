// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { isEmpty } from 'lodash'

export interface IError {
    message: string
    statusCode: number
}

export const APP_REDUCER_PATH = 'app'

export const SERVER_API_URL = 'http://192.168.0.109:3004/'

const TOKEN_NAME = 'token'

// eslint-disable-next-line
const isFetchBaseQueryErrorType = (error: any): error is FetchBaseQueryError => 'status' in error

// eslint-disable-next-line
export const getFetchBaseQueryError = (error: any): IError | null => {
    if (!error) return null

    if (!isFetchBaseQueryErrorType(error) || isEmpty(error?.data)) {
        return { message: 'Произошла непредвиденная ошибка', statusCode: 500 }
    }

    return error.data as IError
}

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> => {
    const baseQuery = fetchBaseQuery({
        baseUrl: SERVER_API_URL,
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(TOKEN_NAME)

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    })

    const result = await baseQuery(args, api, {})

    return result
    // if (result.error && result.error.status === 401) {
    //     const state = api.getState() as RootStateType
    //     const refreshResult = (await baseQuery(
    //         {
    //             url: '/auth/refresh',
    //             // params: { email: state.user.userData?.email || '' },
    //         },
    //         api,
    //         extraOptions || {},
    //     )) as QueryReturnValue<{ accessToken?: string }, FetchBaseQueryError, FetchBaseQueryMeta>

    //     if (refreshResult.data && refreshResult.data.accessToken) {
    //         localStorage.setItem(TOKEN_NAME, refreshResult.data.accessToken)
    //         // api.dispatch(setUserData(decodeToken(refreshResult.data.accessToken)))

    //         result = await baseQuery(args, api, extraOptions || {})
    //     } else {
    //         // api.dispatch(loggedOut())
    //     }
    // }

    // if (!extraOptions || !extraOptions.responseSchema || result.error) return result
    //
    // try {
    //     const parseData = extraOptions.responseSchema.safeParse(result.data)
    //
    //     return parseData as typeof result
    // } catch (error) {
    //     return {
    //         error: {
    //             data: { message: 'Ошибка при валидации полей', statusCode: 400 },
    //             status: 400,
    //         },
    //     }
    // }
}

export const appApi = createApi({
    baseQuery: baseQuery,
    endpoints: () => ({}),
    reducerPath: APP_REDUCER_PATH,
    refetchOnMountOrArgChange: false,
})
