import { ReactNode } from 'react'

import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'

import { COLORS } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

interface IButtonProps {
    children: string
    iconEnd?: ReactNode
    iconStart?: ReactNode
    onPress?: () => void
    size: 'large' | 'medium' | 'small'
    style?: StyleProp<ViewStyle>
    type: 'primary' | 'secondary'
}

const TEXT_COLOR_BY_TYPE = {
    primary: COLORS.white,
    secondary: COLORS.primary,
} as const

export const Button = ({ children, iconEnd, iconStart, onPress, size, style, type }: IButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={[buttonsStyles[type], buttonsStyles[size], style]}>
            {iconStart}

            <Text style={{ ...typographyStyles.headline, color: TEXT_COLOR_BY_TYPE[type] }}>{children}</Text>

            {iconEnd}
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
        elevation: 20,
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: {
            height: 10,
            width: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 20,
    },
    secondary: {
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 120,
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
    },
    small: {
        paddingHorizontal: 21,
        paddingVertical: 11,
    },
})
