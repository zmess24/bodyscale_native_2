import React from "react";
import { StyleSheet, Text, View, SectionList, SafeAreaView } from "react-native";
import DayRow from "./components/DayRow";
import WeekRow from "./components/WeekRow";
import constantStyles from "../../constants/styles";

function HistoryScreen({ userData }) {
	let sortedData = userData.entries.sort((a, b) => new Date(b.endDate) - new Date(a.startDate));

	return (
		<View style={styles.container}>
			<SafeAreaView style={{ flex: 1 }}>
				<SectionList
					sections={sortedData}
					renderSectionHeader={({ section }) => <WeekRow data={section} />}
					renderItem={({ item }) => <DayRow data={item} />}
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
});

export default HistoryScreen;
