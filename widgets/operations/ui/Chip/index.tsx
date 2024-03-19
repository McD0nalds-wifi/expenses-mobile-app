import { FormattedNumber } from 'react-intl'
import { Text, View } from 'react-native'

import { COLORS, CURRENT_CURRENCY } from '@/shared/constants'
import { typographyStyles } from '@/shared/styles'

interface IChipProps {
    color: string
    title: string
    value: number
}

export const Chip = ({ color, title, value }: IChipProps) => {
    return (
        <View
            style={{
                alignItems: 'center',
                backgroundColor: color,
                borderRadius: 20,
                flexDirection: 'row',
                gap: 4,
                paddingHorizontal: 8,
                paddingVertical: 4,
            }}
        >
            <Text style={[typographyStyles.caption, { color: COLORS.white }]}>{title}</Text>

            <Text style={[typographyStyles.captionBold, { color: COLORS.white }]}>
                <FormattedNumber currency={CURRENT_CURRENCY} style='currency' value={value} />
            </Text>
        </View>
    )
}
