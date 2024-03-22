import { memo } from 'react'

import { AntDesign } from '@expo/vector-icons'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS, CURRENT_CURRENCY } from '@/shared/constants'
import { baseStyles, typographyStyles } from '@/shared/styles'
import { Button } from '@/shared/uikit'

import { Badge } from './Badge'

interface IBalanceProps {
    amount: number
    onAddExpense: () => void
    onAddIncome: () => void
    subtitle: string
    title: string
}

export const Balance = memo(({ amount, onAddExpense, onAddIncome, subtitle, title }: IBalanceProps) => {
    return (
        <View style={[baseStyles.container, styles.container]}>
            <View style={styles.header}>
                <Text style={[typographyStyles.subhedline, { color: COLORS.secondary }]}>{title}</Text>

                <Badge title={subtitle} />
            </View>

            <View style={styles.amount}>
                <Text style={typographyStyles.largeTitle}>
                    <FormattedNumber currency={CURRENT_CURRENCY} style='currency' value={amount} />
                </Text>

                {/*<Pnl value={0.12} />*/}
            </View>

            <View style={{ flexDirection: 'row', gap: 16, marginTop: 16 }}>
                <Button
                    iconStart={<AntDesign color={COLORS.white} name='minus' size={24} />}
                    onPress={onAddExpense}
                    size='medium'
                    style={{ flexGrow: 1 }}
                    type='primary'
                >
                    <FormattedMessage defaultMessage='Потратить' id='4u9zlX' />
                </Button>

                <Button
                    iconStart={<AntDesign color={COLORS.white} name='plus' size={24} />}
                    onPress={onAddIncome}
                    size='medium'
                    style={{ flexGrow: 1 }}
                    type='primary'
                >
                    <FormattedMessage defaultMessage='Пополнить' id='VITanR' />
                </Button>
            </View>
        </View>
    )
})

Balance.displayName = 'Balance'

const styles = StyleSheet.create({
    amount: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'space-between',
        marginTop: 8,
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 6,
    },
})
