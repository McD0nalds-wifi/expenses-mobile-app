import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CategoryType } from '@/entities/category'

interface ISliceState {
    selectedCategoryType: CategoryType | null
}

const initialState: ISliceState = { selectedCategoryType: null }

export const categoriesListSlice = createSlice({
    initialState,
    name: 'categoriesList',
    reducers: {
        resetCategoryType: (state) => {
            state.selectedCategoryType = null
        },
        selectCategoryType: (state, { payload }: PayloadAction<CategoryType | null>) => {
            state.selectedCategoryType = payload
        },
    },
    selectors: {
        selectSelectedCategoryType: ({ selectedCategoryType }) => selectedCategoryType,
    },
})

export const { selectCategoryType, resetCategoryType } = categoriesListSlice.actions

export const { selectSelectedCategoryType } = categoriesListSlice.selectors
