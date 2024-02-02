import { LinearGradient } from 'expo-linear-gradient'
import { FormattedNumber } from 'react-intl'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'

import { COLORS, CURRENT_CURRENCY } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

interface IGoalProps {
    collected: number
    emoji: string
    gradientColors: Array<string>
    gradientLocations: Array<number>
    height?: number
    needToCollect: number
    title: string
    width?: number
}

export const Goal = ({
    collected,
    emoji,
    gradientColors,
    gradientLocations,
    height = 160,
    needToCollect,
    title,
    width = 160,
}: IGoalProps) => {
    const percent = Math.round((collected / needToCollect) * 100) / 100

    return (
        <View style={[styles.container, { height, width }]}>
            <LinearGradient
                colors={gradientColors}
                locations={gradientLocations}
                start={{ x: 0.01, y: 1 }}
                style={[styles.gradient, { width }]}
            />
            <View style={styles.card}>
                <Text style={[typographyStyles.headline, { color: COLORS.primary }]}>
                    <FormattedNumber currency={CURRENT_CURRENCY} style={'currency'} value={collected} />
                </Text>

                <Text style={[typographyStyles.footnote, { color: COLORS.secondary }]}>{title}</Text>

                <View style={styles.footer}>
                    <View style={styles.chip}>
                        <Text style={[typographyStyles.captionBold, { color: COLORS.green }]}>
                            <FormattedNumber minimumFractionDigits={2} style={'percent'} value={percent} />
                        </Text>
                    </View>

                    <Text style={[typographyStyles.headline]}>{emoji}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        flex: 1,
        padding: 16,
    },
    chip: {
        backgroundColor: 'rgba(50, 177, 83, 0.1)',
        borderRadius: 120,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    container: {
        elevation: 16,
        position: 'relative',
        shadowColor: COLORS.primary,
        shadowOffset: {
            height: 8,
            width: 0,
        },
        shadowOpacity: 0.16,
        shadowRadius: 20,
    },
    footer: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },
    gradient: {
        borderRadius: 20,
        height: 76,
        position: 'absolute',
        top: -2,
        zIndex: -1,
    },
})
