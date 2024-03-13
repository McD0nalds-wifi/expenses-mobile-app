import { random } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { CATEGORIES, Category } from '@/entities/category'
import { COLORS } from '@/shared/constants'
import { baseStyles, typographyStyles } from '@/shared/styles'
import { Balances } from '@/widgets/balances'
import { Goals } from '@/widgets/goals'

const CATEGORIES_LIST = Object.values(CATEGORIES).slice(0, 4)

const Page = () => {
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <ScrollView>
                <Balances />

                <View style={{ flex: 1 }}>
                    <Text style={[typographyStyles.title2, baseStyles.container, { paddingBottom: 12 }]}>
                        <FormattedMessage defaultMessage='Категории' id='2hGz++' />
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

                <View style={{ height: 8 }} />

                <Goals />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Page
