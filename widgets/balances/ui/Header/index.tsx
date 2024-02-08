import { Fragment } from 'react'

import { AntDesign } from '@expo/vector-icons'
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native'

// @ts-ignore
import defaultAvatar from '@/assets/images/nyan-cat.png'
import { COLORS, CONTAINER_PADDING } from '@/shared/constants'
import { baseStyles } from '@/shared/styles'

interface IHeaderProps {
    currentIndicatorDotIndex: number
    indicatorDotsCount: number
}

const INDICATOR_PADDING = 12
const DOT_SIZE = 8
const DOTS_GAP = 12

const getIndicatorWidth = (indicatorDotsCount: number) => {
    return INDICATOR_PADDING * 2 + DOT_SIZE * indicatorDotsCount + DOTS_GAP * (indicatorDotsCount - 1)
}

export const Header = ({ currentIndicatorDotIndex, indicatorDotsCount }: IHeaderProps) => {
    return (
        <Fragment>
            <View style={styles.avatarWrapper}>
                <TouchableOpacity style={styles.avatar}>
                    <Image
                        source={defaultAvatar as ImageSourcePropType}
                        style={{ borderRadius: 40, height: 40, width: 40 }}
                    />
                </TouchableOpacity>
            </View>

            {indicatorDotsCount > 0 ? (
                <View
                    style={[
                        styles.indicatorWrapper,
                        {
                            transform: [
                                {
                                    translateX: -(getIndicatorWidth(indicatorDotsCount) / 2),
                                },
                            ],
                        },
                    ]}
                >
                    <View style={[styles.indicator, { gap: DOTS_GAP, padding: INDICATOR_PADDING }]}>
                        {Array.from({ length: indicatorDotsCount }).map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.indicatorDot,
                                    {
                                        backgroundColor:
                                            index === currentIndicatorDotIndex ? COLORS.primary : COLORS.tertiary,
                                        height: DOT_SIZE,
                                        width: DOT_SIZE,
                                    },
                                ]}
                            />
                        ))}
                    </View>
                </View>
            ) : null}

            <View style={styles.iconButtonWrapper}>
                <TouchableOpacity style={baseStyles.iconButton}>
                    <AntDesign color={COLORS.primary} name={'scan1'} size={20} />
                </TouchableOpacity>
            </View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    avatar: {
        elevation: 16,
        shadowColor: COLORS.primary,
        shadowOffset: {
            height: 8,
            width: 0,
        },
        shadowOpacity: 0.16,
        shadowRadius: 20,
    },
    avatarWrapper: {
        left: CONTAINER_PADDING,
        position: 'absolute',
        top: 8,
        zIndex: 9,
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    iconButtonWrapper: {
        position: 'absolute',
        right: CONTAINER_PADDING,
        top: 8,
        zIndex: 9,
    },
    indicator: {
        backgroundColor: COLORS.background,
        borderRadius: 120,
        flexDirection: 'row',
    },
    indicatorDot: {
        borderRadius: 120,
    },
    indicatorWrapper: {
        left: '50%',
        position: 'absolute',
        top: 12,
        zIndex: 9,
    },
})
