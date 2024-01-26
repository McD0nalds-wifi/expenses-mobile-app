import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { COLORS } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

interface IButtonProps {
    children: string
    onPress?: () => void
    size: 'large' | 'medium' | 'small'
    type: 'primary' | 'secondary'
}

const TEXT_COLOR_BY_TYPE = {
    primary: COLORS.white,
    secondary: COLORS.primary,
} as const

export const Button = ({ children, onPress, size, type }: IButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={[buttonsStyles[type], buttonsStyles[size]]}>
            <Text style={{ ...typographyStyles.headline, color: TEXT_COLOR_BY_TYPE[type] }}>{children}</Text>
        </TouchableOpacity>
    )
}

const buttonsStyles = StyleSheet.create({
    large: {
        paddingHorizontal: 24,
        paddingVertical: 14,
    },
    medium: {
        paddingHorizontal: 22,
        paddingVertical: 12,
    },
    primary: {
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 120,
        boxShadow: '0px 10px 24px 0px rgba(43, 45, 51, 0.20)',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    secondary: {
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 120,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    small: {
        paddingHorizontal: 21,
        paddingVertical: 11,
    },
})
