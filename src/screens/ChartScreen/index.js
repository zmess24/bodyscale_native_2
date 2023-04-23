import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { constantStyles } from "../../constants/styles";
import Header from "./components/Header";
import AllTimeChart from "./components/charts/AllTimeChart";
import CurrentYearChart from "./components/charts/CurrentYearChart";
import CurrentMonthChart from "./components/charts/CurrentMonthChart";
import CurrentWeekChart from "./components/charts/CurrentWeekChart";

function ChartScreen({ userData }) {
	const [activeTab, setActiveTab] = useState("all");

	return (
		<View style={styles.container}>
			<Header setActiveTab={setActiveTab} activeTab={activeTab} />
			{activeTab === "all" && <AllTimeChart userData={userData} />}
			{activeTab === "year" && <CurrentYearChart userData={userData} />}
			{activeTab === "month" && <CurrentMonthChart userData={userData} />}
			{activeTab === "week" && <CurrentWeekChart userData={userData} />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		...constantStyles.screenStyles,
		alignItems: "center",
	},
});

export default ChartScreen;
