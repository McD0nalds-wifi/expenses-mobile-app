import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { uniqueId } from 'lodash'

import { balanceDatabase } from '../database'
import { IBalance } from '../types'

interface ISliceState {
    balances: Array<IBalance>
}

const initialState: ISliceState = { balances: [] }

export const balanceSlice = createSlice({
    initialState,
    name: 'balance',
    reducers: {
        addBalance: (state, { payload }: PayloadAction<Omit<IBalance, 'id'>>) => {
            const id = uniqueId()

            balanceDatabase.insertBalance(id, payload.amount, payload.name, payload.type)

            state.balances.push({ ...payload, id })
        },
        balanceDeposit: (state, { payload }: PayloadAction<{ amount: number; id: string }>) => {
            state.balances = state.balances.map((balance) => {
                if (payload.id !== balance.id) {
                    return balance
                }

                balanceDatabase.updateBalanceAmount(balance.id, balance.amount + payload.amount)

                return {
                    ...balance,
                    amount: balance.amount + payload.amount,
                }
            })
        },
        balanceWithdrawal: (state, { payload }: PayloadAction<{ amount: number; id: string }>) => {
            state.balances = state.balances.map((balance) => {
                if (payload.id !== balance.id) {
                    return balance
                }

                balanceDatabase.updateBalanceAmount(balance.id, balance.amount - payload.amount)

                return {
                    ...balance,
                    amount: balance.amount - payload.amount,
                }
            })
        },
        initializeBalances: (state, { payload }: PayloadAction<Array<IBalance>>) => {
            state.balances = payload
        },
    },
    selectors: {
        selectBalance: ({ balances }, balanceId: string) => balances.find(({ id }) => id === balanceId),
        selectBalances: ({ balances }) => balances,
    },
})

export const { addBalance, balanceDeposit, balanceWithdrawal, initializeBalances } = balanceSlice.actions

export const { selectBalances, selectBalance } = balanceSlice.selectors
