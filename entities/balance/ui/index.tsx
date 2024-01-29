import { AntDesign } from '@expo/vector-icons'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS } from '@/shared/constants'
import { baseStyles, typographyStyles } from '@/shared/styles'
import { Button } from '@/shared/uikit'

import { Address } from './Address'
import { Pnl } from './Pnl'

export const Balance = () => {
    return (
        <View style={[baseStyles.container, styles.container]}>
            <View style={styles.header}>
                <Text style={[typographyStyles.subhedline, { color: COLORS.secondary }]}>
                    <FormattedMessage defaultMessage={'Мой кошелек'} id={'myWallet'} />
                </Text>

                <Address value={'AgOVBaqrHIV5TmJtBzg+/dew66hkaZeQcDDb/PCq3qI='} />
            </View>

            <View style={styles.amount}>
                <Text style={typographyStyles.largeTitle}>
                    <FormattedNumber currency={'RUB'} style={'currency'} value={54292.79} />
                </Text>

                <Pnl value={0.12} />
            </View>

            <View style={{ flexDirection: 'row', gap: 16, marginTop: 16 }}>
                <Button
                    iconStart={<AntDesign color={COLORS.white} name={'arrowup'} size={24} />}
                    size={'medium'}
                    styles={{ flexGrow: 1 }}
                    type={'primary'}
                >
                    Отправить
                </Button>

                <Button
                    iconStart={<AntDesign color={COLORS.white} name={'qrcode'} size={24} />}
                    size={'medium'}
                    styles={{ flexGrow: 1 }}
                    type={'primary'}
                >
                    Получить
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    amount: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'space-between',
        marginTop: 8,
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 6,
    },
})
