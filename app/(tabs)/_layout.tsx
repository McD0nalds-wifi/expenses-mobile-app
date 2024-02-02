import { AntDesign } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

import { COLORS } from '@/shared/constants'

const TABS = [
    {
        iconName: 'appstore-o',
        name: 'index',
        title: 'Главная',
    },
    {
        iconName: 'bars',
        name: 'operations',
        title: 'Операции',
    },
    {
        iconName: 'user',
        name: 'profile',
        title: 'Профиль',
    },
] as const

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: COLORS.primary,
                tabBarLabelStyle: {
                    fontFamily: 'sf-sb',
                },
            }}
        >
            {TABS.map(({ iconName, name, title }) => (
                <Tabs.Screen
                    key={name}
                    name={name}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => <AntDesign color={color} name={iconName} size={size} />,
                        tabBarLabel: title,
                    }}
                />
            ))}
        </Tabs>
    )
}

export default Layout
