import { balanceDeposit, balanceWithdrawal } from '@/entities/balance'
import { budgetsSelectors, increaseBudgetAmount } from '@/entities/budget'
import { CategoryType } from '@/entities/category'
import { useTypedDispatch } from '@/shared/hooks/useTypedDispatch'
import { useTypedSelector } from '@/shared/hooks/useTypedSelector'

import { addOperation } from '../model'
import { OperationType } from '../types'

export const useAddOperation = () => {
    const dispatch = useTypedDispatch()

    const budgets = useTypedSelector(budgetsSelectors.selectAll)

    return (amount: number, date: Date, balanceId: string, category: CategoryType, operationType: OperationType) => {
        dispatch(
            addOperation({
                amount,
                balanceId,
                category,
                date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0).getTime(),
                operationType,
            }),
        )

        if (operationType === 'income') {
            dispatch(balanceDeposit({ amount, id: balanceId }))
        } else {
            dispatch(balanceWithdrawal({ amount, id: balanceId }))

            const budget = budgets.find((budget) => budget.category === category)

            if (!budget) {
                return
            }

            dispatch(increaseBudgetAmount({ amount, id: budget.id }))
        }
    }
}
