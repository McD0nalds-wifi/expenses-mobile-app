import React, { ReactNode, useRef, useState } from 'react'

import * as Haptics from 'expo-haptics'
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { COLORS } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

interface IChipsProps {
    items: Array<ReactNode>
}

export const Chips = ({ items }: IChipsProps) => {
    const scrollRef = useRef<ScrollView>(null)
    const itemsRef = useRef<Array<TouchableOpacity | null>>([])
    const [activeIndex, setActiveIndex] = useState(0)

    const selectCategory = (index: number) => {
        const selected = itemsRef.current[index]
        setActiveIndex(index)
        selected?.measure((x) => {
            scrollRef.current?.scrollTo({ animated: true, x: x - 16, y: 0 })
        })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        // onCategoryChanged(categories[index].name)
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
                    key={index}
                    onPress={() => selectCategory(index)}
                    ref={(el) => (itemsRef.current[index] = el)}
                    style={activeIndex === index ? styles.chipActive : styles.chip}
                >
                    <Text
                        style={[
                            typographyStyles.subhedlineBold,
                            { color: activeIndex === index ? COLORS.white : COLORS.primary },
                        ]}
                    >
                        {item}
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
