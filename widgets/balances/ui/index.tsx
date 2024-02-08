import { useCallback, useState } from 'react'

import { NativeSyntheticEvent, StyleSheet, TouchableOpacity, View } from 'react-native'
import PagerView from 'react-native-pager-view'

import { AddBalance, Balance, selectBalances } from '@/entities/balance'
import { useTypedSelector } from '@/shared/hooks'
import { baseStyles } from '@/shared/styles'

import { Header } from './Header'

const DEFAULT_PAGE_INDEX = 0

export const Balances = () => {
    const [currentPageIndex, setCurrentPageIndex] = useState(DEFAULT_PAGE_INDEX)

    const balances = useTypedSelector(selectBalances)

    const handlePagerViewScroll = useCallback(
        ({ nativeEvent }: NativeSyntheticEvent<Readonly<{ offset: number; position: number }>>) => {
            setCurrentPageIndex(nativeEvent.position)
        },
        [],
    )

    return (
        <View style={styles.wrapper}>
            <Header currentIndicatorDotIndex={currentPageIndex} indicatorDotsCount={balances.length + 1} />

            <PagerView
                initialPage={DEFAULT_PAGE_INDEX}
                onPageScroll={handlePagerViewScroll}
                orientation={'horizontal'}
                style={styles.pagerView}
            >
                {balances.map(({ amount, title }, index) => (
                    <View key={index} style={styles.page}>
                        <Balance amount={amount} bank={'Тинькофф'} title={title} />
                    </View>
                ))}

                <TouchableOpacity
                    key={`${balances.length + 1}`}
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
