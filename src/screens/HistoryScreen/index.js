import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import constantStyles from "../../constants/styles";

function HistoryScreen({ userData }) {
	const Item = ({ item: { average, startDate, endDate } }) => (
		<View style={styles.item}>
			<Text>
				{average} : {startDate} : {endDate}
			</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<FlatList data={userData.entries.reverse()} renderItem={({ item }) => <Item item={item} />} keyExtractor={(item) => item.index} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		...constantStyles.screenStyles,
	},
	item: {
		display: "flex",
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#f9c2ff",
	},
});

export default HistoryScreen;
