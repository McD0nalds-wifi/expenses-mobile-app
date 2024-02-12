import React, { Fragment, ReactNode } from 'react'

import { FormattedMessage } from 'react-intl'

import { BalanceType } from '@/entities/balance/types'

export const BALANCE_TYPES: Record<BalanceType, { emoji: string; id: BalanceType; title: ReactNode }> = {
    bankAccount: {
        emoji: '🏦',
        id: 'bankAccount',
        title: <FormattedMessage defaultMessage={'Банковский счет'} id={'bankAccountTitle'} />,
    },
    cash: {
        emoji: '💵',
        id: 'cash',
        title: <FormattedMessage defaultMessage={'Наличные'} id={'cashTitle'} />,
    },
}

export const BALANCE_TYPES_LIST = [BALANCE_TYPES.bankAccount, BALANCE_TYPES.cash]

export const CHIPS_ITEMS = BALANCE_TYPES_LIST.map(({ emoji, id, title }) => ({
    id: id,
    title: (
        <Fragment>
            {emoji} {title}
        </Fragment>
    ),
}))
