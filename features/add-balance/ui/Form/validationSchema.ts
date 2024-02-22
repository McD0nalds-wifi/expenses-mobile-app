import { IntlFormatters } from 'react-intl'
import * as yup from 'yup'

export interface IAddBalanceFormData {
    amount: number
    name: string
}

export const generateValidationSchema = (formatMessage: IntlFormatters['formatMessage']) =>
    yup.object({
        amount: yup
            .number()
            .required(formatMessage({ defaultMessage: 'Укажите текущий баланс', id: '2MpD55' })),
        name: yup
            .string()
            .required(formatMessage({ defaultMessage: 'Введите название счета', id: 'aZQIZF' })),
    })
