import { AntDesign } from '@expo/vector-icons'
import { FormattedMessage } from 'react-intl'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

interface IAddGoalProps {
    height?: number
    width?: number
}

export const AddGoal = ({ height = 160, width = 160 }: IAddGoalProps) => {
    return (
        <View style={[styles.container, { height, width }]}>
            <AntDesign color={COLORS.secondary} name='plus' size={24} />

            <Text style={[typographyStyles.footnoteBold, { color: COLORS.secondary }]}>
                <FormattedMessage defaultMessage='Добавить цель' id='mGmEiC' />
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 20,
        gap: 4,
        justifyContent: 'center',
    },
})
