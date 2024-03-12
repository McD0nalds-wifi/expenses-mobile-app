import { StyleSheet, Text, View } from 'react-native'

import { COLORS } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

interface IBadgeProps {
    title: string
}

export const Badge = ({ title }: IBadgeProps) => (
    <View style={styles.container}>
        <Text style={[typographyStyles.footnote, { color: COLORS.secondary }]}>{title}</Text>
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
