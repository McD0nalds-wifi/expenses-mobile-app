import React from 'react'

import { useLocalSearchParams, useRouter } from 'expo-router'
import { FormattedMessage } from 'react-intl'
import { FlatList, TouchableOpacity, View } from 'react-native'

import { CATEGORIES, Category } from '@/entities/category'
import { OperationType } from '@/entities/operation'
import { COLORS, CONTAINER_PADDING } from '@/shared/constants'
import { ROUTES } from '@/shared/routes'
import { baseStyles } from '@/shared/styles'
import { ModalHeader } from '@/shared/uikit'

const CATEGORIES_LIST = Object.values(CATEGORIES)

const CategoriesList = () => {
    const { back, push } = useRouter()

    const { balanceId, operationType } = useLocalSearchParams<{
        balanceId: string
        operationType: OperationType
    }>()

    return (
        <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View style={baseStyles.container}>
                <ModalHeader
                    onBack={back}
                    title={<FormattedMessage defaultMessage={'Список категорий'} id={'categoriesList'} />}
                />
            </View>

            <FlatList
                data={CATEGORIES_LIST}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => {
                            push(ROUTES.addOperation.getRoute(Number(balanceId), operationType, item.id))
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
        </View>
    )
}

export default CategoriesList
