import React from 'react'

import { AntDesign } from '@expo/vector-icons'
import { FlatList, TouchableOpacity } from 'react-native'

import { IBalance, balancesSelectors } from '@/entities/balance'
import { CONTAINER_PADDING } from '@/shared/constants'
import { useTypedSelector } from '@/shared/hooks/useTypedSelector'

import { ListItem } from './ListItem'

interface IBalancesListProps {
    onSelectBalance: (balance: IBalance) => void
}

export const BalancesList = ({ onSelectBalance }: IBalancesListProps) => {
    const balances = useTypedSelector(balancesSelectors.selectAll)

    return (
        <FlatList
            data={balances}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => onSelectBalance(item)}
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
