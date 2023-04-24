import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import clearAsyncStorage from "../../constants/functions/clearAsyncStorage";
import { constantStyles } from "../../constants/styles";
import generateFakeDate from "../../constants/functions/generateFakeDate";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SettingsScreen({ userData: { setUser, setWeight } }) {
	const data = [{ title: "Delete Data" }];
	const keyExtractor = (item, index) => index;
	const renderItem = ({ item }) => <Item title={item.title} />;

	const resetStorage = async () => {
		clearAsyncStorage();
		let user = generateFakeDate();
		await AsyncStorage.setItem("bodyScale_user", JSON.stringify(user));
		setUser(user);
		setWeight(0);
	};

	const Item = ({ title }) => (
		<TouchableOpacity style={styles.item} onPress={resetStorage}>
			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} />
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
