import { Stack } from 'expo-router'
import { View } from 'react-native'

import { AchievementCard } from '@/entities/achievement-card'
import { ExploreCategories } from '@/features/explore-categories'

const Page = () => {
    return (
        <View style={{ flex: 1, marginTop: 80 }}>
            <Stack.Screen
                options={{
                    header: () => <ExploreCategories />,
                }}
            />
            <View style={{ paddingHorizontal: 12, paddingTop: 120 }}>
                <AchievementCard
                    description={'Описание'}
                    favorite={true}
                    image={
                        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F7%2F79%2F2010-brown-bear.jpg&f=1&nofb=1&ipt=49c77868e868f6c86b58f3377400abeba8e5fbe2eca59c6e78b6495493f5f836&ipo=images'
                    }
                    peopleWithAchievementInPercent={15}
                    points={20}
                    title={'Заголовок'}
                />
            </View>
        </View>
    )
}

export default Page
