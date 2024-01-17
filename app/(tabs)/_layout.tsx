import { AntDesign } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

import { COLORS } from '@/shared/constants'

const TABS = [
    {
        iconName: 'search1',
        name: 'index',
        title: 'Поиск',
    },
    {
        iconName: 'hearto',
        name: 'favourites',
        title: 'Избранное',
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
                tabBarActiveTintColor: COLORS.primary01,
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
                        tabBarIcon: ({ color, size }) => <AntDesign color={color} name={iconName} size={size} />,
                        tabBarLabel: title,
                    }}
                />
            ))}
        </Tabs>
    )
}

export default Layout
