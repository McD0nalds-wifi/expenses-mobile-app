import React, { ReactNode } from 'react'

import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { COLORS } from '@/shared/constants'
import { baseStyles, typographyStyles } from '@/shared/styles'

interface IModalHeaderProps {
    onBack?: () => void
    onClose?: () => void
    title: ReactNode
}

export const ModalHeader = ({ onBack, onClose, title }: IModalHeaderProps) => (
    <View style={styles.header}>
        {onBack && (
            <TouchableOpacity onPress={onBack} style={{ left: 0, position: 'absolute', top: 24 }}>
                <View style={baseStyles.iconButton}>
                    <AntDesign name='left' size={20} />
                </View>
            </TouchableOpacity>
        )}

        <Text style={[typographyStyles.headline, { color: COLORS.primary }]}>{title}</Text>

        {onClose && (
            <TouchableOpacity onPress={onClose} style={{ position: 'absolute', right: 0, top: 24 }}>
                <View style={baseStyles.iconButton}>
                    <AntDesign name='close' size={20} />
                </View>
            </TouchableOpacity>
        )}
    </View>
)

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingBottom: 24,
        paddingTop: 32,
        position: 'relative',
    },
})
