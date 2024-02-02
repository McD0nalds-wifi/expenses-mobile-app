import * as SQLite from 'expo-sqlite'
import { Platform } from 'react-native'

const openDatabase = () => {
    if (Platform.OS === 'web') {
        return {
            transaction: () => {
                return {
                    executeSql: () => {},
                }
            },
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return SQLite.openDatabase('app.db')
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const db = openDatabase()
