import { CategoryType } from '@/entities/category'

export type OperationType = 'expenses' | 'income'

export interface IOperation {
    amount: number
    balanceId: number
    category: CategoryType
    date: number
    id: number
    operationType: OperationType
}
