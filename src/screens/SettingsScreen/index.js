import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { clearStorageData, setStorageData } from "../../db";
import { constantStyles } from "../../constants/styles";
import generateFakeDate from "../../constants/functions/generateFakeDate";
import { User } from "../../constants/classes";

function SettingsScreen({ userData: { setUser, setWeight } }) {
	const deleteData = async () => {
		await clearStorageData();
		let user = new User();
		await setStorageData(user);
		setUser(user);
		setWeight(0);
	};

	const resetStorage = async () => {
		await clearStorageData();
		let user = generateFakeDate();
		await setStorageData(user);
		setUser(user);
		setWeight(0);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={deleteData}>
				<Text style={styles.title}>Delete Data</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={resetStorage}>
				<Text style={styles.title}>Reset Data</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		...constantStyles.screenStyles,
		alignItems: "center",
		justifyContent: "center",
	},
	item: {
		backgroundColor: "#f9c2ff",
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
});

export default SettingsScreen;
