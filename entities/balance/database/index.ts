import { uniqueId } from 'lodash'

import { db } from '@/shared/db'

import { BalanceType, IBalance } from '../types'

const getBalances = (setBalancesFunc: (balances: Array<IBalance>) => void) => {
    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM balances', [], (_, { rows: { _array } }) => {
            setBalancesFunc(_array as Array<IBalance>)
        })
    })
}

const insertBalance = (id: string, amount: number, name: string, type: BalanceType) => {
    db.transaction((tx) => {
        tx.executeSql('INSERT INTO balances (id, amount, name, type) values (?,?,?,?)', [id, amount, name, type])
    })
}

const updateBalanceAmount = (id: string, amount: number) => {
    db.transaction((tx) => {
        tx.executeSql('UPDATE balances SET amount = ? WHERE id = ?', [amount, id])
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
                'CREATE TABLE IF NOT EXISTS balances (id TEXT PRIMARY KEY NOT null, amount INT, name TEXT, type TEXT)',
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
                'INSERT INTO balances (id, amount, name, type) values (?,?,?,?)',
                [uniqueId(), 0, 'Мой кошелек', 'bankAccount'],
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
    updateBalanceAmount,
}
