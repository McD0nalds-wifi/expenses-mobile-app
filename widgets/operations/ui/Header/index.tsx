import { useState } from 'react'

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
    currentMonthAndYear: number
}

export const Header = ({ currentMonthAndYear }: IHeaderProps) => {
    const { value: accordionOpen, toggle: handleExpensesPress } = useBoolean(false)
    const [accordionContentHeight, setAccordionContentHeight] = useState(0)

    const { topExpenses, otherExpensesAmount } = useTypedSelector((state) =>
        operationsSelectors.selectTopExpensesByMonthAndYear(state, 5, currentMonthAndYear),
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

    const testAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: accordionOpen ? withTiming(0, { duration: 200 }) : withTiming(1, { duration: 500 }),
        }
    })

    return (
        <View style={[baseStyles.container, { paddingBottom: 16 }]}>
            <Expenses currentMonthAndYear={currentMonthAndYear} onExpensesPress={handleExpensesPress} />

            <Animated.View style={[accordionAnimatedStyle, { overflow: 'hidden' }]}>
                <View
                    onLayout={(event) => {
                        const layoutHeight = event.nativeEvent.layout.height

                        if (layoutHeight > 0 && layoutHeight !== accordionContentHeight) {
                            setAccordionContentHeight(layoutHeight)
                        }
                    }}
                    style={{ position: 'absolute' }}
                >
                    <Animated.View style={[donutChartAnimatedStyle, { alignItems: 'center' }]}>
                        <DonutChart
                            items={
                                accordionOpen
                                    ? [
                                          ...topExpenses.map(([category, amount]) => ({
                                              color: CATEGORIES[category].color,
                                              value: amount,
                                          })),
                                          {
                                              color: CATEGORIES.other.color,
                                              value: otherExpensesAmount,
                                          },
                                      ]
                                    : []
                            }
                            outerStrokeWidth={20}
                            radius={70}
                            strokeWidth={20}
                        />
                    </Animated.View>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 24 }}>
                        {topExpenses.map(([category, amount]) => (
                            <Chip
                                color={CATEGORIES[category].color}
                                key={CATEGORIES[category].id}
                                title={CATEGORIES[category].title}
                                value={amount}
                            />
                        ))}
                    </View>
                </View>
            </Animated.View>

            <Animated.View style={testAnimatedStyle}>
                <BarChart
                    items={[
                        ...topExpenses.map(([category, amount]) => ({
                            color: CATEGORIES[category].color,
                            value: amount,
                        })),
                        {
                            color: CATEGORIES.other.color,
                            value: otherExpensesAmount,
                        },
                    ]}
                />
            </Animated.View>
        </View>
    )
}
