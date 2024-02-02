import { AntDesign } from '@expo/vector-icons'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS, CURRENT_CURRENCY } from '@/shared/constants'
import { baseStyles, typographyStyles } from '@/shared/styles'
import { Button } from '@/shared/uikit'

import { BankName } from './BankName'

export const Balance = () => {
    return (
        <View style={[baseStyles.container, styles.container]}>
            <View style={styles.header}>
                <Text style={[typographyStyles.subhedline, { color: COLORS.secondary }]}>
                    <FormattedMessage defaultMessage={'Мой кошелек'} id={'myWallet'} />
                </Text>

                <BankName name={'Тинькофф'} />
            </View>

            <View style={styles.amount}>
                <Text style={typographyStyles.largeTitle}>
                    <FormattedNumber currency={CURRENT_CURRENCY} style={'currency'} value={54292.79} />
                </Text>

                {/*<Pnl value={0.12} />*/}
            </View>

            <View style={{ flexDirection: 'row', gap: 16, marginTop: 16 }}>
                <Button
                    iconStart={<AntDesign color={COLORS.white} name={'minus'} size={24} />}
                    size={'medium'}
                    style={{ flexGrow: 1 }}
                    type={'primary'}
                >
                    Потратить
                </Button>

                <Button
                    iconStart={<AntDesign color={COLORS.white} name={'plus'} size={24} />}
                    size={'medium'}
                    style={{ flexGrow: 1 }}
                    type={'primary'}
                >
                    Пополнить
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
