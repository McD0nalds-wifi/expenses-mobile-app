import React from 'react'

import { useRouter } from 'expo-router'
import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'

import { COLORS } from '@/shared/constants'
import { baseStyles } from '@/shared/styles'
import { ModalHeader } from '@/shared/uikit'
import { CategoriesList } from '@/widgets/categories-list'

const CategoriesListModal = () => {
    const { back } = useRouter()

    return (
        <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View style={baseStyles.container}>
                <ModalHeader onBack={back} title={<FormattedMessage defaultMessage='Список категорий' id='T+wLZf' />} />
            </View>

            <CategoriesList onSelectCategory={back} />
        </View>
    )
}

export default CategoriesListModal
