import { memo, useEffect } from 'react'

import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { COLORS } from '@/shared/constants'

interface IBarChartItem {
    color: string
    value: number
}

interface IBarChartProps {
    items: Array<IBarChartItem>
}

const BarChartItem = ({ color, value }: { color: string; value: number }) => {
    const width = useSharedValue(0)

    const widthStyles = useAnimatedStyle(() => ({
        width: `${width.value}%`,
    }))

    useEffect(() => {
        width.value = withTiming(value, { duration: 400 })
    }, [width, value])

    return (
        <Animated.View
            style={[
                widthStyles,
                {
                    backgroundColor: color,
                    height: 14,
                },
            ]}
        />
    )
}

export const BarChart = memo(({ items }: IBarChartProps) => {
    const sumOfAllValues = items.reduce((acc, { value }) => acc + value, 0)
    const orderedItems = items.sort(({ value: a }, { value: b }) => a - b)

    return (
        <View style={styles.wrapper}>
            {orderedItems.map(({ value, color }, index) => {
                const percent = Math.ceil((value / sumOfAllValues) * 100)

                return <BarChartItem color={color} key={index} value={percent} />
            })}
        </View>
    )
})

BarChart.displayName = 'BarChart'

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLORS.background,
        borderRadius: 12,
        flexDirection: 'row',
        height: 14,
        overflow: 'hidden',
        width: '100%',
    },
})
