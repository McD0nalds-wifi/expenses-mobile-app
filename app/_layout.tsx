import { useEffect } from 'react'

import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { FontSource, useFonts } from 'expo-font'
import { SplashScreen, Stack, router, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { TouchableOpacity } from 'react-native'

import sfProTextMedium from '@/assets/fonts/SFProText-Medium.ttf'
import sfProTextRegular from '@/assets/fonts/SFProText-Regular.ttf'
import sfProTextSemibold from '@/assets/fonts/SFProText-Semibold.ttf'
import { StoreProvider } from '@/shared/providers'

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
        sf: sfProTextRegular as FontSource,
        'sf-m': sfProTextMedium as FontSource,
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
                <RootLayoutNav />
            </ClerkProvider>
        </StoreProvider>
    )
}

function RootLayoutNav() {
    // const colorScheme = useColorScheme();
    const { back } = useRouter()
    const { isLoaded, isSignedIn } = useAuth()

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/(modals)/login')
        }
    }, [isLoaded])

    return (
        // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
            <Stack.Screen name={'(tabs)'} options={{ headerShown: false }} />

            <Stack.Screen
                name={'(modals)/login'}
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={back}>
                            <Ionicons name={'close-outline'} size={28} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        // fontFamily: 'mon-sb',
                    },
                    presentation: 'modal',
                    title: 'Log in or sign up',
                }}
            />

            <Stack.Screen
                name={'listing/[id]'}
                options={{
                    headerTitle: '',
                }}
            />

            <Stack.Screen
                name={'(modals)/booking'}
                options={{
                    animation: 'fade',
                    headerLeft: () => (
                        <TouchableOpacity onPress={back}>
                            <Ionicons name={'close-outline'} size={28} />
                        </TouchableOpacity>
                    ),
                    presentation: 'transparentModal',
                }}
            />
        </Stack>
        // </ThemeProvider>
    )
}
