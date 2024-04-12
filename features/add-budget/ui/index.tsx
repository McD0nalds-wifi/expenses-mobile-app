import React, { useEffect } from 'react'

import { useRouter } from 'expo-router'
import { FormattedMessage } from 'react-intl'

import { useAddBudget } from '@/entities/budget'
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

    const addBudget = useAddBudget()

    useEffect(() => {
        return () => {
            dispatch(resetCategoryType())
        }
    }, [dispatch])

    const handleSubmit = ({ limit }: IAddBudgetFormData) => {
        if (!selectedCategoryType) {
            return
        }

        addBudget({ category: selectedCategoryType, spendingLimit: limit })

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
