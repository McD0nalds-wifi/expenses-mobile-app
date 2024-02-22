import { IntlFormatters } from 'react-intl'
import * as yup from 'yup'

export interface IAddOperationFormData {
    amount: number
    category: string
    date: Date
}

export const generateValidationSchema = (formatMessage: IntlFormatters['formatMessage']) =>
    yup.object({
        amount: yup.number().required(formatMessage({ defaultMessage: 'Укажите сумму', id: 'JIpWcR' })),
        category: yup.string().required(formatMessage({ defaultMessage: 'Выберите категорию', id: 'yKKamR' })),
        date: yup.date().required(formatMessage({ defaultMessage: 'Укажите дату', id: 'UV2k83' })),
    })
