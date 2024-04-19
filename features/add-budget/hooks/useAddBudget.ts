import { IBudget, addBudget } from '@/entities/budget'
import { operationsSelectors } from '@/entities/operation'
import { useTypedDispatch } from '@/shared/hooks/useTypedDispatch'
import { useTypedSelector } from '@/shared/hooks/useTypedSelector'

export const useAddBudget = () => {
    const dispatch = useTypedDispatch()

    const operations = useTypedSelector(operationsSelectors.selectExpensesByMonthAndYear(new Date().getTime()))

    return ({ category, spendingLimit }: Omit<IBudget, 'id' | 'amount'>) => {
        const amount = operations.reduce(
            (acc, operation) => (operation.category === category ? (acc += operation.amount) : acc),
            0,
        )

        dispatch(addBudget({ amount, category, spendingLimit }))
    }
}
