import React from 'react'

import { AntDesign } from '@expo/vector-icons'
import { FlatList, TouchableOpacity } from 'react-native'

import { balancesSelectors } from '@/entities/balance'
import { CONTAINER_PADDING } from '@/shared/constants'
import { useTypedDispatch } from '@/shared/hooks/useTypedDispatch'
import { useTypedSelector } from '@/shared/hooks/useTypedSelector'

import { ListItem } from './ListItem'
import { selectBalance } from '../model'

interface IBalancesListProps {
    onSelectBalance: () => void
}

export const BalancesList = ({ onSelectBalance }: IBalancesListProps) => {
    const dispatch = useTypedDispatch()

    const balances = useTypedSelector(balancesSelectors.selectAll)

    return (
        <FlatList
            data={balances}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                        dispatch(selectBalance(item))
                        onSelectBalance()
                    }}
                    style={{
                        paddingBottom: index + 1 === balances.length ? CONTAINER_PADDING : 0,
                        paddingHorizontal: CONTAINER_PADDING,
                    }}
                >
                    <ListItem
                        amount={item.amount}
                        icon={<AntDesign name={item.type === 'bankAccount' ? 'creditcard' : 'wallet'} size={24} />}
                        title={item.name}
                    />
                </TouchableOpacity>
            )}
        />
    )
}
