import { ReactNode } from 'react'

import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'

// @ts-ignore
import ufoImage from '@/assets/images/ufo.png'
// @ts-ignore
import walletImage from '@/assets/images/wallet.png'
import { COLORS } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

interface IEmptyProps {
    action?: ReactNode
    description?: ReactNode
    iconVariant: 'wallet' | 'ufo'
    title?: ReactNode
}

const IMAGE_BY_ICON_VARIANT = {
    ufo: ufoImage as ImageSourcePropType,
    wallet: walletImage as ImageSourcePropType,
} as const

const IMAGE_DIMENSIONS_BY_ICON_VARIANT = {
    ufo: { height: 232, width: 208 },
    wallet: { height: 156, width: 256 },
} as const

export const Empty = ({ action, description, iconVariant, title }: IEmptyProps) => (
    <View style={styles.wrapper}>
        <Image
            source={IMAGE_BY_ICON_VARIANT[iconVariant]}
            style={{ ...IMAGE_DIMENSIONS_BY_ICON_VARIANT[iconVariant] }}
        />

        {title || description ? (
            <View style={{ gap: 12 }}>
                {title && (
                    <Text style={[typographyStyles.title2, { color: COLORS.primary, textAlign: 'center' }]}>
                        {title}
                    </Text>
                )}

                {description && (
                    <Text style={[typographyStyles.body, { color: COLORS.secondary, textAlign: 'center' }]}>
                        {description}
                    </Text>
                )}
            </View>
        ) : null}

        {action}
    </View>
)

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        flex: 1,
        gap: 32,
        justifyContent: 'center',
    },
})
