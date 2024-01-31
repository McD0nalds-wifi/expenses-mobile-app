import { Stack } from 'expo-router'
import { Text, View } from 'react-native'

import { Header } from '@/widgets/header'

const Operations = () => {
    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{ header: () => <Header /> }} />

            <Text>Траты за январь</Text>
        </View>
    )
}

export default Operations
