import { FormattedMessage } from 'react-intl'
import { SafeAreaView, Text, View } from 'react-native'

import { Budget } from '@/entities/budget'
import { baseStyles, typographyStyles } from '@/shared/styles'

const Plan = () => {
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={baseStyles.container}>
                <Text style={[typographyStyles.title2, { paddingBottom: 12 }]}>
                    <FormattedMessage defaultMessage='Бюджеты' id='KoXeiY' />
                </Text>

                <View style={{ marginTop: 20 }}>
                    <Budget amount={12000} categoryType='car' limit={20000} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Plan
