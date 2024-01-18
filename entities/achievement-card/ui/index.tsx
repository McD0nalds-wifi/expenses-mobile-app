import { AntDesign } from '@expo/vector-icons'
import { noop } from 'lodash'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { COLORS } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

interface IAchievementCardProps {
    description: string
    favorite: boolean
    image: string
    onFavoriteChange?: (favorite: boolean) => void
    peopleWithAchievementInPercent: number
    points: number
    title: string
}

const declOfNum = (number: number, words: Array<string>) => {
    return words[
        number % 100 > 4 && number % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
    ]
}

export const AchievementCard = ({
    description,
    favorite,
    image,
    onFavoriteChange = noop,
    peopleWithAchievementInPercent,
    points,
    title,
}: IAchievementCardProps) => {
    const handleFavoriteIconPress = () => {
        onFavoriteChange(!favorite)
    }

    return (
        <TouchableOpacity>
            <View>
                <Image source={{ uri: image }} style={styles.image} />

                <TouchableOpacity onPress={handleFavoriteIconPress} style={styles.iconWrapper}>
                    <AntDesign
                        name={'heart'}
                        size={24}
                        style={{ color: favorite ? COLORS.primary01 : COLORS.shade02, opacity: 0.7 }}
                    />

                    <AntDesign
                        name={'hearto'}
                        size={24}
                        style={{ color: COLORS.shade01, position: 'absolute', right: 0, top: 0, zIndex: 9 }}
                    />
                </TouchableOpacity>

                <View style={styles.titleBlock}>
                    <Text style={[typographyStyles.body14Bold, { color: COLORS.shade02 }]}>{title}</Text>

                    <View style={{ alignItems: 'center', flexDirection: 'row', gap: 4 }}>
                        <AntDesign name={'checkcircle'} size={16} />

                        <Text style={[typographyStyles.body14Regular, { color: COLORS.shade02 }]}>
                            {peopleWithAchievementInPercent}%
                        </Text>
                    </View>
                </View>

                <Text style={[typographyStyles.body14Regular, { color: COLORS.neutral08 }]}>{description}</Text>

                <View style={styles.pointsBlock}>
                    <Text style={typographyStyles.body14Bold}>¥ {points}</Text>

                    <Text style={typographyStyles.body14Regular}>
                        {declOfNum(points, ['социальный', 'социальных', 'социальных'])}{' '}
                        {declOfNum(points, ['кредит', 'кредита', 'кредитов'])}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iconWrapper: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
    image: {
        backgroundColor: COLORS.neutral06,
        borderRadius: 12,
        height: 308,
        width: '100%',
    },
    pointsBlock: { flexDirection: 'row', gap: 4, marginTop: 8 },
    titleBlock: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        marginTop: 16,
    },
})
