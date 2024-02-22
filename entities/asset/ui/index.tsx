import { FormattedNumber } from 'react-intl'
import { Image, StyleSheet, Text, View } from 'react-native'

import { COLORS, CURRENT_CURRENCY } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

interface IAssetProps {
    iconUrl: string
    pnl: number
    title: string
    value: number
}

export const Asset = ({ iconUrl, pnl, title, value }: IAssetProps) => {
    const sign = pnl > 0 ? '+' : pnl < 0 ? '-' : ''

    return (
        <View style={{ flexDirection: 'row', gap: 16 }}>
            <View style={styles.icon}>
                <Image source={{ uri: iconUrl }} style={{ borderRadius: 48, height: 48, width: 48 }} />
            </View>

            <View style={{ flexDirection: 'column', flexGrow: 1, gap: 2 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[typographyStyles.headline, { color: COLORS.primary }]}>{title}</Text>

                    <Text style={[typographyStyles.headline, { color: COLORS.primary }]}>
                        <FormattedNumber currency={CURRENT_CURRENCY} style='currency' value={value} />
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[typographyStyles.subhedline, { color: COLORS.secondary }]}>2.569032 ETH</Text>

                    <Text
                        style={[
                            typographyStyles.headline,
                            { color: pnl > 0 ? COLORS.green : pnl < 0 ? COLORS.red : COLORS.secondary },
                        ]}
                    >
                        {sign} <FormattedNumber style='percent' value={Math.abs(pnl)} />
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        elevation: 16,
        shadowColor: COLORS.primary,
        shadowOffset: {
            height: 8,
            width: 0,
        },
        shadowOpacity: 0.16,
        shadowRadius: 20,
    },
})
