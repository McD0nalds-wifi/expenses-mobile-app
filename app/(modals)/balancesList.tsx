import React from 'react'

import { useRouter } from 'expo-router'
import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'

import { COLORS } from '@/shared/constants'
import { baseStyles } from '@/shared/styles'
import { ModalHeader } from '@/shared/uikit'
import { BalancesList } from '@/widgets/balances-list'

const BalancesListModal = () => {
    const { back } = useRouter()

    return (
        <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View style={baseStyles.container}>
                <ModalHeader onBack={back} title={<FormattedMessage defaultMessage='Список счетов' id='BPmLdt' />} />
            </View>

            <BalancesList onSelectBalance={back} />
        </View>
    )
}

export default BalancesListModal
