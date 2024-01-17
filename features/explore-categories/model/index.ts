import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { CATEGORIES, DEFAULT_ACTIVE_INDEX } from '../config'
import { CategoryType } from '../types'

interface IInitialState {
    category: CategoryType
}

const initialState: IInitialState = {
    category: CATEGORIES[DEFAULT_ACTIVE_INDEX],
}

export const exploreCategoriesSlice = createSlice({
    initialState,
    name: 'exploreCategories',
    reducers: {
        setCategory: (state, action: PayloadAction<CategoryType>) => {
            state.category = action.payload
        },
    },
    selectors: { selectCategory: (state) => state.category },
})

export const { setCategory } = exploreCategoriesSlice.actions

export const { selectCategory } = exploreCategoriesSlice.selectors
