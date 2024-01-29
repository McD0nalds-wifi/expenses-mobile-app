import { Stack } from 'expo-router'
import { View } from 'react-native'

import { Asset } from '@/entities/asset'
import { Balance } from '@/entities/balance'
import { COLORS } from '@/shared/constants'
import { Header } from '@/widgets/header'

const Page = () => {
    return (
        <View style={{ backgroundColor: COLORS.white }}>
            <Stack.Screen options={{ header: () => <Header /> }} />

            <View style={{ height: 16 }} />

            <Balance />

            <View style={{ gap: 24, marginTop: 12, paddingHorizontal: 20 }}>
                <Asset
                    iconUrl={'https://static.coinstats.app/coins/1650455588819.png'}
                    pnl={0.0348}
                    title={'Ethereum'}
                    value={3226.31}
                />
                <Asset
                    iconUrl={'https://static.coinstats.app/coins/DogecoinIZai5.png'}
                    pnl={0.0348}
                    title={'Ethereum'}
                    value={3226.31}
                />
                <Asset
                    iconUrl={'https://static.coinstats.app/coins/alethea-artificial-liquid-intelligence-tokenRRn.png'}
                    pnl={0.0348}
                    title={'Ethereum'}
                    value={3226.31}
                />
                <Asset
                    iconUrl={'https://static.coinstats.app/coins/1666608145347.png'}
                    pnl={0.0348}
                    title={'Ethereum'}
                    value={3226.31}
                />
                <Asset
                    iconUrl={'https://static.coinstats.app/portfolio_images/doge-wallet.png'}
                    pnl={0.0348}
                    title={'Ethereum'}
                    value={3226.31}
                />
            </View>
        </View>
    )
}

export default Page
