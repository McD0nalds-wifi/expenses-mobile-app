import React, { ReactNode, useRef } from 'react'

import * as Haptics from 'expo-haptics'
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { COLORS } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

interface IChipItem<T> {
    id: T
    title: ReactNode
}

interface IChipsProps<T> {
    activeItem: IChipItem<T>
    items: Array<IChipItem<T>>
    onChange: (item: IChipItem<T>) => void
}

export const Chips = <T extends string>({ activeItem, items, onChange }: IChipsProps<T>) => {
    const scrollRef = useRef<ScrollView>(null)
    const itemsRef = useRef<Array<TouchableOpacity | null>>([])

    const handleChipPress = (item: IChipItem<T>, index: number) => () => {
        const selected = itemsRef.current[index]

        selected?.measure((x) => {
            scrollRef.current?.scrollTo({ animated: true, x: x - 16, y: 0 })
        })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        onChange(item)
    }

    return (
        <ScrollView
            contentContainerStyle={{ gap: 12 }}
            horizontal
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
        >
            {items.map((item, index) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={handleChipPress(item, index)}
                    ref={(el) => (itemsRef.current[index] = el)}
                    style={activeItem.id === item.id ? styles.chipActive : styles.chip}
                >
                    <Text
                        style={[
                            typographyStyles.subhedlineBold,
                            { color: activeItem.id === item.id ? COLORS.white : COLORS.primary },
                        ]}
                    >
                        {item.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    chip: {
        backgroundColor: COLORS.background,
        borderRadius: 120,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    chipActive: {
        backgroundColor: COLORS.primary,
        borderRadius: 120,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
})
