import React, { ReactNode, forwardRef } from 'react'

import { StyleSheet, Text, TextInput as TextInputBase, TextInputProps as TextInputBaseProps, View } from 'react-native'

import { COLORS } from '@/shared/constants'
import { useBoolean } from '@/shared/hooks'
import { typographyStyles } from '@/shared/styles'

interface ITextInputProps extends TextInputBaseProps {
    error?: string
    icon?: ReactNode
    label: ReactNode
    placeholder: string
}

export const TextInput = forwardRef<TextInputBase, ITextInputProps>(({ error, icon, label, ...props }, ref) => {
    const { value: focused, setTrue: setFocused, setFalse: setUnfocused } = useBoolean(false)

    return (
        <View style={styles.wrapper}>
            <Text
                style={[
                    typographyStyles.caption,
                    { color: focused ? COLORS.primary : COLORS.secondary, marginBottom: 6 },
                ]}
            >
                {label}
            </Text>

            <TextInputBase
                // onBlur={setUnfocused}
                // onFocus={setFocused}
                placeholderTextColor={COLORS.tertiary}
                ref={ref}
                style={[
                    typographyStyles.body,
                    styles.textInput,
                    { borderBottomColor: focused ? COLORS.primary : COLORS.tertiary },
                ]}
                {...props}
            />

            <Text style={[typographyStyles.caption, { color: COLORS.red, height: 16, marginTop: 6 }]}>{error}</Text>

            {icon ? <View style={styles.icon}>{icon}</View> : null}
        </View>
    )
})

TextInput.displayName = 'TextInput'

const styles = StyleSheet.create({
    icon: {
        bottom: 32,
        position: 'absolute',
        right: 0,
    },
    textInput: {
        borderBottomWidth: 1,
        color: COLORS.primary,
        paddingBottom: 10,
    },
    wrapper: {
        position: 'relative',
        width: '100%',
    },
})
