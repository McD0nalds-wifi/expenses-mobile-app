export type BalanceType = 'bankAccount' | 'cash'

export interface IBalance {
    amount: number
    id: number
    title: string
    type: BalanceType
}
