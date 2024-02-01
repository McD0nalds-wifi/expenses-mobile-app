import { Stack } from 'expo-router'
import { Text, View } from 'react-native'

import { Operation } from '@/entities/operation'
import { baseStyles } from '@/shared/styles'
import { CATEGORIES } from '@/widgets/categories/config'
import { Header } from '@/widgets/header'

const Operations = () => {
    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{ header: () => <Header /> }} />

            <View style={[baseStyles.container, { backgroundColor: 'white' }]}>
                <Operation
                    bankName={'Тинькофф'}
                    color={CATEGORIES.transport.color}
                    icon={CATEGORIES.transport.icon}
                    subtitle={CATEGORIES.transport.title}
                    title={'Проезд в автобусе'}
                    value={200}
                />
            </View>
        </View>
    )
}

export default Operations
