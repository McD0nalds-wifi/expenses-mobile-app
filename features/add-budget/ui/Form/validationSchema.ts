import { IntlFormatters } from 'react-intl'
import * as yup from 'yup'

export interface IAddBudgetFormData {
    category: string
    limit: number
}

export const generateValidationSchema = (formatMessage: IntlFormatters['formatMessage']) =>
    yup.object({
        category: yup.string().required(formatMessage({ defaultMessage: 'Выберите категорию', id: 'yKKamR' })),
        limit: yup.number().required(formatMessage({ defaultMessage: 'Укажите лимит', id: 'S8kgWV' })),
    })
