import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { RootStateType } from '@/shared/store/types'
import { uuid } from '@/shared/uuid'

import { balanceDatabase } from '../database'
import { IBalance } from '../types'

const balancesAdapter = createEntityAdapter({
    selectId: (balance: IBalance) => balance.id,
})

export const balancesSlice = createSlice({
    initialState: balancesAdapter.getInitialState(),
    name: 'balances',
    reducers: {
        addBalance: (state, { payload }: PayloadAction<Omit<IBalance, 'id'>>) => {
            const id = uuid()

            balanceDatabase.insertBalance(id, payload.amount, payload.name, payload.type)

            balancesAdapter.addOne(state, { ...payload, id })
        },
        balanceDeposit: (state, { payload: { amount, id } }: PayloadAction<{ amount: number; id: string }>) => {
            const { entities } = balancesAdapter.updateOne(state, {
                changes: { amount: state.entities[id].amount + amount },
                id,
            })

            balanceDatabase.updateBalanceAmount(id, entities[id].amount)
        },
        balanceWithdrawal: (state, { payload: { amount, id } }: PayloadAction<{ amount: number; id: string }>) => {
            const { entities } = balancesAdapter.updateOne(state, {
                changes: { amount: state.entities[id].amount - amount },
                id,
            })

            balanceDatabase.updateBalanceAmount(id, entities[id].amount)
        },
        initializeBalances: (state, { payload }: PayloadAction<Array<IBalance>>) => {
            balancesAdapter.setAll(state, payload)
        },
    },
})

export const { addBalance, balanceDeposit, balanceWithdrawal, initializeBalances } = balancesSlice.actions

const adapterSelectors = balancesAdapter.getSelectors<RootStateType>((state) => state.balances)

export const balancesSelectors = {
    selectAll: adapterSelectors.selectAll,
    selectById: adapterSelectors.selectById,
}
