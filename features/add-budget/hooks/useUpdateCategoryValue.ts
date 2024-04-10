import { useEffect } from 'react'

import { UseFormSetValue } from 'react-hook-form'

import { CATEGORIES, CategoryType } from '@/entities/category'

import { IAddBudgetFormData } from '../ui/Form/validationSchema'

export const useUpdateCategoryValue = (
    category: CategoryType | null,
    setValue: UseFormSetValue<IAddBudgetFormData>,
) => {
    useEffect(() => {
        if (!category || !CATEGORIES[category]) {
            return
        }

        setValue('category', CATEGORIES[category].title, { shouldValidate: true })
    }, [category, setValue])
}
