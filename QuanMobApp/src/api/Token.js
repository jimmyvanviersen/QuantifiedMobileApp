import AsyncStorage from '@react-native-async-storage/async-storage';

// returns a promise that either resolves to stored value when data is found for given key, or returns null otherwise.
export const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@AuthToken');
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        // error reading value
        return null;
    }
};


// store new data item (when no data for given key exists), and modify existing item (when previous data for given key exists).
export const setToken = async (data) => {
    try {
        await AsyncStorage.setItem('@AuthToken', JSON.stringify(data));
    } catch (e) {
        // saving error
        return null;
    }
};


// removes the stored item once called
export const delToken = async () => {
    try {
        await AsyncStorage.removeItem('@AuthToken')
    } catch (e) {
        return null;
    }
};
