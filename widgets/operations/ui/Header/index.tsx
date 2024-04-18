import { useMemo, useState } from 'react'

import { startOfToday } from 'date-fns'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

import { CATEGORIES } from '@/entities/category'
import { operationsSelectors } from '@/entities/operation'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { useTypedSelector } from '@/shared/hooks/useTypedSelector'
import { baseStyles } from '@/shared/styles'
import { DonutChart } from '@/shared/uikit'

import { BarChart } from '../BarChart'
import { Chip } from '../Chip'
import { Expenses } from '../Expenses'

interface IHeaderProps {
    currentMonthAndYear?: number
}

const today = startOfToday().getTime()

export const Header = ({ currentMonthAndYear = today }: IHeaderProps) => {
    const { value: accordionOpen, toggle: handleExpensesPress } = useBoolean(false)
    const [accordionContentHeight, setAccordionContentHeight] = useState(0)

    const { topExpenses, topExpensesAmount, otherExpensesAmount } = useTypedSelector((state) =>
        operationsSelectors.selectTopExpensesByMonthAndYear(state, 5, currentMonthAndYear),
    )

    const chartsData = useMemo(
        () => [
            ...topExpenses.map(({ amount, category }) => ({
                color: CATEGORIES[category].color,
                value: amount,
            })),
            ...(otherExpensesAmount > 0
                ? [
                      {
                          color: CATEGORIES.other.color,
                          value: otherExpensesAmount,
                      },
                  ]
                : []),
        ],
        [otherExpensesAmount, topExpenses],
    )

    const accordionAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: accordionOpen
                ? withTiming(accordionContentHeight, { duration: 400 })
                : withTiming(0, { duration: 400 }),
        }
    })

    const donutChartAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: accordionOpen ? withTiming(1, { duration: 500 }) : withTiming(0, { duration: 200 }) }],
        }
    })

    const barChartAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: accordionOpen ? withTiming(0, { duration: 200 }) : withTiming(1, { duration: 500 }),
        }
    })

    return (
        <View style={[baseStyles.container, { paddingBottom: 16 }]}>
            <Expenses
                amount={topExpensesAmount + otherExpensesAmount}
                currentMonthAndYear={currentMonthAndYear}
                onExpensesPress={handleExpensesPress}
            />

            <Animated.View style={[accordionAnimatedStyle, { overflow: 'hidden' }]}>
                <View
                    onLayout={(event) => {
                        const layoutHeight = event.nativeEvent.layout.height

                        if (layoutHeight > 0 && layoutHeight !== accordionContentHeight) {
                            setAccordionContentHeight(layoutHeight)
                        }
                    }}
                    style={{ position: 'absolute', width: '100%' }}
                >
                    <Animated.View style={[donutChartAnimatedStyle, { alignItems: 'center' }]}>
                        <DonutChart
                            items={accordionOpen ? chartsData : []}
                            outerStrokeWidth={20}
                            radius={70}
                            strokeWidth={20}
                        />
                    </Animated.View>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 24 }}>
                        {topExpenses.map(({ amount, category }) => (
                            <Chip
                                color={CATEGORIES[category].color}
                                key={CATEGORIES[category].id}
                                title={CATEGORIES[category].title}
                                value={amount}
                            />
                        ))}

                        {otherExpensesAmount > 0 && (
                            <Chip color={CATEGORIES.other.color} title='Прочее' value={otherExpensesAmount} />
                        )}
                    </View>
                </View>
            </Animated.View>

            <Animated.View style={barChartAnimatedStyle}>
                <BarChart items={chartsData} />
            </Animated.View>
        </View>
    )
}
