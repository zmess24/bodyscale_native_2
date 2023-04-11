import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import constantStyles from "../../constants/styles";
import Header from "./components/Header";
import AllTimeChart from "./components/charts/AllTimeChart";
import CurrentMonthChart from "./components/charts/CurrentMonthChart";
import CurrentWeekChart from "./components/charts/CurrentWeekChart";
import CurrentYearChart from "./components/charts/currentYearChart";

function ChartScreen({ userData }) {
	const [activeTimeTab, setActiveTimeTab] = useState("all");

	return (
		<View style={styles.containter}>
			<Header setActiveTimeTab={setActiveTimeTab} activeTimeTab={activeTimeTab} />
			{activeTimeTab === "all" && <AllTimeChart userData={userData} />}
			{activeTimeTab === "year" && <CurrentYearChart userData={userData} />}
			{activeTimeTab === "month" && <CurrentMonthChart userData={userData} />}
			{activeTimeTab === "week" && <CurrentWeekChart userData={userData} />}
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
