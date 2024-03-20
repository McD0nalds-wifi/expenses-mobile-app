import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { RootStateType } from '@/shared/store/types'
import { uuid } from '@/shared/uuid'

import { operationDatabase } from '../database'
import { IOperation } from '../types'

const operationsAdapter = createEntityAdapter({
    selectId: (operation: IOperation) => operation.id,
    sortComparer: (a, b) => b.date - a.date,
})
export const operationsSlice = createSlice({
    initialState: operationsAdapter.getInitialState(),
    name: 'operations',
    reducers: {
        addOperation: (state, { payload }: PayloadAction<Omit<IOperation, 'id'>>) => {
            const id = uuid()

            operationDatabase.insertOperation(
                id,
                payload.amount,
                payload.balanceId,
                payload.category,
                payload.date,
                payload.operationType,
            )

            operationsAdapter.addOne(state, { ...payload, id })
        },
        initializeOperations: (state, { payload }: PayloadAction<Array<IOperation>>) => {
            operationsAdapter.setAll(state, payload)
        },
    },
})

export const { addOperation, initializeOperations } = operationsSlice.actions

export const operationsSelectors = operationsAdapter.getSelectors<RootStateType>((state) => state.operations)
