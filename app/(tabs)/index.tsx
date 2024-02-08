import { SafeAreaView, ScrollView, View } from 'react-native'

import { COLORS } from '@/shared/constants'
import { Balances } from '@/widgets/balances'
import { Categories } from '@/widgets/categories'
import { Goals } from '@/widgets/goals'

const Page = () => {
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <ScrollView>
                <Balances />

                <Categories />

                <View style={{ height: 8 }} />

                <Goals />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Page
