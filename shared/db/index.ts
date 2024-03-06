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

    const db = SQLite.openDatabase('db.db')
    return db
}

export const db = openDatabase()
