import React from 'react'

import { useLocalSearchParams, useRouter } from 'expo-router'
import { FormattedMessage } from 'react-intl'

import { CategoryType } from '@/entities/category'
import { OperationType } from '@/entities/operation'
import { AddOperationForm } from '@/features/add-operation'
import { ModalHeader } from '@/shared/uikit'

const AddOperation = () => {
    const { back } = useRouter()

    const { balanceId, operationType, category } = useLocalSearchParams<{
        balanceId: string
        category?: CategoryType
        operationType: OperationType
    }>()

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
            operationType={operationType}
        />
    )
}

export default AddOperation
