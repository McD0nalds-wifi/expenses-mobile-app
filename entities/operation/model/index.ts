import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { startOfDay } from 'date-fns'

import { IOperation } from '../types'

interface ISliceState {
    operations: Array<IOperation>
}

const initialState: ISliceState = { operations: [] }

export const operationSlice = createSlice({
    initialState,
    name: 'operation',
    reducers: {
        addOperation: (state, action: PayloadAction<IOperation>) => {
            state.operations.push(action.payload)
        },
        initializeOperations: (state, action: PayloadAction<Array<IOperation>>) => {
            state.operations = action.payload
        },
    },
    selectors: {
        selectOperation: ({ operations }, operationId: number) => operations.find(({ id }) => id === operationId),
        selectOperations: ({ operations }) => operations,
        selectOperationsByDays: ({ operations }) => {
            const operationsByDay: Record<number, Array<IOperation>> = {}
            const days: Array<number> = []

            operations.forEach((operation) => {
                const day = startOfDay(operation.date).getTime()

                if (operationsByDay[day]) {
                    operationsByDay[day].push(operation)
                } else {
                    operationsByDay[day] = [operation]
                    days.push(day)
                }
            })

            return {
                days: [...days].sort((a, b) => b - a),
                operationsByDay,
            }
        },
    },
})

export const { addOperation, initializeOperations } = operationSlice.actions

export const { selectOperations, selectOperation, selectOperationsByDays } = operationSlice.selectors
