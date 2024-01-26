import { Stack } from 'expo-router'
import { View } from 'react-native'

import { Header } from '@/widgets/header'

const Page = () => {
    return (
        <View style={{ flex: 1, marginTop: 80 }}>
            <Stack.Screen options={{ header: () => <Header /> }} />
        </View>
    )
}

export default Page
