import { AntDesign } from '@expo/vector-icons'
import { isSameYear } from 'date-fns'
import { noop } from 'lodash'
import { FormattedDate, FormattedMessage, FormattedNumber } from 'react-intl'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { COLORS, CURRENT_CURRENCY } from '@/shared/constants'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { typographyStyles } from '@/shared/styles'

interface IExpenses {
    currentMonthAndYear?: number
    onExpensesPress?: () => void
}

export const Expenses = ({ currentMonthAndYear, onExpensesPress = noop }: IExpenses) => {
    const { value: expensesArrowUp, toggle: handleExpensesArrowClick } = useBoolean(false)

    return (
        <View style={styles.wrapper}>
            {!currentMonthAndYear || isSameYear(currentMonthAndYear, new Date()) ? (
                <Text style={[typographyStyles.title2, { color: COLORS.primary }]}>
                    <FormattedMessage
                        defaultMessage='Траты за {date}'
                        id='TcUJkj'
                        values={{ date: <FormattedDate month='long' value={currentMonthAndYear} /> }}
                    />
                </Text>
            ) : (
                <Text style={[typographyStyles.title3, { color: COLORS.primary }]}>
                    <FormattedMessage
                        defaultMessage='Траты за {date}'
                        id='TcUJkj'
                        values={{ date: <FormattedDate month='long' value={currentMonthAndYear} year='numeric' /> }}
                    />
                </Text>
            )}

            <TouchableOpacity
                onPress={() => {
                    handleExpensesArrowClick()
                    onExpensesPress()
                }}
                style={{ alignItems: 'center', flexDirection: 'row', gap: 8 }}
            >
                <Text style={[typographyStyles.body, { color: COLORS.blue }]}>
                    <FormattedNumber currency={CURRENT_CURRENCY} style='currency' value={100000} />
                </Text>

                <AntDesign color={COLORS.blue} name={expensesArrowUp ? 'up' : 'down'} size={14} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between',
    },
})
