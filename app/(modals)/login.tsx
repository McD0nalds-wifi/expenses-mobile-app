// import { useOAuth } from '@clerk/clerk-expo'
// import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import { useWarmUpBrowser } from '@/shared/hooks/useWarmUpBrowser'

// enum Strategy {
//     Apple = 'oauth_apple',
//     Google = 'oauth_google',
// }

const Login = () => {
    useWarmUpBrowser()

    // const { back } = useRouter()
    // const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' })
    // const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' })
    // const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' })

    // const onSelectAuth = async (strategy: Strategy) => {
    //     const selectedAuth = {
    //         [Strategy.Google]: googleAuth,
    //         [Strategy.Apple]: appleAuth,
    //         // [Strategy.Facebook]: facebookAuth,
    //     }[strategy]
    //
    //     try {
    //         const { createdSessionId, setActive } = await selectedAuth()
    //
    //         if (createdSessionId && setActive) {
    //             setActive({ session: createdSessionId })
    //             back()
    //         }
    //     } catch (err) {
    //         console.error('OAuth error', err)
    //     }
    // }

    return (
        <View style={styles.container}>
            {/*<TextInput*/}
            {/*    autoCapitalize="none"*/}
            {/*    placeholder="Email"*/}
            {/*    style={[baseStyles.inputField, { marginBottom: 30 }]}*/}
            {/*/>*/}

            {/*<TouchableOpacity style={baseStyles.btn}>*/}
            {/*    <Text style={baseStyles.btnText}>Continue</Text>*/}
            {/*</TouchableOpacity>*/}

            {/*<View style={styles.seperatorView}>*/}
            {/*    <View*/}
            {/*        style={{*/}
            {/*            borderBottomColor: 'black',*/}
            {/*            borderBottomWidth: StyleSheet.hairlineWidth,*/}
            {/*            flex: 1,*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    <Text style={styles.seperator}>or</Text>*/}
            {/*    <View*/}
            {/*        style={{*/}
            {/*            borderBottomColor: 'black',*/}
            {/*            borderBottomWidth: StyleSheet.hairlineWidth,*/}
            {/*            flex: 1,*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</View>*/}

            {/*<View style={{ gap: 20 }}>*/}
            {/*    <TouchableOpacity style={styles.btnOutline}>*/}
            {/*        <Ionicons name={'call-outline'} size={24} style={baseStyles.btnIcon} />*/}
            {/*        <Text style={styles.btnOutlineText}>Continue with Phone</Text>*/}
            {/*    </TouchableOpacity>*/}

            {/*    <TouchableOpacity onPress={() => onSelectAuth(Strategy.Apple)} style={styles.btnOutline}>*/}
            {/*        <Ionicons name={'md-logo-apple'} size={24} style={baseStyles.btnIcon} />*/}
            {/*        <Text style={styles.btnOutlineText}>Continue with Apple</Text>*/}
            {/*    </TouchableOpacity>*/}

            {/*    <TouchableOpacity onPress={() => onSelectAuth(Strategy.Google)} style={styles.btnOutline}>*/}
            {/*        <Ionicons name={'md-logo-google'} size={24} style={baseStyles.btnIcon} />*/}
            {/*        <Text style={styles.btnOutlineText}>Continue with Google</Text>*/}
            {/*    </TouchableOpacity>*/}

            {/*    /!*<TouchableOpacity onPress={() => onSelectAuth(Strategy.Facebook)} style={styles.btnOutline}>*!/*/}
            {/*    /!*    <Ionicons name="md-logo-facebook" size={24} style={defaultStyles.btnIcon} />*!/*/}
            {/*    /!*    <Text style={styles.btnOutlineText}>Continue with Facebook</Text>*!/*/}
            {/*    /!*</TouchableOpacity>*!/*/}
            {/*</View>*/}
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    btnOutline: {
        alignItems: 'center',
        backgroundColor: '#fff',
        // borderColor: colors.grey,
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: '#000',
        // fontFamily: 'mon-sb',
        fontSize: 16,
    },
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 26,
    },
    seperator: {
        // color: colors.grey,
        // fontFamily: 'mon-sb',
        fontSize: 16,
    },
    seperatorView: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        marginVertical: 30,
    },
})
