import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IBalance } from '@/entities/balance'
import { CategoryType } from '@/entities/category'

interface ISliceState {
    selectedBalance: IBalance | null
    selectedCategoryType: CategoryType | null
}

const initialState: ISliceState = { selectedBalance: null, selectedCategoryType: null }

export const addOperationSlice = createSlice({
    initialState,
    name: 'addOperation',
    reducers: {
        resetSelectedValues: (state) => {
            state.selectedBalance = null
            state.selectedCategoryType = null
        },
        setSelectedBalance: (state, { payload }: PayloadAction<IBalance | null>) => {
            state.selectedBalance = payload
        },
        setSelectedCategoryType: (state, { payload }: PayloadAction<CategoryType | null>) => {
            state.selectedCategoryType = payload
        },
    },
    selectors: {
        selectSelectedBalance: ({ selectedBalance }) => selectedBalance,
        selectSelectedCategoryType: ({ selectedCategoryType }) => selectedCategoryType,
    },
})

export const { resetSelectedValues, setSelectedBalance, setSelectedCategoryType } = addOperationSlice.actions

export const { selectSelectedBalance, selectSelectedCategoryType } = addOperationSlice.selectors
