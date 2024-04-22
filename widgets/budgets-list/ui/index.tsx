import { AntDesign } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { isEmpty } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Budget, budgetsSelectors } from '@/entities/budget'
import { COLORS } from '@/shared/constants'
import { useTypedSelector } from '@/shared/hooks/useTypedSelector'
import { ROUTES } from '@/shared/routes'
import { baseStyles, typographyStyles } from '@/shared/styles'
import { Button, Empty } from '@/shared/uikit'

export const BudgetsList = () => {
    const budgets = useTypedSelector(budgetsSelectors.selectAll)

    return (
        <View style={[baseStyles.container, { flex: 1 }]}>
            <View style={styles.header}>
                <Text style={[typographyStyles.title2, { paddingBottom: 12 }]}>
                    <FormattedMessage defaultMessage='Бюджеты' id='KoXeiY' />
                </Text>

                {!isEmpty(budgets) ? (
                    <Link asChild href={ROUTES.addBudget.getRoute()}>
                        <TouchableOpacity>
                            <AntDesign color={COLORS.primary} name='plus' size={24} />
                        </TouchableOpacity>
                    </Link>
                ) : null}
            </View>

            <View style={styles.content}>
                {isEmpty(budgets) ? (
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
                ) : (
                    <View style={{ gap: 24 }}>
                        {budgets.map(({ amount, category, spendingLimit, id }) => (
                            <Budget
                                amount={amount}
                                categoryType={category}
                                key={id}
                                onDeleteButtonPress={() => null}
                                spendingLimit={spendingLimit}
                            />
                        ))}
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginTop: 20,
        paddingBottom: 20,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})
