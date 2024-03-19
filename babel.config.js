module.exports = function (api) {
    api.cache(true)
    return {
        plugins: [
            // Required for expo-router
            'expo-router/babel',
            'react-native-reanimated/plugin',
        ],
        presets: ['babel-preset-expo'],
    }
}
