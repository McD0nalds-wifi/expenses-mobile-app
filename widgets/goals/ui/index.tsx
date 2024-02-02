import { FormattedMessage } from 'react-intl'
import { Text, View, useWindowDimensions } from 'react-native'

import { AddGoal, Goal } from '@/entities/goal'
import { CONTAINER_PADDING } from '@/shared/constants'
import { baseStyles, typographyStyles } from '@/shared/styles'

const CARDS_GAP = 16

export const Goals = () => {
    const { width } = useWindowDimensions()

    const cardSize = (width - CONTAINER_PADDING * 2 - CARDS_GAP) / 2

    return (
        <View style={{ flex: 1 }}>
            <Text style={[typographyStyles.title2, baseStyles.container, { paddingVertical: 12 }]}>
                <FormattedMessage defaultMessage={'Цели'} id={'goalsTitle'} />
            </Text>

            <View
                style={[
                    baseStyles.container,
                    {
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: CARDS_GAP,
                        justifyContent: 'space-between',
                        marginTop: 8,
                    },
                ]}
            >
                <Goal
                    collected={20000}
                    emoji={'🏠'}
                    gradientColors={['#15ABFF', '#00EE6E']}
                    gradientLocations={[0.9, 0.1]}
                    height={cardSize}
                    needToCollect={100000}
                    title={'Новый дом'}
                    width={cardSize}
                />

                <Goal
                    collected={20000}
                    emoji={'🏠'}
                    gradientColors={['#2173FF', '#FF1BE8', '#FF9D2F']}
                    gradientLocations={[0.1, 0.6, 1]}
                    height={cardSize}
                    needToCollect={100000}
                    title={'Новый дом'}
                    width={cardSize}
                />

                <AddGoal height={cardSize} width={cardSize} />
            </View>
        </View>
    )
}
