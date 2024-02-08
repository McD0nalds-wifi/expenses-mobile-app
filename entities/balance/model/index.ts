import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IBalance } from '../types'

interface ISliceState {
    balances: Array<IBalance>
}

const DEFAULT_BALANCE = { amount: 0, id: 1, title: 'Мой кошелек', type: 'bankAccount' } as const

const initialState: ISliceState = { balances: [{ ...DEFAULT_BALANCE }] }

export const balanceSlice = createSlice({
    initialState,
    name: 'balance',
    reducers: {
        addBalance: (state, action: PayloadAction<IBalance>) => {
            state.balances.push(action.payload)
        },
    },
    selectors: {
        selectBalances: ({ balances }) => balances,
    },
})

export const { selectBalances } = balanceSlice.selectors
