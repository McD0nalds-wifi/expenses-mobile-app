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
import { Button, TextInput } from '@/shared/uikit'

import { IAddBudgetFormData, generateValidationSchema } from './validationSchema'
import { useUpdateCategoryValue } from '../../hooks/useUpdateCategoryValue'

interface IFormProps {
    category: CategoryType | null
    headerSlot?: ReactNode
    onSubmit: (data: IAddBudgetFormData) => void
}

export const Form = ({ category, headerSlot, onSubmit }: IFormProps) => {
    const { push } = useRouter()
    const { formatMessage } = useIntl()

    const {
        formState: { errors },
        handleSubmit,
        register,
        setValue,
        watch,
    } = useForm<IAddBudgetFormData>({
        defaultValues: {
            category: category ? CATEGORIES[category].title : undefined,
            limit: undefined,
        },
        mode: 'onChange',
        resolver: yupResolver(generateValidationSchema(formatMessage)),
    })

    const categoryValue = watch('category')

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

                        <TextInput
                            error={errors?.limit?.message}
                            inputMode='numeric'
                            label='Лимит'
                            placeholder='0 руб'
                            {...register('limit')}
                            onChangeText={(value) => setValue('limit', Number(value), { shouldValidate: true })}
                        />
                    </View>

                    <Button onPress={handleSubmit(onSubmit)} size='large' style={{ marginTop: 'auto' }} type='primary'>
                        <FormattedMessage defaultMessage='Добавить' id='zXkVd5' />
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
