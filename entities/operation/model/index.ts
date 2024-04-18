import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { getMonth, getYear } from 'date-fns'

import { CategoryType } from '@/entities/category'
import { RootStateType } from '@/shared/store/types'
import { uuid } from '@/shared/uuid'

import { operationDatabase } from '../database'
import { IOperation } from '../types'

const operationsAdapter = createEntityAdapter({
    selectId: (operation: IOperation) => operation.id,
    sortComparer: (a, b) => b.date - a.date,
})
export const operationsSlice = createSlice({
    initialState: operationsAdapter.getInitialState(),
    name: 'operations',
    reducers: {
        addOperation: (state, { payload }: PayloadAction<Omit<IOperation, 'id'>>) => {
            const id = uuid()

            operationDatabase.insertOperation(
                id,
                payload.amount,
                payload.balanceId,
                payload.category,
                payload.date,
                payload.operationType,
            )

            operationsAdapter.addOne(state, { ...payload, id })
        },
        initializeOperations: (state, { payload }: PayloadAction<Array<IOperation>>) => {
            operationsAdapter.setAll(state, payload)
        },
    },
    selectors: {
        selectExpensesByMonthAndYear: (state, date: number) => {
            return Object.values(state.entities).filter(
                (operation) => getYear(operation.date) === getYear(date) && getMonth(operation.date) === getMonth(date),
            )
        },
        selectTopExpensesByMonthAndYear: (state, top: number, date: number) => {
            const operationsByMonthAndYear = Object.values(state.entities).filter(
                (operation) =>
                    operation.operationType === 'expenses' &&
                    getYear(operation.date) === getYear(date) &&
                    getMonth(operation.date) === getMonth(date),
            )

            const expenses = operationsByMonthAndYear.reduce<Record<string, number>>((acc, { amount, category }) => {
                if (acc[category]) {
                    acc[category] += amount
                } else {
                    acc[category] = amount
                }

                return acc
            }, {})

            const sortedExpenses = Object.entries(expenses).sort((a, b) => a[1] - b[1])

            const { otherExpensesAmount, topExpenses, topExpensesAmount } = sortedExpenses.slice(0, top).reduce<{
                otherExpensesAmount: number
                topExpenses: Array<{ amount: number; category: CategoryType }>
                topExpensesAmount: number
            }>(
                (acc, [category, amount], index) => {
                    if (index + 1 >= top) {
                        acc.otherExpensesAmount += amount
                    } else {
                        acc.topExpensesAmount += amount
                        acc.topExpenses.push({ amount, category: category as CategoryType })
                    }

                    return acc
                },
                { otherExpensesAmount: 0, topExpenses: [], topExpensesAmount: 0 },
            )

            return {
                otherExpensesAmount,
                topExpenses,
                topExpensesAmount,
            }
        },
    },
})

export const { addOperation, initializeOperations } = operationsSlice.actions

const adapterSelectors = operationsAdapter.getSelectors<RootStateType>((state) => state.operations)

export const operationsSelectors = {
    selectAll: adapterSelectors.selectAll,
    selectById: adapterSelectors.selectById,
    selectExpensesByMonthAndYear: operationsSlice.selectors.selectExpensesByMonthAndYear,
    selectTopExpensesByMonthAndYear: operationsSlice.selectors.selectTopExpensesByMonthAndYear,
}
