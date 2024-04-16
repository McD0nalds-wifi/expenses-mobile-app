import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { RootStateType } from '@/shared/store/types'
import { uuid } from '@/shared/uuid'

import { budgetDatabase } from '../database'
import { IBudget } from '../types'

const budgetsAdapter = createEntityAdapter({
    selectId: (budget: IBudget) => budget.id,
})
export const budgetsSlice = createSlice({
    initialState: budgetsAdapter.getInitialState(),
    name: 'budgets',
    reducers: {
        addBudget: (state, { payload }: PayloadAction<Omit<IBudget, 'id'>>) => {
            const id = uuid()

            budgetDatabase.insertBudget(id, payload.amount, payload.spendingLimit, payload.category)

            budgetsAdapter.addOne(state, { ...payload, id })
        },
        increaseBudgetAmount: (state, { payload: { amount, id } }: PayloadAction<{ amount: number; id: string }>) => {
            const { entities } = budgetsAdapter.updateOne(state, {
                changes: { amount: state.entities[id].amount + amount },
                id,
            })

            budgetDatabase.updateBudgetAmount(id, entities[id].amount)
        },
        initializeBudgets: (state, { payload }: PayloadAction<Array<IBudget>>) => {
            budgetsAdapter.setAll(state, payload)
        },
    },
})

export const { addBudget, initializeBudgets, increaseBudgetAmount } = budgetsSlice.actions

const adapterSelectors = budgetsAdapter.getSelectors<RootStateType>((state) => state.budgets)

export const budgetsSelectors = {
    selectAll: adapterSelectors.selectAll,
    selectById: adapterSelectors.selectById,
}
