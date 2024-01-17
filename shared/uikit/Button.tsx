import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { COLORS } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

interface IButtonProps {
    children: string
    onPress?: () => void
    type: 'primary' | 'secondary' | 'tertiary'
}

const BUTTON_COLOR_BY_TYPE = {
    primary: COLORS.shade01,
    secondary: COLORS.shade01,
    tertiary: COLORS.shade02,
} as const

export const Button = ({ children, onPress, type }: IButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={buttonsStyles[type]}>
            <Text style={{ ...typographyStyles.body13Bold, color: BUTTON_COLOR_BY_TYPE[type] }}>{children}</Text>
        </TouchableOpacity>
    )
}

const buttonsStyles = StyleSheet.create({
    primary: {
        alignItems: 'center',
        backgroundColor: COLORS.primary01,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        maxWidth: 'auto',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    secondary: {
        alignItems: 'center',
        backgroundColor: COLORS.shade02,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    tertiary: {
        alignItems: 'center',
        backgroundColor: COLORS.shade02,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
})
