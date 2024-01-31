import { Stack } from 'expo-router'
import { View } from 'react-native'

import { Balance } from '@/entities/balance'
import { COLORS } from '@/shared/constants'
import { Categories } from '@/widgets/categories'
import { Header } from '@/widgets/header'

const Page = () => {
    return (
        <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <Stack.Screen options={{ header: () => <Header /> }} />

            <View style={{ height: 16 }} />

            <Balance />

            <Categories />
        </View>
    )
}

export default Page
