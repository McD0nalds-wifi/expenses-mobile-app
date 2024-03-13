import React from 'react'

import { useRouter } from 'expo-router'
import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'

import { IBalance } from '@/entities/balance'
import { setSelectedBalance } from '@/features/add-operation'
import { COLORS } from '@/shared/constants'
import { useTypedDispatch } from '@/shared/hooks/useTypedDispatch'
import { baseStyles } from '@/shared/styles'
import { ModalHeader } from '@/shared/uikit'
import { BalancesList } from '@/widgets/balances-list'

const BalancesListModal = () => {
    const { back } = useRouter()

    const dispatch = useTypedDispatch()

    const handleSelectBalance = (balance: IBalance) => {
        dispatch(setSelectedBalance(balance))
        back()
    }

    return (
        <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View style={baseStyles.container}>
                <ModalHeader onBack={back} title={<FormattedMessage defaultMessage='Список счетов' id='BPmLdt' />} />
            </View>

            <BalancesList onSelectBalance={handleSelectBalance} />
        </View>
    )
}

export default BalancesListModal
