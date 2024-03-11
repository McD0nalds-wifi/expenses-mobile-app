export type BalanceType = 'bankAccount' | 'cash'

export interface IBalance {
    amount: number
    id: string
    name: string
    type: BalanceType
}
