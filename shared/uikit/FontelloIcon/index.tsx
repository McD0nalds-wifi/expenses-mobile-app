import { FC } from 'react'

import { createIconSetFromFontello } from '@expo/vector-icons'

import fontelloConfig from './config.json'

export type FontelloIconNameType =
    | 'pizza'
    | 'fried-eggs'
    | 'skewer'
    | 'noodles'
    | 'mortar'
    | 'juice'
    | 'fast-food'
    | 'chicken'
    | 'cake'
    | 'broccoli'
    | 'b-b-q'

export const FontelloIcon = createIconSetFromFontello(fontelloConfig, 'fontello', 'fontello.ttf') as FC<{
    color: string
    name: FontelloIconNameType
    size: number
}>
