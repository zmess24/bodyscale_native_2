import React from "react";
import { StyleSheet, Text, View, FlatList, SectionList } from "react-native";
import moment from "moment";
import constantStyles from "../../constants/styles";

function HistoryScreen({ userData }) {
	const DayItem = ({ item: { weight, date } }) => (
		<View style={styles.item}>
			<Text>{date}</Text>
			<Text>{weight}</Text>
		</View>
	);
	const WeekItem = ({ item: { average, startDate, days } }) => (
		<View>
			<View style={styles.item}>
				<Text>Week : {moment(startDate).format("MM-DD-YYYY")}</Text>
				<Text>{average} lbs</Text>
			</View>
			<View style={styles.item}>
				<FlatList data={days} renderItem={({ item }) => <DayItem item={item} key={item.date} />} />
			</View>
		</View>
	);

	const renderSectionHeader = ({ section }) => {
		console.log(section);
		return <Text>Hello</Text>;
	};

	const renderItems = ({ item }) => {
		console.log(item);
		return <Text>Hi</Text>;
	};

	return (
		<View style={styles.container}>
			<SectionList
				sections={userData.entries}
				renderSectionHeader={renderSectionHeader}
				renderItem={renderItems}
				keyExtractor={(item, index) => item + index}
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
