import { useCallback, useState } from 'react'

import { getDay, isToday, isYesterday, startOfMonth } from 'date-fns'
import { isEmpty } from 'lodash'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { FlatList, Text, View, ViewToken } from 'react-native'

import { CATEGORIES } from '@/entities/category'
import { Operation, operationsSelectors } from '@/entities/operation'
import { COLORS } from '@/shared/constants'
import { useTypedSelector } from '@/shared/hooks/useTypedSelector'
import { baseStyles, typographyStyles } from '@/shared/styles'

import { EmptyState } from './EmptyState'
import { Header } from './Header'

export const Operations = () => {
    const [currentMonthAndYear, setCurrentMonthAndYear] = useState<number>()

    const operations = useTypedSelector(operationsSelectors.selectAll)

    const handleViewableItemsChanged = useCallback((info: { changed: ViewToken[]; viewableItems: ViewToken[] }) => {
        const date = info.viewableItems[0].item?.date as number

        setCurrentMonthAndYear(startOfMonth(date).getTime())
    }, [])

    if (isEmpty(operations)) {
        return <EmptyState />
    }

    return (
        <>
            <Header currentMonthAndYear={currentMonthAndYear || 0} />

            <FlatList
                data={operations}
                keyExtractor={(operation) => operation.id}
                onViewableItemsChanged={handleViewableItemsChanged}
                renderItem={({ item: operation, index }) => (
                    <View>
                        {!operations[index - 1] || getDay(operations[index - 1].date) !== getDay(operation.date) ? (
                            <Text style={[typographyStyles.title3, { color: COLORS.primary, paddingVertical: 12 }]}>
                                {isToday(operation.date) ? (
                                    <FormattedMessage defaultMessage='Сегодня' id='+glFq7' />
                                ) : isYesterday(operation.date) ? (
                                    <FormattedMessage defaultMessage='Вчера' id='2AT3bI' />
                                ) : (
                                    <FormattedDate day='2-digit' month='short' value={operation.date} />
                                )}
                            </Text>
                        ) : null}

                        <Operation
                            bankName='Тинькофф'
                            color={CATEGORIES[operation.category].color}
                            icon={CATEGORIES[operation.category].icon}
                            key={operation.id}
                            subtitle='Some text'
                            title={CATEGORIES[operation.category].title}
                            type={operation.operationType}
                            value={operation.amount}
                        />
                    </View>
                )}
                style={baseStyles.container}
                viewabilityConfig={{ itemVisiblePercentThreshold: 0 }}
            />
        </>
    )
}
