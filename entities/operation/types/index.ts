import { CategoryType } from '@/entities/category'

export type OperationType = 'expenses' | 'income'

export interface IOperation {
    amount: number
    balanceId: string
    category: CategoryType
    date: number
    id: string
    operationType: OperationType
}
