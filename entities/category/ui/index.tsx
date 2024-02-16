import { isNumber } from 'lodash'
import { FormattedNumber } from 'react-intl'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS, CURRENT_CURRENCY } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'
import { FontelloIcon, FontelloIconNameType } from '@/shared/uikit'

interface ICategoryProps {
    color: string
    icon: FontelloIconNameType
    limit?: number
    title: string
    value?: number
}

export const Category = ({ color, icon, limit, title, value }: ICategoryProps) => {
    const percent = limit && value ? Math.round(value / (limit * 0.01)) : 0

    return (
        <View style={styles.container}>
            <View style={[styles.icon, { backgroundColor: color }]}>
                <FontelloIcon color={'white'} name={icon} size={24} />
            </View>

            <View style={styles.category}>
                <Text style={[typographyStyles.headline, { color: COLORS.primary, paddingLeft: 4 }]}>{title}</Text>

                {isNumber(value) && (
                    <Text style={[typographyStyles.headline, { color: COLORS.primary, paddingRight: 4 }]}>
                        <FormattedNumber currency={CURRENT_CURRENCY} style={'currency'} value={value} />
                    </Text>
                )}

                <View
                    style={[
                        styles.percentBar,
                        {
                            backgroundColor: color,
                            width: percent >= 100 ? '100%' : `${percent}%`,
                        },
                    ]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    category: {
        alignItems: 'center',
        flexDirection: 'row',
        flexGrow: 1,
        height: 48,
        justifyContent: 'space-between',
        position: 'relative',
    },
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
    percentBar: {
        borderRadius: 8,
        height: '100%',
        opacity: 0.1,
        position: 'absolute',
        right: 0,
        top: 0,
    },
})
