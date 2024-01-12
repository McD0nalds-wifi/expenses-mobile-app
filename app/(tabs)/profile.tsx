import { useAuth } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Button, Text, View } from 'react-native'

const Profile = () => {
    const { signOut, isSignedIn } = useAuth()

    return (
        <View>
            <Button onPress={() => signOut()} title={'Log out'} />

            {!isSignedIn ? (
                <Link href={'/(modals)/login'}>
                    <Text>Login</Text>
                </Link>
            ) : null}
        </View>
    )
}

export default Profile
