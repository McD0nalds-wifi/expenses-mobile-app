import React, { useEffect } from 'react'

import { useRouter } from 'expo-router'
import { FormattedMessage } from 'react-intl'

import { useTypedDispatch } from '@/shared/hooks/useTypedDispatch'
import { useTypedSelector } from '@/shared/hooks/useTypedSelector'
import { ModalHeader } from '@/shared/uikit'
import { resetCategoryType, selectSelectedCategoryType } from '@/widgets/categories-list'

import { Form } from './Form'
import { IAddBudgetFormData } from './Form/validationSchema'

export const AddBudget = () => {
    const { back } = useRouter()
    const dispatch = useTypedDispatch()

    const selectedCategoryType = useTypedSelector(selectSelectedCategoryType)

    useEffect(() => {
        return () => {
            dispatch(resetCategoryType())
        }
    }, [dispatch])

    const handleSubmit = ({}: IAddBudgetFormData) => {
        if (!selectedCategoryType) {
            return
        }

        // TODO
        // dispatch(
        //     addOperation({
        //         amount,
        //         balanceId: selectedBalance.id,
        //         category: selectedCategoryType,
        //         date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0).getTime(),
        //         operationType,
        //     }),
        // )

        back()
    }

    return (
        <Form
            category={selectedCategoryType}
            headerSlot={
                <ModalHeader onClose={back} title={<FormattedMessage defaultMessage='Добавить бюджет' id='kIQnR4' />} />
            }
            onSubmit={handleSubmit}
        />
    )
}
