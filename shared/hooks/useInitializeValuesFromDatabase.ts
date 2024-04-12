import { useEffect } from 'react'

import { isEmpty } from 'lodash'

import { balanceDatabase, initializeBalances } from '@/entities/balance'
import { budgetDatabase, initializeBudgets } from '@/entities/budget'
import { initializeOperations, operationDatabase } from '@/entities/operation'
import { useTypedDispatch } from '@/shared/hooks/useTypedDispatch'
import { store } from '@/shared/store'

export const useInitializeValuesFromDatabase = () => {
    const { balances: balancesSlice, operations: operationsSlice, budgets: budgetsSlice } = store.getState()

    const dispatch = useTypedDispatch()

    useEffect(() => {
        if (!isEmpty(balancesSlice.ids)) {
            return
        }

        balanceDatabase.getBalances((balances) => dispatch(initializeBalances(balances)))
    }, [dispatch, balancesSlice.ids])

    useEffect(() => {
        if (!isEmpty(operationsSlice.ids)) {
            return
        }

        operationDatabase.getOperations((operations) => dispatch(initializeOperations(operations)))
    }, [dispatch, operationsSlice.ids])

    useEffect(() => {
        if (!isEmpty(budgetsSlice.ids)) {
            return
        }

        budgetDatabase.getBudgets((budgets) => dispatch(initializeBudgets(budgets)))
    }, [dispatch, budgetsSlice.ids])
}
