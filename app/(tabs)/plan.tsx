import { SafeAreaView, ScrollView } from 'react-native'

import { BudgetsList } from '@/widgets/budgets-list'

const Plan = () => {
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <ScrollView>
                <BudgetsList />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Plan
