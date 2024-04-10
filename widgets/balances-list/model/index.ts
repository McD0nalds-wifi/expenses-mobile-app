import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IBalance } from '@/entities/balance'

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
    selectors: {
        selectSelectedBalance: ({ selectedBalance }) => selectedBalance,
    },
})

export const { selectBalance, resetBalance } = balancesListSlice.actions

export const { selectSelectedBalance } = balancesListSlice.selectors
