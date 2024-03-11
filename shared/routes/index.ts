import { Href } from 'expo-router'

import { CategoryType } from '@/entities/category'
import { OperationType } from '@/entities/operation'

export const ROUTES = {
    addBalance: {
        getRoute: () => '/(modals)/addBalance' as Href<unknown>,
        name: '(modals)/addBalance',
    },
    addOperation: {
        getRoute: (balanceId: string, operationType: OperationType, category?: CategoryType) =>
            ({
                params: {
                    balanceId,
                    category,
                    operationType,
                },
                pathname: '/(modals)/addOperation',
            }) as Href<unknown>,
        name: '(modals)/addOperation',
    },
    categoriesList: {
        getRoute: (balanceId: string, operationType: OperationType) =>
            ({
                params: {
                    balanceId,
                    operationType,
                },
                pathname: '/(modals)/categoriesList',
            }) as Href<unknown>,
        name: '(modals)/categoriesList',
    },
} as const
