import { useEffect, useState } from 'react'

import { balanceDatabase } from '@/entities/balance'
import { budgetDatabase } from '@/entities/budget'
import { operationDatabase } from '@/entities/operation'

export const useSetupDatabase = () => {
    const [isDBLoadingComplete, setDBLoadingComplete] = useState(false)

    useEffect(() => {
        async function loadDataAsync() {
            try {
                // await balanceDatabase.dropBalancesTablesAsync()
                await balanceDatabase.setupDatabaseAsync()
                // await balanceDatabase.setupBalancesAsync()

                // await operationDatabase.dropOperationsTablesAsync()
                await operationDatabase.setupDatabaseAsync()

                // await budgetDatabase.dropBudgetsTablesAsync()
                await budgetDatabase.setupDatabaseAsync()

                setDBLoadingComplete(true)
            } catch (e) {
                console.warn(e)
            }
        }

        loadDataAsync()
    }, [])

    return isDBLoadingComplete
}
