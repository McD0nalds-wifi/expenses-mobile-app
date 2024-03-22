import { useEffect } from 'react'

import { isEmpty } from 'lodash'

import { balanceDatabase, initializeBalances } from '@/entities/balance'
import { initializeOperations, operationDatabase } from '@/entities/operation'
import { useTypedDispatch } from '@/shared/hooks/useTypedDispatch'
import { store } from '@/shared/store'

export const useInitializeValuesFromDatabase = () => {
    const { balance: balanceSlice, operations: operationsSlice } = store.getState()

    const dispatch = useTypedDispatch()

    useEffect(() => {
        if (!isEmpty(balanceSlice.balances)) {
            return
        }

        balanceDatabase.getBalances((balances) => dispatch(initializeBalances(balances)))
    }, [dispatch, balanceSlice])

    useEffect(() => {
        if (!isEmpty(operationsSlice.ids)) {
            return
        }

        operationDatabase.getOperations((operations) => dispatch(initializeOperations(operations)))
    }, [dispatch, operationsSlice])
}
