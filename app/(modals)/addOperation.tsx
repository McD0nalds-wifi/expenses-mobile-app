import React from 'react'

import { useLocalSearchParams, useRouter } from 'expo-router'
import { FormattedMessage } from 'react-intl'

import { CategoryType } from '@/entities/category'
import { OperationType, addOperation, operationDatabase } from '@/entities/operation'
import { AddOperationForm, IAddOperationFormData } from '@/features/add-operation'
import { useTypedDispatch } from '@/shared/hooks/useTypedDispatch'
import { ModalHeader } from '@/shared/uikit'

const AddOperation = () => {
    const { back } = useRouter()

    const dispatch = useTypedDispatch()

    const { balanceId, operationType, category } = useLocalSearchParams<{
        balanceId: string
        category?: CategoryType
        operationType: OperationType
    }>()

    const handleSubmit = ({ amount, date }: IAddOperationFormData) => {
        if (!category) {
            return
        }

        const fullDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0)

        operationDatabase.insertOperation(
            amount,
            Number(balanceId),
            category,
            fullDate.getTime(),
            operationType,
            (operation) => dispatch(addOperation(operation)),
        )

        back()
    }

    return (
        <AddOperationForm
            balanceId={Number(balanceId)}
            category={category}
            headerSlot={
                <ModalHeader
                    onClose={back}
                    title={
                        operationType === 'expenses' ? (
                            <FormattedMessage defaultMessage='Добавить расход' id='NeCOyP' />
                        ) : (
                            <FormattedMessage defaultMessage='Добавить доход' id='tOHzbF' />
                        )
                    }
                />
            }
            onSubmit={handleSubmit}
            operationType={operationType}
        />
    )
}

export default AddOperation
