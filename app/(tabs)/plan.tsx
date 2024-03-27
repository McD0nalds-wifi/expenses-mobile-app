import { SafeAreaView } from 'react-native'

import { BudgetsList } from '@/widgets/budgets-list'

const Plan = () => {
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <BudgetsList />
        </SafeAreaView>
    )
}

export default Plan
