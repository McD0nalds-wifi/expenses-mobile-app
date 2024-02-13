import { random } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { Text, TouchableOpacity, View } from 'react-native'

import { CATEGORIES, Category } from '@/entities/category'
import { baseStyles, typographyStyles } from '@/shared/styles'

const CATEGORIES_LIST = Object.values(CATEGORIES).slice(0, 4)

export const Categories = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={[typographyStyles.title2, baseStyles.container, { paddingBottom: 12 }]}>
                <FormattedMessage defaultMessage={'Категории'} id={'categoriesTitle'} />
            </Text>

            <View style={baseStyles.container}>
                {CATEGORIES_LIST.map(({ color, icon, id, title }) => (
                    <TouchableOpacity key={id}>
                        <Category
                            color={color}
                            icon={icon}
                            limit={id === 'cafe' ? 20000 : undefined}
                            title={title}
                            value={random(500, 100000, true)}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}
