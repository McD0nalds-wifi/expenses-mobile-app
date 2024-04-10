import React from 'react'

import { FlatList, TouchableOpacity } from 'react-native'

import { CATEGORIES, Category } from '@/entities/category'
import { CONTAINER_PADDING } from '@/shared/constants'
import { useTypedDispatch } from '@/shared/hooks/useTypedDispatch'

import { selectCategoryType } from '../model'

const CATEGORIES_LIST = Object.values(CATEGORIES)

interface ICategoriesListProps {
    onSelectCategory: () => void
}

export const CategoriesList = ({ onSelectCategory }: ICategoriesListProps) => {
    const dispatch = useTypedDispatch()

    return (
        <FlatList
            data={CATEGORIES_LIST}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                        dispatch(selectCategoryType(item.id))
                        onSelectCategory()
                    }}
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
