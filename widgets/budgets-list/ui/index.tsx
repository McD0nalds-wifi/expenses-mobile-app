import { FormattedMessage } from 'react-intl'
import { Text, View } from 'react-native'

import { Budget } from '@/entities/budget'
import { baseStyles, typographyStyles } from '@/shared/styles'
import { Button, Empty } from '@/shared/uikit'

export const BudgetsList = () => {
    return (
        <View style={[baseStyles.container, { flex: 1 }]}>
            <Text style={[typographyStyles.title2, { paddingBottom: 12 }]}>
                <FormattedMessage defaultMessage='Бюджеты' id='KoXeiY' />
            </Text>

            <View style={{ flex: 1, marginTop: 20 }}>
                {/*<Budget amount={12000} categoryType='car' limit={20000} />*/}
                <Empty
                    action={
                        <Button size='medium' type='primary'>
                            <FormattedMessage defaultMessage='Добавить бюджет' id='kIQnR4' />
                        </Button>
                    }
                    description={<FormattedMessage defaultMessage='Вы еще не создали ни один бюджет' id='CYySQ4' />}
                    iconVariant='ufo'
                    title={<FormattedMessage defaultMessage='Нет бюджетов' id='EJPAfB' />}
                />
            </View>
        </View>
    )
}
