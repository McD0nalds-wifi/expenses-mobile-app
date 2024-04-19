import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'

import { CategoryType } from '@/entities/category'
import { RootStateType } from '@/shared/store/types'

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
})

const selectCategoriesListSliceState = (state: RootStateType) => state.categoriesList

const selectSelectedCategoryType = createSelector(
    [selectCategoriesListSliceState],
    ({ selectedCategoryType }) => selectedCategoryType,
)

export const { selectCategoryType, resetCategoryType } = categoriesListSlice.actions

export const categoriesListSelectors = {
    selectSelectedCategoryType,
}
