import React, { ReactNode } from 'react'

import { AntDesign } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

import { selectBalance } from '@/entities/balance'
import { CATEGORIES, CategoryType } from '@/entities/category'
import { OperationType } from '@/entities/operation'
import { COLORS } from '@/shared/constants'
import { useTypedSelector } from '@/shared/hooks'
import { ROUTES } from '@/shared/routes'
import { baseStyles } from '@/shared/styles'
import { Button, DateInput, TextInput } from '@/shared/uikit'

import { IAddOperationFormData, generateValidationSchema } from './validationSchema'
import { useUpdateCategoryValue } from '../../hooks/useUpdateCategoryValue'

interface IFormProps {
    balanceId: number
    category?: CategoryType
    headerSlot?: ReactNode
    operationType: OperationType
}

const TODAY = new Date()

export const Form = ({ balanceId, category, headerSlot, operationType }: IFormProps) => {
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

    const balance = useTypedSelector((state) => selectBalance(state, balanceId))

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
                        {balance && (
                            <TextInput
                                editable={false}
                                label='Название счета'
                                placeholder='Мой счет'
                                value={balance.name}
                            />
                        )}

                        <TextInput
                            error={errors?.amount?.message}
                            inputMode='numeric'
                            label='Сумма'
                            placeholder='0 руб'
                            {...register('amount')}
                            onChangeText={(value) => setValue('amount', Number(value), { shouldValidate: true })}
                        />

                        <TextInput
                            editable={false}
                            error={errors?.category?.message}
                            icon={<AntDesign color={COLORS.secondary} name='down' size={24} />}
                            label='Выберите категорию'
                            onTouchEnd={() => push(ROUTES.categoriesList.getRoute(balanceId, operationType))}
                            placeholder={CATEGORIES.car.title}
                            value={categoryValue}
                        />

                        <DateInput
                            error={errors?.date?.message}
                            icon={<AntDesign color={COLORS.secondary} name='calendar' size={24} />}
                            label='Укажите дату'
                            onChange={(value) => setValue('date', value, { shouldValidate: true })}
                            placeholder={formatDate(TODAY, { dateStyle: 'medium' })}
                            value={dateValue}
                        />

                        <TextInput
                            editable={false}
                            icon={<AntDesign color={COLORS.secondary} name='clockcircleo' size={24} />}
                            label='Укажите время'
                            placeholder={formatDate(TODAY, { timeStyle: 'short' })}
                        />
                    </View>

                    <Button
                        onPress={handleSubmit(
                            () => null,
                            () => null,
                        )}
                        size='large'
                        style={{ marginTop: 'auto' }}
                        type='primary'
                    >
                        Добавить счет
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
