import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IBalance } from '../types'

interface ISliceState {
    balances: Array<IBalance>
}

const DEFAULT_BALANCE = { amount: 0, id: 1, name: 'Мой кошелек', type: 'bankAccount' } as const

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
        selectBalance: ({ balances }, balanceId: number) => balances.find(({ id }) => id === balanceId),
        selectBalances: ({ balances }) => balances,
    },
})

export const { addBalance } = balanceSlice.actions

export const { selectBalances, selectBalance } = balanceSlice.selectors