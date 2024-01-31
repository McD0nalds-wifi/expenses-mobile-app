import { DimensionValue, View } from 'react-native'

import { COLORS } from '@/shared/constants'

interface ISkeletonProps {
    height: DimensionValue
    width: DimensionValue
}

export const Skeleton = ({ height, width }: ISkeletonProps) => {
    return <View style={{ backgroundColor: COLORS.neutral, borderRadius: 8, height, width }} />
}
