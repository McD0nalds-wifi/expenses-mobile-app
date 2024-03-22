import { FormattedMessage } from 'react-intl'
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'

// @ts-ignore
import walletImage from '@/assets/images/wallet.png'
import { COLORS } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

export const EmptyState = () => (
    <View style={styles.wrapper}>
        <Image source={walletImage as ImageSourcePropType} style={{ height: 156, width: 256 }} />

        <View style={{ gap: 12 }}>
            <Text style={[typographyStyles.title2, { color: COLORS.primary, textAlign: 'center' }]}>
                <FormattedMessage defaultMessage='Нет операций' id='AFqHBG' />
            </Text>

            <Text style={[typographyStyles.body, { color: COLORS.secondary, textAlign: 'center' }]}>
                <FormattedMessage defaultMessage='Вы еще не сделали ни одной операции.' id='fvLsMA' />
            </Text>
        </View>
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
