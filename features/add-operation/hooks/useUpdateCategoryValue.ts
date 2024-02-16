import { useEffect } from 'react'

import { UseFormSetValue } from 'react-hook-form'

import { CATEGORIES, CategoryType } from '@/entities/category'

import { IAddOperationFormData } from '../ui/Form/validationSchema'

export const useUpdateCategoryValue = (
    category: CategoryType | undefined,
    setValue: UseFormSetValue<IAddOperationFormData>,
) => {
    useEffect(() => {
        if (!category || !CATEGORIES[category]) {
            return
        }

        setValue('category', CATEGORIES[category].title, { shouldValidate: true })
    }, [category])
}
