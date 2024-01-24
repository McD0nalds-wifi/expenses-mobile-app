import { FontelloIconNameType } from '@/shared/uikit'

export const CATEGORIES: Array<{
    icon: FontelloIconNameType
    name: string
    title: string
}> = [
    {
        icon: 'fried-eggs',
        name: 'breakfast',
        title: 'Завтраки',
    },
    {
        icon: 'broccoli',
        name: 'salads',
        title: 'Салаты',
    },
    {
        icon: 'chicken',
        name: 'mainDishes',
        title: 'Основные блюда',
    },
    {
        icon: 'noodles',
        name: 'pasta',
        title: 'Паста',
    },
    {
        icon: 'pizza',
        name: 'pizza',
        title: 'Пицца',
    },
    {
        icon: 'b-b-q',
        name: 'soups',
        title: 'Супы',
    },
    {
        icon: 'skewer',
        name: 'snacks',
        title: 'Закуски',
    },
    {
        icon: 'juice',
        name: 'drinks',
        title: 'Напитки',
    },
    {
        icon: 'fast-food',
        name: 'sandwiches',
        title: 'Сендвичи',
    },
    {
        icon: 'cake',
        name: 'pastriesAndDesserts',
        title: 'Выпечка и десерты',
    },
    {
        icon: 'mortar',
        name: 'saucesAndMarinades',
        title: 'Соусы и маринады',
    },
]

export const DEFAULT_ACTIVE_INDEX = 0
