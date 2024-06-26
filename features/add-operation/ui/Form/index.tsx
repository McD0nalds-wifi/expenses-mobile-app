import React, { ReactNode } from 'react'

import { AntDesign } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

import { CATEGORIES, CategoryType } from '@/entities/category'
import { COLORS } from '@/shared/constants'
import { ROUTES } from '@/shared/routes'
import { baseStyles } from '@/shared/styles'
import { Button, DateInput, TextInput } from '@/shared/uikit'

import { IAddOperationFormData, generateValidationSchema } from './validationSchema'
import { useUpdateCategoryValue } from '../../hooks/useUpdateCategoryValue'

interface IFormProps {
    balanceTitle?: string
    category: CategoryType | null
    headerSlot?: ReactNode
    onSubmit: (data: IAddOperationFormData) => void
}

const TODAY = new Date()

export const Form = ({ balanceTitle, category, headerSlot, onSubmit }: IFormProps) => {
    const { push } = useRouter()
    const { formatMessage, formatDate } = useIntl()

    const {
        formState: { errors },
        handleSubmit,
        register,
        setValue,
        watch,
    } = useForm<IAddOperationFormData>({
        defaultValues: {
            amount: undefined,
            category: category ? CATEGORIES[category].title : undefined,
            date: TODAY,
        },
        mode: 'onChange',
        resolver: yupResolver(generateValidationSchema(formatMessage)),
    })

    const categoryValue = watch('category')
    const dateValue = watch('date')

    useUpdateCategoryValue(category, setValue)

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[baseStyles.container, styles.container]}
        >
            <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {headerSlot}

                    <View style={styles.form}>
                        {balanceTitle && (
                            <TextInput
                                editable={false}
                                icon={<AntDesign color={COLORS.secondary} name='down' size={24} />}
                                label='Название счета'
                                onTouchEnd={() => push(ROUTES.balancesList.getRoute())}
                                placeholder='Мой счет'
                                value={balanceTitle}
                            />
                        )}

                        <View style={styles.space} />

                        <TextInput
                            error={errors?.amount?.message}
                            inputMode='numeric'
                            label='Сумма'
                            placeholder='0 руб'
                            {...register('amount')}
                            onChangeText={(value) => setValue('amount', Number(value), { shouldValidate: true })}
                        />

                        <View style={styles.space} />

                        <TextInput
                            editable={false}
                            error={errors?.category?.message}
                            icon={<AntDesign color={COLORS.secondary} name='down' size={24} />}
                            label='Выберите категорию'
                            onTouchEnd={() => push(ROUTES.categoriesList.getRoute())}
                            placeholder={CATEGORIES.car.title}
                            value={categoryValue}
                        />

                        <View style={styles.space} />

                        <DateInput
                            error={errors?.date?.message}
                            icon={<AntDesign color={COLORS.secondary} name='calendar' size={24} />}
                            label='Укажите дату'
                            onChange={(value) => setValue('date', value, { shouldValidate: true })}
                            placeholder={formatDate(TODAY, { dateStyle: 'medium' })}
                            value={dateValue}
                        />
                    </View>

                    <Button onPress={handleSubmit(onSubmit)} size='large' style={{ marginTop: 'auto' }} type='primary'>
                        <FormattedMessage defaultMessage='Добавить операцию' id='txEjRe' />
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
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    inner: {
        flex: 1,
        paddingBottom: 74,
    },
    space: { height: 20 },
})
