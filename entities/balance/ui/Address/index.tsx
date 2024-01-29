import { StyleSheet, Text, View } from 'react-native'

import { COLORS } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

interface IAddressProps {
    value: string
}

const convertValue = (value: string) => {
    const reverseValue = value.split('').reverse().join('')

    return `${value.slice(0, 4)}...${reverseValue.slice(0, 4)}`
}

export const Address = ({ value }: IAddressProps) => (
    <View style={styles.container}>
        <Text style={[typographyStyles.footnote, { color: COLORS.secondary }]}>{convertValue(value)}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        borderRadius: 120,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
})
