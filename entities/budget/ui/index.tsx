import { FormattedNumber } from 'react-intl'
import { StyleSheet, Text, View } from 'react-native'

import { CATEGORIES, CategoryType } from '@/entities/category'
import { COLORS, CURRENT_CURRENCY } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'
import { FontelloIcon } from '@/shared/uikit'

interface IBudgetProps {
    amount: number
    categoryType: CategoryType
    limit: number
}

export const Budget = ({ amount, categoryType, limit }: IBudgetProps) => {
    return (
        <View style={styles.wrapper}>
            <View style={[styles.icon, { backgroundColor: CATEGORIES[categoryType].color }]}>
                <FontelloIcon color='white' name={CATEGORIES[categoryType].icon} size={24} />
            </View>

            <View style={styles.content}>
                <View style={styles.info}>
                    <Text style={[typographyStyles.subhedline, { color: COLORS.primary }]}>
                        {CATEGORIES[categoryType].title}
                    </Text>

                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <Text style={[typographyStyles.subhedline, { color: COLORS.primary }]}>
                            <FormattedNumber minimumFractionDigits={2} value={amount} />
                        </Text>

                        <Text style={[typographyStyles.subhedline, { color: COLORS.secondary }]}>/</Text>

                        <Text style={[typographyStyles.subhedline, { color: COLORS.primary }]}>
                            <FormattedNumber
                                currency={CURRENT_CURRENCY}
                                minimumFractionDigits={2}
                                style='currency'
                                value={limit}
                            />
                        </Text>
                    </View>
                </View>

                <View style={styles.bar}>
                    <View
                        style={[
                            styles.barPercentLine,
                            {
                                backgroundColor: CATEGORIES[categoryType].color,
                                width: `${Math.round(amount / (limit * 0.01))}%`,
                            },
                        ]}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        backgroundColor: COLORS.background,
        borderRadius: 12,
        height: 8,
        position: 'relative',
        width: '100%',
    },
    barPercentLine: {
        borderRadius: 12,
        height: 8,
        left: 0,
        position: 'absolute',
        top: 0,
    },
    content: {
        flexGrow: 1,
        gap: 16,
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
    info: {
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'space-between',
    },
    wrapper: {
        flexDirection: 'row',
        gap: 16,
    },
})
