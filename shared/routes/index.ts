import { Href } from 'expo-router'

import { OperationType } from '@/entities/operation'

export const ROUTES = {
    addBalance: {
        getRoute: () => '/(modals)/addBalance' as Href<unknown>,
        name: '(modals)/addBalance',
    },
    addBudget: {
        getRoute: () => '/(modals)/addBudget' as Href<unknown>,
        name: '(modals)/addBudget',
    },
    addOperation: {
        getRoute: (balanceId: string, operationType: OperationType) =>
            ({
                params: {
                    balanceId,
                    operationType,
                },
                pathname: '/(modals)/addOperation',
            }) as Href<unknown>,
        name: '(modals)/addOperation',
    },
    balancesList: {
        getRoute: () => '/(modals)/balancesList' as Href<unknown>,
        name: '(modals)/balancesList',
    },
    categoriesList: {
        getRoute: () => '/(modals)/categoriesList' as Href<unknown>,
        name: '(modals)/categoriesList',
    },
} as const
