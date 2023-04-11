import React from "react";
import { StyleSheet, View } from "react-native";
import constantStyles from "../../constants/styles";
import Header from "./components/Tabs";
import AllTimeChart from "./components/charts/AllTimeChart";

function ChartScreen({ userData }) {
	return (
		<View style={styles.containter}>
			<Header />
			<AllTimeChart userData={userData} />
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
