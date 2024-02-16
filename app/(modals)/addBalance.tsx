import React from 'react'

import { useRouter } from 'expo-router'
import { FormattedMessage } from 'react-intl'

import { AddBalanceForm } from '@/features/add-balance'
import { ModalHeader } from '@/shared/uikit'

const AddBalance = () => {
    const { back } = useRouter()

    return (
        <AddBalanceForm
            headerSlot={
                <ModalHeader
                    onClose={back}
                    title={<FormattedMessage defaultMessage={'Добавление счета'} id={'addingInvoice'} />}
                />
            }
        />
    )
}

export default AddBalance
