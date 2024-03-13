import { ReactNode } from 'react'

import { FormattedNumber } from 'react-intl'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS, CURRENT_CURRENCY } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

interface IListItemProps {
    amount: number
    icon: ReactNode
    title: string
}

export const ListItem = ({ amount, icon, title }: IListItemProps) => {
    return (
        <View style={styles.container}>
            <View style={[styles.icon, { backgroundColor: 'white' }]}>{icon}</View>

            <View style={styles.category}>
                <Text style={[typographyStyles.headline, { color: COLORS.primary }]}>{title}</Text>

                <Text style={[typographyStyles.headline, { color: COLORS.primary }]}>
                    <FormattedNumber currency={CURRENT_CURRENCY} style='currency' value={amount} />
                </Text>
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
        paddingHorizontal: 4,
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
