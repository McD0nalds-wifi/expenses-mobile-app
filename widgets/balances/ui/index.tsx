import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'expo-router'
import { isEmpty } from 'lodash'
import { NativeSyntheticEvent, StyleSheet, TouchableOpacity, View } from 'react-native'
import PagerView from 'react-native-pager-view'

import { AddBalance, Balance, balanceDatabase, initializeBalances, selectBalances } from '@/entities/balance'
import { useTypedDispatch } from '@/shared/hooks/useTypedDispatch'
import { useTypedSelector } from '@/shared/hooks/useTypedSelector'
import { ROUTES } from '@/shared/routes'
import { baseStyles } from '@/shared/styles'

import { Header } from './Header'

const DEFAULT_PAGE_INDEX = 0

export const Balances = () => {
    const { push } = useRouter()
    const dispatch = useTypedDispatch()

    const [currentPageIndex, setCurrentPageIndex] = useState(DEFAULT_PAGE_INDEX)

    const balances = useTypedSelector(selectBalances)

    useEffect(() => {
        if (!isEmpty(balances)) {
            return
        }

        balanceDatabase.getBalances((balances) => dispatch(initializeBalances(balances)))
    }, [balances])

    const handlePagerViewScroll = useCallback(
        ({ nativeEvent }: NativeSyntheticEvent<Readonly<{ offset: number; position: number }>>) => {
            setCurrentPageIndex(nativeEvent.position)
        },
        [],
    )

    const handleAddBalancePress = () => {
        push(ROUTES.addBalance.getRoute())
    }

    const handleAddExpense = useCallback(
        (balanceId: number) => () => {
            push(ROUTES.addOperation.getRoute(balanceId, 'expenses'))
        },
        [],
    )

    const handleAddIncome = useCallback(
        (balanceId: number) => () => {
            push(ROUTES.addOperation.getRoute(balanceId, 'income'))
        },
        [],
    )

    return (
        <View style={styles.wrapper}>
            <Header currentIndicatorDotIndex={currentPageIndex} indicatorDotsCount={balances.length + 1} />

            <PagerView
                initialPage={DEFAULT_PAGE_INDEX}
                onPageScroll={handlePagerViewScroll}
                orientation='horizontal'
                style={styles.pagerView}
            >
                {balances.map(({ amount, name, id }, index) => (
                    <View key={index} style={styles.page}>
                        <Balance
                            amount={amount}
                            bank='Тинькофф'
                            onAddExpense={handleAddExpense(id)}
                            onAddIncome={handleAddIncome(id)}
                            title={name}
                        />
                    </View>
                ))}

                <TouchableOpacity
                    key={`${balances.length + 1}`}
                    onPress={handleAddBalancePress}
                    style={[baseStyles.container, { ...styles.page, paddingBottom: 44 }]}
                >
                    <AddBalance />
                </TouchableOpacity>
            </PagerView>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        justifyContent: 'flex-end',
        paddingBottom: 28,
    },
    pagerView: {
        alignSelf: 'stretch',
        height: 254,
    },
    wrapper: {
        flex: 1,
        position: 'relative',
    },
})
