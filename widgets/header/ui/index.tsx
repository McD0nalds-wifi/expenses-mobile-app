import { AntDesign } from '@expo/vector-icons'
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'

import { COLORS } from '@/shared/constants'
import { baseStyles } from '@/shared/styles'

export const Header = () => {
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white }}>
            <View style={[baseStyles.container, styles.container]}>
                <TouchableOpacity style={styles.avatar}>
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        source={require('../../../assets/images/nyan-cat.png')}
                        style={{ borderRadius: 40, height: 40, width: 40 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={baseStyles.iconButton}>
                    <AntDesign color={COLORS.primary} name={'qrcode'} size={20} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    avatar: {
        elevation: 16,
        shadowColor: COLORS.primary,
        shadowOffset: {
            height: 8,
            width: 0,
        },
        shadowOpacity: 0.16,
        shadowRadius: 20,
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
})
