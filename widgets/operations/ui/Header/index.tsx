import { isSameYear } from 'date-fns'
import { FormattedDate, FormattedMessage, FormattedNumber } from 'react-intl'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS, CURRENT_CURRENCY } from '@/shared/constants'
import { baseStyles, typographyStyles } from '@/shared/styles'

interface IHeader {
    currentMonthAndYear?: number
}

export const Header = ({ currentMonthAndYear }: IHeader) => {
    return (
        <View style={[baseStyles.container, styles.wrapper]}>
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

            <Text style={[typographyStyles.body, { color: COLORS.primary }]}>
                <FormattedNumber currency={CURRENT_CURRENCY} style='currency' value={100000} />
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-between',
    },
})
