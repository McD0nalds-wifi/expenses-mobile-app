import { StyleSheet } from 'react-native'

import { COLORS } from '@/shared/constants'

export const baseStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    iconButton: {
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 40,
        elevation: 12,
        height: 40,
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: {
            height: 6,
            width: 0,
        },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        width: 40,
    },
})
