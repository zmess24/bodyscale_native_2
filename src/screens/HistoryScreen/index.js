import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import moment from "moment";
import constantStyles from "../../constants/styles";

function HistoryScreen({ userData }) {
	const Item = ({ item: { average, startDate } }) => (
		<View style={styles.item}>
			<Text>Week : {moment(startDate).format("MM-DD-YYYY")}</Text>
			<Text>{average} lbs</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={userData.entries}
				renderItem={({ item }) => <Item item={item} key={item.index} />}
				keyExtractor={(item) => item.startDate}
			/>
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
		backgroundColor: "#eee",
		justifyContent: "space-between",
		padding: 10,
	},
});

export default HistoryScreen;
