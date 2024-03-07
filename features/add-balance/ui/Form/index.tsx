import React, { ReactNode, useState } from 'react'

import { AntDesign } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

import { BalanceType } from '@/entities/balance/types'
import { COLORS } from '@/shared/constants'
import { baseStyles } from '@/shared/styles'
import { Button, Chips, TextInput } from '@/shared/uikit'

import { IAddBalanceFormData, generateValidationSchema } from './validationSchema'
import { BALANCE_TYPES, CHIPS_ITEMS } from '../../config'

interface IFormProps {
    headerSlot?: ReactNode
    onSubmit: (data: IAddBalanceFormData) => void
}

export const Form = ({ headerSlot, onSubmit }: IFormProps) => {
    const { formatMessage } = useIntl()

    const [balanceType, setBalanceType] = useState<BalanceType>('bankAccount')

    const {
        formState: { errors },
        handleSubmit,
        register,
        setValue,
    } = useForm<IAddBalanceFormData>({
        defaultValues: { amount: undefined, name: undefined },
        mode: 'onChange',
        resolver: yupResolver(generateValidationSchema(formatMessage)),
    })

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[baseStyles.container, styles.container]}
        >
            <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {headerSlot}

                    <View style={styles.chips}>
                        <Chips
                            activeItem={BALANCE_TYPES[balanceType]}
                            items={CHIPS_ITEMS}
                            onChange={({ id }) => setBalanceType(id)}
                        />
                    </View>

                    <View style={styles.form}>
                        <TextInput
                            autoCapitalize='none'
                            error={errors?.name?.message}
                            label='Название счета'
                            placeholder='Мой счет'
                            {...register('name')}
                            onChangeText={(value) => setValue('name', value, { shouldValidate: true })}
                        />

                        <TextInput
                            error={errors?.amount?.message}
                            inputMode='numeric'
                            label='Текущий баланс'
                            placeholder='0 руб'
                            {...register('amount')}
                            onChangeText={(value) => setValue('amount', Number(value), { shouldValidate: true })}
                        />

                        {balanceType === 'bankAccount' ? (
                            <TextInput
                                editable={false}
                                icon={<AntDesign color={COLORS.secondary} name='down' size={24} />}
                                label='Выберите банк'
                                placeholder='Тинькофф'
                            />
                        ) : null}
                    </View>

                    <Button onPress={handleSubmit(onSubmit)} size='large' style={{ marginTop: 'auto' }} type='primary'>
                        <FormattedMessage defaultMessage='Добавить счет' id='HAxc4k' />
                    </Button>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    chips: {
        marginTop: 40,
    },
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    form: {
        alignItems: 'center',
        gap: 20,
        justifyContent: 'center',
        marginTop: 40,
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
