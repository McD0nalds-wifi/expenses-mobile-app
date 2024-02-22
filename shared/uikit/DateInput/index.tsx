import React, { ReactNode, useRef } from 'react'

import DateTimePicker from '@react-native-community/datetimepicker'
import { noop } from 'lodash'
import { useIntl } from 'react-intl'
import { Modal, Pressable, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

import { COLORS } from '@/shared/constants'
import { useBoolean } from '@/shared/hooks'

import { TextInput } from '../TextInput'

interface IDateInputProps {
    error?: string
    icon?: ReactNode
    label: ReactNode
    onChange?: (date: Date) => void
    placeholder: string
    value?: Date
}

export const DateInput = ({ error, icon, label, onChange = noop, placeholder, value }: IDateInputProps) => {
    const { formatDate } = useIntl()

    const ref = useRef<View>(null)

    const { value: datePickerVisible, setTrue: showDatePicker, setFalse: hideDatePicker } = useBoolean()

    return (
        <>
            <Pressable onTouchStart={showDatePicker} style={{ width: '100%' }}>
                <TextInput
                    editable={false}
                    error={error}
                    icon={icon}
                    label={label}
                    placeholder={placeholder}
                    value={value ? formatDate(value, { dateStyle: 'medium' }) : undefined}
                />
            </Pressable>

            <Modal
                animationType={'fade'}
                onRequestClose={hideDatePicker}
                transparent={true}
                visible={datePickerVisible}
            >
                <TouchableWithoutFeedback onPress={hideDatePicker}>
                    <View style={styles.centeredView}>
                        <View ref={ref} style={styles.modalView}>
                            <DateTimePicker
                                display={'spinner'}
                                locale={'ru'}
                                mode={'date'}
                                onChange={(_, date) => (date ? onChange(date) : null)}
                                textColor={COLORS.primary}
                                value={value ?? new Date()}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },
    modalView: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 5,
        margin: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            height: 2,
            width: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
})
