import { useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

const Item = () => {
    const { id } = useLocalSearchParams<{ id: string }>()

    return (
        <View>
            <Text>{id}</Text>
        </View>
    )
}

export default Item
