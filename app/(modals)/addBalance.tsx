import React from 'react'

import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { FormattedMessage } from 'react-intl'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { AddBalanceForm } from '@/features/add-balance'
import { COLORS } from '@/shared/constants'
// import { useTypedDispatch } from '@/shared/hooks'
import { baseStyles, typographyStyles } from '@/shared/styles'

const AddBalance = () => {
    const { back } = useRouter()
    // const dispatch = useTypedDispatch()

    // const handleSubmit = () => {
    //     dispatch(
    //         addBalance({
    //             amount: Number(balance.replace(',', '')),
    //             id: 2,
    //             name,
    //             type: 'bankAccount',
    //         }),
    //     )
    //
    //     back()
    // }

    return (
        <AddBalanceForm
            headerSlot={
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
            }
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 68,
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
        marginTop: 40,
    },
})

export default AddBalance
