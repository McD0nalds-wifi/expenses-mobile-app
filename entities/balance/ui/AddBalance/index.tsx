import { AntDesign } from '@expo/vector-icons'
import { FormattedMessage } from 'react-intl'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

export const AddBalance = () => (
    <View style={styles.wrapper}>
        <AntDesign color={COLORS.secondary} name={'plus'} size={34} />

        <Text style={[typographyStyles.headline, { color: COLORS.secondary }]}>
            <FormattedMessage defaultMessage={'Добавить счет'} id={'addBalance'} />
        </Text>
    </View>
)

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 20,
        gap: 16,
        height: 140,
        justifyContent: 'center',
    },
})
