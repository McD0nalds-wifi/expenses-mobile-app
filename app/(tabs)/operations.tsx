import { View } from 'react-native'

import { CATEGORIES } from '@/entities/category'
import { Operation } from '@/entities/operation'
import { baseStyles } from '@/shared/styles'

const Operations = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={[baseStyles.container, { backgroundColor: 'white' }]}>
                <Operation
                    bankName={'Тинькофф'}
                    color={CATEGORIES.transport.color}
                    icon={CATEGORIES.transport.icon}
                    subtitle={CATEGORIES.transport.title}
                    title={'Проезд в автобусе'}
                    value={200}
                />
            </View>
        </View>
    )
}

export default Operations
