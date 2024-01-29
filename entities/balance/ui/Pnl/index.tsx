import { FormattedNumber } from 'react-intl'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

interface IPnlProps {
    value: number
}

export const Pnl = ({ value }: IPnlProps) => {
    const sign = value > 0 ? '+' : value < 0 ? '-' : ''

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: value > 0 ? COLORS.green : value < 0 ? COLORS.red : COLORS.secondary },
            ]}
        >
            <Text style={[typographyStyles.subhedlineBold, { color: COLORS.white }]}>
                {sign} <FormattedNumber signDisplay={'exceptZero'} style={'percent'} value={Math.abs(value)} />
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 120,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
})
