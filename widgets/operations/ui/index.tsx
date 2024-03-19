import { useCallback, useState } from 'react'

import { isToday, isYesterday, startOfMonth } from 'date-fns'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { FlatList, Text, View, ViewToken } from 'react-native'

import { CATEGORIES } from '@/entities/category'
import { Operation, selectOperationsByDays } from '@/entities/operation'
import { COLORS } from '@/shared/constants'
import { useTypedSelector } from '@/shared/hooks/useTypedSelector'
import { baseStyles, typographyStyles } from '@/shared/styles'

import { Header } from './Header'

export const Operations = () => {
    const [currentMonthAndYear, setCurrentMonthAndYear] = useState<number>()

    // TODO Add pagination
    const { days, operationsByDay } = useTypedSelector(selectOperationsByDays)

    const handleViewableItemsChanged = useCallback((info: { changed: ViewToken[]; viewableItems: ViewToken[] }) => {
        const day = info.viewableItems[0].item as number

        setCurrentMonthAndYear(startOfMonth(day).getTime())
    }, [])

    return (
        <>
            <Header currentMonthAndYear={currentMonthAndYear} />

            <FlatList
                data={days}
                keyExtractor={(day) => String(day)}
                onViewableItemsChanged={handleViewableItemsChanged}
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
                            {operationsByDay[day].map(({ amount, category, id, operationType }) => (
                                <Operation
                                    bankName='Тинькофф'
                                    color={CATEGORIES[category].color}
                                    icon={CATEGORIES[category].icon}
                                    key={id}
                                    subtitle='Some text'
                                    title={CATEGORIES[category].title}
                                    type={operationType}
                                    value={amount}
                                />
                            ))}
                        </View>
                    </View>
                )}
                style={baseStyles.container}
                viewabilityConfig={{ itemVisiblePercentThreshold: 0 }}
            />
        </>
    )
}
