import { Stack } from 'expo-router'
import { View } from 'react-native'

import { ExploreCategories } from '@/features/explore-categories'

const Page = () => {
    return (
        <View style={{ flex: 1, marginTop: 80 }}>
            <Stack.Screen
                options={{
                    header: () => <ExploreCategories />,
                }}
            />

            {/*<Text style={typographyStyles.headerRegular}>some text</Text>*/}
            {/*<Link href={'/(modals)/login'}>Login</Link>*/}
            {/*<Link href={'/(modals)/booking'}>Booking</Link>*/}
            {/*<Link href={'/listing/1'}>Listing details</Link>*/}

            {/*<Button type={'primary'}>Hello</Button>*/}
        </View>
    )
}

export default Page
