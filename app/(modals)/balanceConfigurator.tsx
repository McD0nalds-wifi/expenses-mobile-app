import { useState } from 'react'

import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { FormattedMessage } from 'react-intl'
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native'

import { COLORS } from '@/shared/constants'
import { baseStyles, typographyStyles } from '@/shared/styles'
import { Button } from '@/shared/uikit'

const BalanceConfigurator = () => {
    const { back } = useRouter()

    const [balance, setBalance] = useState('')

    const handleBalanceInputChange = (value: string) => {
        setBalance(value.replaceAll(',', ''))
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[baseStyles.container, styles.container]}
        >
            <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <View style={styles.header}>
                        <Text style={[typographyStyles.headline, { color: COLORS.primary }]}>
                            <FormattedMessage defaultMessage={'Добавление счета'} id={'addingInvoice'} />
                        </Text>

                        <TouchableOpacity onPress={back} style={{ position: 'absolute', right: 0, top: 24 }}>
                            <View style={baseStyles.iconButton}>
                                <AntDesign name={'close'} size={20} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.currency}>
                            <View style={styles.currencySign}>
                                <Text style={[typographyStyles.body, { color: COLORS.white }]}>₽</Text>
                            </View>

                            <Text style={[typographyStyles.title3, { color: COLORS.secondary }]}>РУБ</Text>
                        </View>

                        <TextInput
                            inputMode={'numeric'}
                            onChangeText={handleBalanceInputChange}
                            placeholder={'Введите сумму'}
                            placeholderTextColor={COLORS.tertiary}
                            style={styles.input}
                            value={balance.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />

                        <Button size={'small'} style={{ marginTop: 32 }} type={'secondary'}>
                            Банковский счет
                        </Button>
                    </View>

                    <Button size={'large'} style={{ marginTop: 'auto' }} type={'primary'}>
                        Добавить счет
                    </Button>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    content: { alignItems: 'center', justifyContent: 'center', marginTop: 88 },
    currency: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        marginBottom: 10,
    },
    currencySign: {
        alignItems: 'center',
        backgroundColor: COLORS.orange,
        borderRadius: 40,
        elevation: 12,
        height: 24,
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: {
            height: 6,
            width: 0,
        },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        width: 24,
    },
    header: {
        alignItems: 'center',
        paddingBottom: 24,
        paddingTop: 32,
        position: 'relative',
    },
    inner: {
        flex: 1,
        paddingBottom: 74,
    },
    input: {
        color: COLORS.primary,
        fontFamily: 'sf-b',
        fontSize: 42,
    },
})

export default BalanceConfigurator
