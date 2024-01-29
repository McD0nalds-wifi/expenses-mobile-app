import { ReactNode } from 'react'

import { IntlErrorCode } from '@formatjs/intl'
import { IntlProvider as IntlProviderBase } from 'react-intl'

interface IntlProviderProps {
    children: ReactNode
}

export const IntlProvider = ({ children }: IntlProviderProps) => (
    <IntlProviderBase
        locale={'ru'}
        onError={(error) => {
            // TODO Remove after translations adding
            if (error.code === IntlErrorCode.MISSING_TRANSLATION) {
                return
            }
            console.error(error)
        }}
    >
        {children}
    </IntlProviderBase>
)
