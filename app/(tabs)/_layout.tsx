import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

import { colors } from '@/shared/constants'

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarLabelStyle: {
                    fontFamily: 'mon-sb',
                },
            }}
        >
            <Tabs.Screen
                name={'index'}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons color={color} name={'search'} size={size} />,
                    tabBarLabel: 'Explore',
                }}
            />

            <Tabs.Screen
                name={'favourites'}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons color={color} name={'heart-outline'} size={size} />,
                    tabBarLabel: 'Favourites',
                }}
            />

            <Tabs.Screen
                name={'profile'}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons color={color} name={'heart-outline'} size={size} />,
                    tabBarLabel: 'Profile',
                }}
            />
        </Tabs>
    )
}

export default Layout
