import { isToday, isYesterday } from 'date-fns'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { FlatList, Text, View } from 'react-native'

import { CATEGORIES } from '@/entities/category'
import { Operation, selectOperationsByDays } from '@/entities/operation'
import { COLORS } from '@/shared/constants'
import { useTypedSelector } from '@/shared/hooks/useTypedSelector'
import { baseStyles, typographyStyles } from '@/shared/styles'

export const Operations = () => {
    // TODO Add pagination
    const { days, operationsByDay } = useTypedSelector(selectOperationsByDays)

    return (
        <FlatList
            data={days}
            keyExtractor={(day) => String(day)}
            renderItem={({ item: day }) => (
                <View>
                    <Text style={[typographyStyles.title3, { color: COLORS.primary, paddingVertical: 12 }]}>
                        {isToday(day) ? (
                            <FormattedMessage defaultMessage='Сегодня' id='+glFq7' />
                        ) : isYesterday(day) ? (
                            <FormattedMessage defaultMessage='Вчера' id='2AT3bI' />
                        ) : (
                            <FormattedDate day='2-digit' month='short' value={day} />
                        )}
                    </Text>

                    <View>
                        {operationsByDay[day].map(({ amount, category, id }) => (
                            <Operation
                                bankName='Тинькофф'
                                color={CATEGORIES[category].color}
                                icon={CATEGORIES[category].icon}
                                key={id}
                                subtitle='Some text'
                                title={CATEGORIES[category].title}
                                value={amount}
                            />
                        ))}
                    </View>
                </View>
            )}
            style={baseStyles.container}
        />
    )
}
