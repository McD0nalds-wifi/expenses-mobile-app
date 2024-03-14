import React from 'react'

import { FlatList, TouchableOpacity } from 'react-native'

import { CATEGORIES, Category, CategoryType } from '@/entities/category'
import { CONTAINER_PADDING } from '@/shared/constants'

const CATEGORIES_LIST = Object.values(CATEGORIES)

interface ICategoriesListProps {
    onSelectCategory: (categoryType: CategoryType) => void
}

export const CategoriesList = ({ onSelectCategory }: ICategoriesListProps) => {
    return (
        <FlatList
            data={CATEGORIES_LIST}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => onSelectCategory(item.id)}
                    style={{
                        paddingBottom: index + 1 === CATEGORIES_LIST.length ? CONTAINER_PADDING : 0,
                        paddingHorizontal: CONTAINER_PADDING,
                    }}
                >
                    <Category color={item.color} icon={item.icon} title={item.title} />
                </TouchableOpacity>
            )}
        />
    )
}
