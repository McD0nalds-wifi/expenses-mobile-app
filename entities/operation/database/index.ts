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
    amount: number,
    balanceId: number,
    category: CategoryType,
    date: number,
    name: string,
    operationType: OperationType,
    successFunc: (balance: IOperation) => void,
) => {
    db.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO operations (amount, balanceId, category, date, name, operationType) values (?,?,?,?,?,?)',
            [amount, balanceId, category, date, name, operationType],
            (_, { insertId }) => {
                if (!insertId) {
                    return
                }

                successFunc({ amount, balanceId, category, date, id: insertId, name, operationType })
            },
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
                'CREATE TABLE IF NOT EXISTS operations (id INTEGER PRIMARY KEY AUTOINCREMENT, amount INT, balanceId INT, category TEXT, date INT, name TEXT, operationType TEXT)',
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
