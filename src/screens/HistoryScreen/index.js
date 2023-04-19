import React from "react";
import { StyleSheet, Text, View, FlatList, SectionList, SafeAreaView } from "react-native";
import moment from "moment";
import constantStyles from "../../constants/styles";

function HistoryScreen({ userData }) {
	const DayItem = ({ data: { weight, date } }) => (
		<View style={styles.sectionItem}>
			<Text>{date}</Text>
			<Text>{weight}</Text>
		</View>
	);
	const WeekItem = ({ data: { average, startDate } }) => (
		<View>
			<View style={styles.sectionHeader}>
				<Text>{moment(startDate).format("MM-DD-YYYY")}</Text>
				<Text>{average} lbs</Text>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			<SafeAreaView style={{ flex: 1 }}>
				<SectionList
					sections={userData.entries}
					renderSectionHeader={({ section }) => <WeekItem data={section} />}
					renderItem={({ item }) => <DayItem data={item} />}
					keyExtractor={(item, index) => item + index}
				/>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		...constantStyles.screenStyles,
	},
	sectionHeader: {
		display: "flex",
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#eee",
		justifyContent: "space-between",
		padding: 10,
	},
	sectionItem: {
		display: "flex",
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
	},
});

export default HistoryScreen;
