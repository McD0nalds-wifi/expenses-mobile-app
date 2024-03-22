import React from 'react'

import { useRouter } from 'expo-router'
import { FormattedMessage } from 'react-intl'

import { addBalance } from '@/entities/balance'
import { useTypedDispatch } from '@/shared/hooks/useTypedDispatch'
import { ModalHeader } from '@/shared/uikit'

import { Form } from './Form'
import { IAddBalanceFormData } from './Form/validationSchema'

export const AddBalance = () => {
    const { back } = useRouter()

    const dispatch = useTypedDispatch()

    const handleSubmit = ({ amount, name, balanceType }: IAddBalanceFormData) => {
        dispatch(addBalance({ amount, name, type: balanceType }))

        back()
    }

    return (
        <Form
            headerSlot={
                <ModalHeader
                    onClose={back}
                    title={<FormattedMessage defaultMessage='Добавление счета' id='MJ3VMZ' />}
                />
            }
            onSubmit={handleSubmit}
        />
    )
}
