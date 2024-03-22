import React, { useEffect } from 'react'

import { Canvas, Path, Skia } from '@shopify/react-native-skia'
import { View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

import { COLORS } from '@/shared/constants'

import { DonutPath } from './DonutPath'

interface IDonutChartItem {
    color: string
    value: number
}

interface IDonutChartProps {
    items: Array<IDonutChartItem>
    outerStrokeWidth: number
    radius: number
    strokeWidth: number
}

const calculatePercentage = (numbers: Array<number>, total: number) => {
    const percentageArray: number[] = []

    numbers.forEach((number) => {
        const percentage = Math.round((number / total) * 100)

        percentageArray.push(percentage)
    })

    return percentageArray
}

export const DonutChart = ({ items, outerStrokeWidth, radius, strokeWidth }: IDonutChartProps) => {
    const decimals = useSharedValue<number[]>([])

    const innerRadius = radius - outerStrokeWidth / 2

    useEffect(() => {
        const values = items.map(({ value }) => value)
        const total = values.reduce((acc, value) => acc + value, 0)
        const percentages = calculatePercentage(values, total)

        decimals.value = percentages.map((number) => Number(number.toFixed(0)) / 100)
    }, [decimals, items])

    const path = Skia.Path.Make()
    path.addCircle(radius, radius, innerRadius)

    return (
        <View
            style={{
                height: radius * 2,
                width: radius * 2,
            }}
        >
            <Canvas style={{ flex: 1 }}>
                <Path
                    color={COLORS.background}
                    end={1}
                    path={path}
                    start={0}
                    strokeCap='round'
                    strokeJoin='round'
                    strokeWidth={outerStrokeWidth}
                    style='stroke'
                />

                {items.map(({ color }, index) => (
                    <DonutPath
                        color={color}
                        decimals={decimals}
                        gap={0}
                        index={index}
                        key={index}
                        outerStrokeWidth={outerStrokeWidth}
                        radius={radius}
                        strokeWidth={strokeWidth}
                    />
                ))}
            </Canvas>
        </View>
    )
}
