import React from 'react'

import { useLocalSearchParams } from 'expo-router'

import { balancesSelectors } from '@/entities/balance'
import { OperationType } from '@/entities/operation'
import { AddOperation } from '@/features/add-operation'
import { useTypedSelector } from '@/shared/hooks/useTypedSelector'

const AddOperationModal = () => {
    const { balanceId, operationType } = useLocalSearchParams<{
        balanceId: string
        operationType: OperationType
    }>()

    const balance = useTypedSelector((state) => balancesSelectors.selectById(state, balanceId))

    return <AddOperation defaultBalance={balance} operationType={operationType} />
}

export default AddOperationModal
