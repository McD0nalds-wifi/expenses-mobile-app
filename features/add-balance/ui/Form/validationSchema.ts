import { IntlFormatters } from 'react-intl'
import * as yup from 'yup'

import { BalanceType } from '@/entities/balance'

export interface IAddBalanceFormData {
    amount: number
    balanceType: BalanceType
    name: string
}

export const generateValidationSchema = (formatMessage: IntlFormatters['formatMessage']) =>
    yup.object({
        amount: yup.number().required(formatMessage({ defaultMessage: 'Укажите текущий баланс', id: '2MpD55' })),
        balanceType: yup
            .mixed<BalanceType>()
            .oneOf(['bankAccount', 'cash'])
            .required(formatMessage({ defaultMessage: 'Укажите тип баланса', id: 'DfKXeO' })),
        name: yup.string().required(formatMessage({ defaultMessage: 'Введите название счета', id: 'aZQIZF' })),
    })
