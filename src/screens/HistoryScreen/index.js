import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import constantStyles from "../../constants/styles";

function HistoryScreen({ userData }) {
	const Item = ({ average, startDate, endDate }) => {
		<View>
			<Text>
				{average} : {startDate} : {endDate}
			</Text>
		</View>;
	};
	return (
		<View style={styles.container}>
			<Text>HistoryScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		...constantStyles.screenStyles,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	item: {
		display: "flex",
		flexDirection: "fow",
	},
});

export default HistoryScreen;
