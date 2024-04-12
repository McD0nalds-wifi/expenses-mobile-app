import { Link } from 'expo-router'
import { FormattedMessage } from 'react-intl'
import { Text, View } from 'react-native'

import { Budget, budgetsSelectors } from '@/entities/budget'
import { useTypedSelector } from '@/shared/hooks/useTypedSelector'
import { ROUTES } from '@/shared/routes'
import { baseStyles, typographyStyles } from '@/shared/styles'
import { Button, Empty } from '@/shared/uikit'

export const BudgetsList = () => {
    const budgets = useTypedSelector(budgetsSelectors.selectAll)

    return (
        <View style={[baseStyles.container, { flex: 1 }]}>
            <Text style={[typographyStyles.title2, { paddingBottom: 12 }]}>
                <FormattedMessage defaultMessage='Бюджеты' id='KoXeiY' />
            </Text>

            <View style={{ flex: 1, marginTop: 20 }}>
                {budgets.map(({ amount, category, spendingLimit, id }) => (
                    <Budget amount={amount} categoryType={category} key={id} spendingLimit={spendingLimit} />
                ))}

                <Empty
                    action={
                        <Link asChild href={ROUTES.addBudget.getRoute()}>
                            <Button size='medium' type='primary'>
                                <FormattedMessage defaultMessage='Добавить бюджет' id='kIQnR4' />
                            </Button>
                        </Link>
                    }
                    description={<FormattedMessage defaultMessage='Вы еще не создали ни один бюджет' id='CYySQ4' />}
                    iconVariant='ufo'
                    title={<FormattedMessage defaultMessage='Нет бюджетов' id='EJPAfB' />}
                />
            </View>
        </View>
    )
}
