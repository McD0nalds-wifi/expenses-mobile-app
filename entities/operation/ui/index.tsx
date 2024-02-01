import { FormattedNumber } from 'react-intl'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS, CURRENT_CURRENCY } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'
import { FontelloIcon, FontelloIconNameType } from '@/shared/uikit'

interface IOperationProps {
    bankName?: string
    color: string
    icon: FontelloIconNameType
    subtitle: string
    title: string
    value: number
}

export const Operation = ({ bankName, color, icon, subtitle, title, value }: IOperationProps) => {
    return (
        <View style={styles.container}>
            <View style={[styles.icon, { backgroundColor: color }]}>
                <FontelloIcon color={'white'} name={icon} size={24} />
            </View>

            <View style={{ flexDirection: 'column', flexGrow: 1, gap: 2 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[typographyStyles.headline, { color: COLORS.primary }]}>{title}</Text>

                    <Text style={[typographyStyles.headline, { color: COLORS.primary }]}>
                        <FormattedNumber currency={CURRENT_CURRENCY} style={'currency'} value={value} />
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[typographyStyles.subhedline, { color: COLORS.secondary }]}>{subtitle}</Text>

                    {bankName && (
                        <Text style={[typographyStyles.subhedline, { color: COLORS.secondary }]}>{bankName}</Text>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'center',
        paddingVertical: 12,
    },
    icon: {
        alignItems: 'center',
        borderRadius: 48,
        elevation: 16,
        height: 48,
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: {
            height: 8,
            width: 0,
        },
        shadowOpacity: 0.16,
        shadowRadius: 20,
        width: 48,
    },
})
