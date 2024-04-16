import React, { useEffect } from 'react'

import { useRouter } from 'expo-router'
import { FormattedMessage } from 'react-intl'

import { IBalance } from '@/entities/balance'
import { OperationType, useAddOperation } from '@/entities/operation'
import { useTypedDispatch } from '@/shared/hooks/useTypedDispatch'
import { useTypedSelector } from '@/shared/hooks/useTypedSelector'
import { ModalHeader } from '@/shared/uikit'
import { resetBalance, selectBalance, selectSelectedBalance } from '@/widgets/balances-list'
import { resetCategoryType, selectSelectedCategoryType } from '@/widgets/categories-list'

import { Form } from './Form'
import { IAddOperationFormData } from './Form/validationSchema'

interface IAddOperationProps {
    defaultBalance?: IBalance
    operationType: OperationType
}

export const AddOperation = ({ defaultBalance, operationType }: IAddOperationProps) => {
    const { back } = useRouter()
    const dispatch = useTypedDispatch()

    const addOperation = useAddOperation()

    const selectedCategoryType = useTypedSelector(selectSelectedCategoryType)
    const selectedBalance = useTypedSelector(selectSelectedBalance)

    useEffect(() => {
        if (!defaultBalance) {
            return
        }

        dispatch(selectBalance(defaultBalance))
    }, [defaultBalance, dispatch])

    useEffect(() => {
        return () => {
            dispatch(resetCategoryType())
            dispatch(resetBalance())
        }
    }, [dispatch])

    const handleSubmit = ({ amount, date }: IAddOperationFormData) => {
        if (!selectedCategoryType || !selectedBalance) {
            return
        }

        addOperation(amount, date, selectedBalance.id, selectedCategoryType, operationType)

        back()
    }

    return (
        <Form
            balanceTitle={selectedBalance?.name}
            category={selectedCategoryType}
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
        />
    )
}
