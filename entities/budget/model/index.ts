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

            budgetDatabase.insertBudget(id, payload.amount, payload.limit, payload.category)

            budgetsAdapter.addOne(state, { ...payload, id })
        },
        initializeBudgets: (state, { payload }: PayloadAction<Array<IBudget>>) => {
            budgetsAdapter.setAll(state, payload)
        },
    },
})

export const { addBudget, initializeBudgets } = budgetsSlice.actions

const adapterSelectors = budgetsAdapter.getSelectors<RootStateType>((state) => state.budgets)

export const budgetsSelectors = {
    selectAll: adapterSelectors.selectAll,
    selectById: adapterSelectors.selectById,
}
