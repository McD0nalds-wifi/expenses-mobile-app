import { CategoryType } from '@/entities/category'

export interface IBudget {
    amount: number
    category: CategoryType
    id: string
    limit: number
}
