import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IBalance } from '../types'

interface ISliceState {
    balances: Array<IBalance>
}

const initialState: ISliceState = { balances: [] }

export const balanceSlice = createSlice({
    initialState,
    name: 'balance',
    reducers: {
        addBalance: (state, action: PayloadAction<IBalance>) => {
            state.balances.push(action.payload)
        },
        initializeBalances: (state, action: PayloadAction<Array<IBalance>>) => {
            state.balances = action.payload
        },
    },
    selectors: {
        selectBalance: ({ balances }, balanceId: number) => balances.find(({ id }) => id === balanceId),
        selectBalances: ({ balances }) => balances,
    },
})

export const { addBalance, initializeBalances } = balanceSlice.actions

export const { selectBalances, selectBalance } = balanceSlice.selectors
