export type BalanceType = 'bankAccount' | 'cash'

export interface IBalance {
    amount: number
    id: number
    name: string
    type: BalanceType
}
