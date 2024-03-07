import { SafeAreaView } from 'react-native'

import { Operations as OperationsWidget } from '@/widgets/operations'

const Operations = () => {
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <OperationsWidget />
        </SafeAreaView>
    )
}

export default Operations
