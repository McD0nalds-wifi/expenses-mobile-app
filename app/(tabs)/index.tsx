import { Link } from 'expo-router'
import { View } from 'react-native'

const Page = () => {
    return (
        <View>
            <Link href={'/(modals)/login'}>Login</Link>
            <Link href={'/(modals)/booking'}>Booking</Link>
            <Link href={'/listing/1'}>Listing details</Link>
        </View>
    )
}

export default Page
