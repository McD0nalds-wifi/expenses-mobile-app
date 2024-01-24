import { useRef, useState } from 'react'

import { AntDesign, Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { Link } from 'expo-router'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { COLORS } from '@/shared/constants'
import { useTypedDispatch } from '@/shared/hooks'
import { typographyStyles } from '@/shared/styles'
import { FontelloIcon } from '@/shared/uikit'

import { CATEGORIES, DEFAULT_ACTIVE_INDEX } from '../config'
import { setCategory } from '../model'

export const ExploreCategories = () => {
    const scrollRef = useRef<ScrollView>(null)
    const itemsRef = useRef<Array<TouchableOpacity | null>>([])

    const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE_INDEX)

    const dispatch = useTypedDispatch()

    const selectCategory = (index: number) => () => {
        const selected = itemsRef.current[index]

        setActiveIndex(index)

        selected?.measure((x) => {
            scrollRef.current?.scrollTo({ animated: true, x: x - 16, y: 0 })
        })

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        dispatch(setCategory(CATEGORIES[index]))
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.shade01, flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.actionRow}>
                    <Link asChild href={'/(modals)/booking'}>
                        <TouchableOpacity>
                            <View style={styles.searchBtn}>
                                <AntDesign name={'search1'} size={24} />

                                <View>
                                    <Text style={typographyStyles.body14Bold}>Where to?</Text>
                                    {/*<Text style={{ color: Colors.grey, fontFamily: 'mon' }}>Anywhere · Any week</Text>*/}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name="options-outline" size={24} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={styles.categories}
                    horizontal
                    ref={scrollRef}
                    showsHorizontalScrollIndicator={false}
                >
                    {CATEGORIES.map(({ icon, name, title }, index) => (
                        <TouchableOpacity
                            key={name}
                            onPress={selectCategory(index)}
                            ref={(el) => (itemsRef.current[index] = el)}
                            style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                        >
                            <FontelloIcon
                                color={activeIndex === index ? COLORS.shade02 : COLORS.neutral06}
                                name={icon}
                                size={24}
                            />

                            <Text
                                style={[
                                    typographyStyles.body14Regular,
                                    { color: activeIndex === index ? COLORS.shade02 : COLORS.neutral06 },
                                ]}
                            >
                                {title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    actionRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 16,
        paddingHorizontal: 24,
    },
    categories: {
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 16,
    },
    categoriesBtn: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 8,
    },
    categoriesBtnActive: {
        alignItems: 'center',
        borderBottomColor: COLORS.shade02,
        borderBottomWidth: 2,
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 8,
    },
    container: {
        backgroundColor: COLORS.shade01,
        elevation: 2,
        height: 130,
        shadowColor: COLORS.shade02,
        shadowOffset: {
            height: 10,
            width: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    filterBtn: {
        borderColor: COLORS.neutral06,
        borderRadius: 24,
        borderWidth: 1,
        padding: 10,
    },
    searchBtn: {
        alignItems: 'center',
        backgroundColor: COLORS.shade01,
        borderColor: COLORS.neutral04,
        borderRadius: 30,
        borderWidth: StyleSheet.hairlineWidth,
        elevation: 2,
        flexDirection: 'row',
        gap: 10,
        padding: 14,
        shadowColor: COLORS.shade02,
        shadowOffset: {
            height: 1,
            width: 1,
        },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        width: 280,
    },
})
