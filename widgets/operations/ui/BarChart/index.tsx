import { memo } from 'react'

import { StyleSheet, View } from 'react-native'

interface IBarChartItem {
    color: string
    value: number
}

interface IBarChartProps {
    items: Array<IBarChartItem>
}

export const BarChart = memo(({ items }: IBarChartProps) => {
    const sumOfAllValues = items.reduce((acc, { value }) => acc + value, 0)
    const orderedItems = items.sort(({ value: a }, { value: b }) => a - b)

    return (
        <View style={styles.wrapper}>
            {orderedItems.map(({ value, color }, index) => {
                const percent = Math.round((value / sumOfAllValues) * 100)

                return (
                    <View
                        key={index}
                        style={{
                            backgroundColor: color,
                            height: 14,
                            width: `${percent || 5}%`,
                        }}
                    />
                )
            })}
        </View>
    )
})

BarChart.displayName = 'BarChart'

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 12,
        flexDirection: 'row',
        height: 14,
        overflow: 'hidden',
        width: '100%',
    },
})
