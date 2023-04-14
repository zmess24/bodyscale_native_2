import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import constantStyles from "../../constants/styles";
import Header from "./components/Header";
import AllTimeChart from "./components/charts/AllTimeChart";
import CurrentYearChart from "./components/charts/CurrentYearChart";
import CurrentMonthChart from "./components/charts/CurrentMonthChart";
import CurrentWeekChart from "./components/charts/CurrentWeekChart";

function ChartScreen({ userData }) {
	const [activeTab, setActiveTab] = useState("all");

	return (
		<View style={styles.containter}>
			<Header setActiveTab={setActiveTab} activeTab={activeTab} />
			{activeTab === "all" && <AllTimeChart userData={userData} />}
			{activeTab === "year" && <CurrentYearChart userData={userData} />}
			{activeTab === "month" && <CurrentMonthChart userData={userData} />}
			{activeTab === "week" && <CurrentWeekChart userData={userData} />}
		</View>
	);
}

const styles = StyleSheet.create({
	containter: {
		...constantStyles.screenStyles,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ChartScreen;
