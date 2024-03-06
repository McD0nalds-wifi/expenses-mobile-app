import { useEffect, useState } from 'react'

import { balanceDatabase } from '@/entities/balance'
import { operationDatabase } from '@/entities/operation'

export const useDatabase = () => {
    const [isDBLoadingComplete, setDBLoadingComplete] = useState(false)

    useEffect(() => {
        async function loadDataAsync() {
            try {
                await balanceDatabase.dropBalancesTablesAsync()
                await balanceDatabase.setupDatabaseAsync()
                await balanceDatabase.setupBalancesAsync()

                await operationDatabase.dropOperationsTablesAsync()
                await operationDatabase.setupDatabaseAsync()

                setDBLoadingComplete(true)
            } catch (e) {
                console.warn(e)
            }
        }

        loadDataAsync()
    }, [])

    return isDBLoadingComplete
}
