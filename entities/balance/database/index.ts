import { db } from '@/shared/db'

import { BalanceType, IBalance } from '../types'

const getBalances = (setBalancesFunc: (balances: Array<IBalance>) => void) => {
    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM balances', [], (_, { rows: { _array } }) => {
            setBalancesFunc(_array as Array<IBalance>)
        })
    })
}

const insertBalance = (amount: number, name: string, type: BalanceType, successFunc: (balance: IBalance) => void) => {
    db.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO balances (amount, name, type) values (?,?,?)',
            [amount, name, type],
            (_, { insertId }) => {
                if (!insertId) {
                    return
                }

                successFunc({ amount, id: insertId, name, type })
            },
        )
    })
}

const dropBalancesTablesAsync = async () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DROP TABLE balances',
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
                'CREATE TABLE IF NOT EXISTS balances (id INTEGER PRIMARY KEY AUTOINCREMENT, amount INT, name TEXT, type TEXT)',
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

const setupBalancesAsync = async () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO balances (amount, name, type) values (?,?,?)',
                [0, 'Мой кошелек', 'bankAccount'],
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

export const balanceDatabase = {
    dropBalancesTablesAsync,
    getBalances,
    insertBalance,
    setupBalancesAsync,
    setupDatabaseAsync,
}
