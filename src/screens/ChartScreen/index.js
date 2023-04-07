import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import constantStyles from "../../constants/styles";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory-native";
import Header from "./components/Tabs";
import moment from "moment";

function ChartScreen({ userData }) {
	const windowWidth = Dimensions.get("window").width * 0.97;
	const windowHeight = Dimensions.get("window").height * 0.75;
	let averages = userData.entries.map((w) => {
		return { date: moment(w.startDate).format("MM-DD"), average: w.average };
	});

	return (
		<View style={styles.containter}>
			<Header />
			<VictoryChart width={windowWidth} height={windowHeight} theme={VictoryTheme.material}>
				<VictoryArea data={averages} x="date" y="average" style={styles.areaChart} />
			</VictoryChart>
		</View>
	);
}

const styles = StyleSheet.create({
	containter: {
		...constantStyles.screenStyles,
		alignItems: "center",
		justifyContent: "center",
	},
	areaChart: {
		data: {
			fill: "#c43a31",
			fillOpacity: 0.7,
			stroke: "#c43a31",
			strokeWidth: 3,
		},
		labels: {
			fontSize: 15,
			padding: -20,
			fill: ({ datum }) => (datum.x === 3 ? "#000000" : "#c43a31"),
		},
	},
});

export default ChartScreen;
