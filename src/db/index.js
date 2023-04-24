import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ASYNC_STORAGE_KEY = "bodyscale";

const clearStorageData = async () => {
	const asyncStorageKeys = await AsyncStorage.getAllKeys();
	if (asyncStorageKeys.length > 0) {
		if (Platform.OS === "android") {
			await AsyncStorage.clear();
		}
		if (Platform.OS === "ios") {
			await AsyncStorage.multiRemove(asyncStorageKeys);
		}
	}
};

const setStorageData = async (data) => {
	await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(data));
};

const loadStorageData = async () => {
	let data = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
	return data;
};

export { clearStorageData, setStorageData, loadStorageData };
