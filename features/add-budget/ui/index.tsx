import React from 'react'

import { useRouter } from 'expo-router'
import { FormattedMessage } from 'react-intl'

import { ModalHeader } from '@/shared/uikit'

import { Form } from './Form'

export const AddBudget = () => {
    const { back } = useRouter()

    return (
        <Form
            category='products'
            headerSlot={
                <ModalHeader onClose={back} title={<FormattedMessage defaultMessage='Добавить бюджет' id='kIQnR4' />} />
            }
            onSubmit={() => null}
        />
    )
}
