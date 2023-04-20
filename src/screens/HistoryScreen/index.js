import React, { useMemo, ref } from "react";
import { StyleSheet, View, SectionList, SafeAreaView } from "react-native";
import DayRow from "./components/DayRow";
import WeekRow from "./components/WeekRow";
import constantStyles from "../../constants/styles";

function HistoryScreen({ userData: { entries } }) {
	let sortedData = useMemo(() => entries.sort((a, b) => new Date(b.endDate) - new Date(a.startDate)), [entries]);
	const renderItem = ({ item }) => <DayRow data={item} />;
	const renderSectionHeader = ({ section }) => <WeekRow data={section} />;
	const keyExtractor = (item, index) => index;

	return (
		<View style={styles.container}>
			<SafeAreaView style={{ flex: 1 }}>
				<SectionList
					initialNumToRender={20}
					sections={sortedData}
					renderSectionHeader={renderSectionHeader}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
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
