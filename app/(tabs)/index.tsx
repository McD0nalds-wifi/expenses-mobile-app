import { Stack } from 'expo-router'
import { SafeAreaView, ScrollView, View } from 'react-native'

import { Balance } from '@/entities/balance'
import { COLORS } from '@/shared/constants'
import { Categories } from '@/widgets/categories'
import { Goals } from '@/widgets/goals'
import { Header } from '@/widgets/header'

const Page = () => {
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <ScrollView>
                <Header />

                <View style={{ height: 16 }} />

                <Balance />

                <Categories />

                <View style={{ height: 8 }} />

                <Goals />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Page
