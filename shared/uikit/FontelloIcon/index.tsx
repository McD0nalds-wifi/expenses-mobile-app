import { FC } from 'react'

import { createIconSetFromFontello } from '@expo/vector-icons'

import fontelloConfig from './config.json'

export type FontelloIconNameType =
    | 'bus'
    | 'menu-dots'
    | 'cart'
    | 'bag'
    | 'home'
    | 'pills'
    | 'confetti'
    | 'masks'
    | 'academic-cap'
    | 'hanger'
    | 'wheel'
    | 'tea-cup'
    | 'chef-hat'

export const FontelloIcon = createIconSetFromFontello(fontelloConfig, 'fontello', 'fontello.ttf') as FC<{
    color: string
    name: FontelloIconNameType
    size: number
}>
