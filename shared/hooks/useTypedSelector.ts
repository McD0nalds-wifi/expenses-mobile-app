import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import { RootStateType } from '../store/types'

export const useTypedSelector: TypedUseSelectorHook<RootStateType> = useSelector
