import { CategoryType } from '@/entities/category'
import { db } from '@/shared/db'

import { IBudget } from '../types'

const getBudgets = (setBudgetsFunc: (budgets: Array<IBudget>) => void) => {
    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM budgets', [], (_, { rows: { _array } }) => {
            setBudgetsFunc(_array as Array<IBudget>)
        })
    })
}

const insertBudget = (id: string, amount: number, spendingLimit: number, category: CategoryType) => {
    db.transaction((tx) => {
        tx.executeSql('INSERT INTO budgets (id, amount, spendingLimit, category) values (?,?,?,?)', [
            id,
            amount,
            spendingLimit,
            category,
        ])
    })
}

const updateBudgetSpendingLimit = (id: string, spendingLimit: number) => {
    db.transaction((tx) => {
        tx.executeSql('UPDATE budgets SET spendingLimit = ? WHERE id = ?', [spendingLimit, id])
    })
}

const updateBudgetAmount = (id: string, amount: number) => {
    db.transaction((tx) => {
        tx.executeSql('UPDATE budgets SET amount = ? WHERE id = ?', [amount, id])
    })
}

const dropBudgetsTablesAsync = async () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DROP TABLE budgets',
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
                'CREATE TABLE IF NOT EXISTS budgets (id TEXT PRIMARY KEY NOT null, amount INT, spendingLimit INT, category TEXT)',
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

export const budgetDatabase = {
    dropBudgetsTablesAsync,
    getBudgets,
    insertBudget,
    setupDatabaseAsync,
    updateBudgetAmount,
    updateBudgetSpendingLimit,
}
