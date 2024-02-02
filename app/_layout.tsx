import { useEffect } from 'react'

import { ClerkProvider } from '@clerk/clerk-expo'
import { AntDesign } from '@expo/vector-icons'
import { FontSource, useFonts } from 'expo-font'
import { SplashScreen, Stack, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { TouchableOpacity, View } from 'react-native'

import fontelloIcons from '@/assets/fonts/fontello.ttf'
import sfProTextBold from '@/assets/fonts/SF-Pro-Rounded-Bold.ttf'
import sfProTextHeavy from '@/assets/fonts/SF-Pro-Rounded-Heavy.ttf'
import sfProTextRegular from '@/assets/fonts/SF-Pro-Rounded-Regular.ttf'
import sfProTextSemibold from '@/assets/fonts/SF-Pro-Rounded-Semibold.ttf'
import { COLORS } from '@/shared/constants'
import { IntlProvider, StoreProvider } from '@/shared/providers'
import { ROUTES } from '@/shared/routes'
import { baseStyles } from '@/shared/styles'

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''

const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key)
        } catch {
            return null
        }
    },
    async saveToken(key: string, value: string) {
        return SecureStore.setItemAsync(key, value)
    },
}

export {
    // Catch any errors thrown by the _layout component.
    ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded, error] = useFonts({
        fontello: fontelloIcons as FontSource,
        'sf-b': sfProTextBold as FontSource,
        'sf-h': sfProTextHeavy as FontSource,
        'sf-r': sfProTextRegular as FontSource,
        'sf-sb': sfProTextSemibold as FontSource,
    })

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error
    }, [error])

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <StoreProvider>
            <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
                <IntlProvider>
                    <RootLayoutNav />
                </IntlProvider>
            </ClerkProvider>
        </StoreProvider>
    )
}

function RootLayoutNav() {
    // const colorScheme = useColorScheme();
    const { push } = useRouter()
    // const { isLoaded, isSignedIn } = useAuth()
    //
    // useEffect(() => {
    //     if (isLoaded && !isSignedIn) {
    //         router.push('/(modals)/login')
    //     }
    // }, [isLoaded])

    useEffect(() => {
        push(ROUTES.balanceConfigurator.route)
    }, [])

    return (
        // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
            <Stack.Screen name={'(tabs)'} options={{ headerShown: false }} />

            <Stack.Screen
                name={ROUTES.balanceConfigurator.name}
                options={{ headerShown: false, presentation: 'modal' }}
            />

            {/*<Stack.Screen*/}
            {/*    name={'listing/[id]'}*/}
            {/*    options={{*/}
            {/*        headerTitle: '',*/}
            {/*    }}*/}
            {/*/>*/}

            {/*<Stack.Screen*/}
            {/*    name={'(modals)/booking'}*/}
            {/*    options={{*/}
            {/*        animation: 'fade',*/}
            {/*        headerLeft: () => (*/}
            {/*            <TouchableOpacity onPress={back}>*/}
            {/*                <Ionicons name={'close-outline'} size={28} />*/}
            {/*            </TouchableOpacity>*/}
            {/*        ),*/}
            {/*        presentation: 'transparentModal',*/}
            {/*    }}*/}
            {/*/>*/}
        </Stack>
        // </ThemeProvider>
    )
}
