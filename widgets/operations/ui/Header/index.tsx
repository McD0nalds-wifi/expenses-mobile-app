import { useState } from 'react'

import { View } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

import { CATEGORIES } from '@/entities/category'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { baseStyles } from '@/shared/styles'
import { DonutChart } from '@/shared/uikit'

import { BarChart } from '../BarChart'
import { Chip } from '../Chip'
import { Expenses } from '../Expenses'

interface IHeaderProps {
    currentMonthAndYear?: number
}

const data = [
    {
        color: CATEGORIES.car.color,
        value: 2300,
    },
    {
        color: CATEGORIES.cafe.color,
        value: 10,
    },
    {
        color: CATEGORIES.education.color,
        value: 7000,
    },
    {
        color: CATEGORIES.products.color,
        value: 4000,
    },
    {
        color: CATEGORIES.entertainments.color,
        value: 3000,
    },
]

export const Header = ({ currentMonthAndYear }: IHeaderProps) => {
    const { value: accordionOpen, toggle: handleExpensesPress } = useBoolean(false)
    const [accordionContentHeight, setAccordionContentHeight] = useState(0)

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
                            items={accordionOpen ? data : []}
                            outerStrokeWidth={20}
                            radius={70}
                            strokeWidth={20}
                        />
                    </Animated.View>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 24 }}>
                        {Object.values(CATEGORIES)
                            .slice(0, 6)
                            .map(({ color, title, id }) => (
                                <Chip color={color} key={id} title={title} value={10000} />
                            ))}
                    </View>
                </View>
            </Animated.View>

            <Animated.View style={testAnimatedStyle}>
                <BarChart items={data} />
            </Animated.View>
        </View>
    )
}
