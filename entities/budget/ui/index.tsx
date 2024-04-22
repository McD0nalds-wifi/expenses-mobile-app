import { AntDesign } from '@expo/vector-icons'
import { FormattedNumber } from 'react-intl'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'

import { CATEGORIES, CategoryType } from '@/entities/category'
import { COLORS, CURRENT_CURRENCY } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'
import { FontelloIcon } from '@/shared/uikit'

interface IBudgetProps {
    amount: number
    categoryType: CategoryType
    onDeleteButtonPress: () => void
    spendingLimit: number
}

export const Budget = ({ amount, categoryType, onDeleteButtonPress, spendingLimit }: IBudgetProps) => {
    return (
        <GestureHandlerRootView>
            <Swipeable
                childrenContainerStyle={styles.wrapper}
                containerStyle={{ overflow: 'visible' }}
                renderRightActions={() => (
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={onDeleteButtonPress} style={styles.actionButton}>
                            <AntDesign color={COLORS.red} name='delete' size={24} />
                        </TouchableOpacity>
                    </View>
                )}
            >
                <View style={[styles.icon, { backgroundColor: CATEGORIES[categoryType].color }]}>
                    <FontelloIcon color='white' name={CATEGORIES[categoryType].icon} size={24} />
                </View>

                <View style={styles.content}>
                    <View style={styles.info}>
                        <Text style={[typographyStyles.subhedline, { color: COLORS.primary }]}>
                            {CATEGORIES[categoryType].title}
                        </Text>

                        <View style={{ flexDirection: 'row', gap: 4 }}>
                            <Text
                                style={[
                                    typographyStyles.subhedline,
                                    { color: amount === 0 ? COLORS.secondary : COLORS.primary },
                                ]}
                            >
                                <FormattedNumber minimumFractionDigits={2} value={amount} />
                            </Text>

                            <Text style={[typographyStyles.subhedline, { color: COLORS.secondary }]}>/</Text>

                            <Text style={[typographyStyles.subhedline, { color: COLORS.primary }]}>
                                <FormattedNumber
                                    currency={CURRENT_CURRENCY}
                                    minimumFractionDigits={2}
                                    style='currency'
                                    value={spendingLimit}
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
                                    width: `${Math.round(amount / (spendingLimit * 0.01))}%`,
                                },
                            ]}
                        />
                    </View>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    actionButton: {
        alignItems: 'center',
        borderRadius: 120,
        display: 'flex',
        // elevation: 16,
        height: 44,
        justifyContent: 'center',

        // shadowColor: COLORS.primary,
        // shadowOffset: {
        //     height: 2,
        //     width: 0,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 6,
        width: 44,
    },
    actions: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        marginLeft: 8,
    },
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
        shadowRadius: 12,
        width: 48,
    },
    info: {
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'space-between',
    },
    wrapper: {
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        gap: 16,
    },
})
