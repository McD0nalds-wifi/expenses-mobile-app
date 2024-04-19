import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'

import { IBalance } from '@/entities/balance'
import { RootStateType } from '@/shared/store/types'

interface ISliceState {
    selectedBalance: IBalance | null
}

const initialState: ISliceState = { selectedBalance: null }

export const balancesListSlice = createSlice({
    initialState,
    name: 'balancesList',
    reducers: {
        resetBalance: (state) => {
            state.selectedBalance = null
        },
        selectBalance: (state, { payload }: PayloadAction<IBalance | null>) => {
            state.selectedBalance = payload
        },
    },
})

const selectBalancesListSliceState = (state: RootStateType) => state.balancesList

const selectSelectedBalance = createSelector([selectBalancesListSliceState], ({ selectedBalance }) => selectedBalance)

export const { selectBalance, resetBalance } = balancesListSlice.actions

export const balancesListSelectors = {
    selectSelectedBalance,
}
