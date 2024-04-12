import { IBudget } from '@/entities/budget'
import { operationsSelectors } from '@/entities/operation'
import { useTypedDispatch } from '@/shared/hooks/useTypedDispatch'
import { useTypedSelector } from '@/shared/hooks/useTypedSelector'

import { addBudget } from '../model'

export const useAddBudget = () => {
    const dispatch = useTypedDispatch()

    const operations = useTypedSelector((state) =>
        operationsSelectors.selectExpensesByMonthAndYear(state, new Date().getTime()),
    )

    return ({ category, spendingLimit }: Omit<IBudget, 'id' | 'amount'>) => {
        const amount = operations.reduce(
            (acc, operation) => (operation.category === category ? (acc += operation.amount) : acc),
            0,
        )

        dispatch(addBudget({ amount, category, spendingLimit }))
    }
}
