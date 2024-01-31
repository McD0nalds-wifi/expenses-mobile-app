import { StyleSheet, Text, View } from 'react-native'

import { COLORS } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

interface IBankNameProps {
    name: string
}

export const BankName = ({ name }: IBankNameProps) => (
    <View style={styles.container}>
        <Text style={[typographyStyles.footnote, { color: COLORS.secondary }]}>{name}</Text>
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
