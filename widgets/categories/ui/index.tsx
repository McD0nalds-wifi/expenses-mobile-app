import { random } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

import { Category } from '@/entities/category'
import { baseStyles, typographyStyles } from '@/shared/styles'

import { CATEGORIES } from '../config'

const CATEGORIES_LIST = Object.values(CATEGORIES).slice(0, 4)

export const Categories = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={[typographyStyles.title2, baseStyles.container, { paddingVertical: 12 }]}>
                <FormattedMessage defaultMessage={'Категории'} id={'categoriesTitle'} />
            </Text>

            <FlatList
                data={CATEGORIES_LIST}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <Category
                            color={item.color}
                            icon={item.icon}
                            limit={item.id === 'cafe' ? 20000 : undefined}
                            title={item.title}
                            value={random(500, 100000, true)}
                        />
                    </TouchableOpacity>
                )}
                style={baseStyles.container}
            />
        </View>
    )
}
