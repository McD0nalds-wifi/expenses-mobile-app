import { CategoryType } from '@/entities/category'
import { db } from '@/shared/db'

import { IOperation, OperationType } from '../types'

const getOperations = (setOperationsFunc: (balances: Array<IOperation>) => void) => {
    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM operations', [], (_, { rows: { _array } }) => {
            setOperationsFunc(_array as Array<IOperation>)
        })
    })
}

const insertOperation = (
    id: string,
    amount: number,
    balanceId: string,
    category: CategoryType,
    date: number,
    operationType: OperationType,
) => {
    db.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO operations (id, amount, balanceId, category, date, operationType) values (?,?,?,?,?,?)',
            [id, amount, balanceId, category, date, operationType],
        )
    })
}

const dropOperationsTablesAsync = async () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DROP TABLE operations',
                [],
                (_, result) => {
                    resolve(result)
                },
                (_, error) => {
                    reject(error)
                    return true
                },
            )
        })
    })
}

const setupDatabaseAsync = async () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS operations (id INTEGER PRIMARY KEY NOT null, amount INT, balanceId INT, category TEXT, date INT, operationType TEXT)',
                [],
                (_, result) => {
                    resolve(result)
                },
                (_, error) => {
                    reject(error)
                    return true
                },
            )
        })
    })
}

export const operationDatabase = {
    dropOperationsTablesAsync,
    getOperations,
    insertOperation,
    setupDatabaseAsync,
}
