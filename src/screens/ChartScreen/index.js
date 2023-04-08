import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import constantStyles from "../../constants/styles";
import { VictoryArea, VictoryChart, VictoryTheme, VictoryZoomContainer } from "victory-native";
import Header from "./components/Tabs";
import moment from "moment";

function ChartScreen({ userData }) {
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height * 0.75;
	let yMax = 0,
		yMin = 0;
	let averages = userData.entries.map((w, i) => {
		if (w.average > yMax) yMax = Math.round(w.average);
		return { date: new Date(moment(w.startDate)), average: Math.round(w.average), key: i };
	});
	return (
		<View style={styles.containter}>
			<Header />
			<VictoryChart
				width={windowWidth}
				height={windowHeight}
				theme={VictoryTheme.material}
				scale={{ x: "time" }}
				minDomain={{ y: 150 }}
				maxDomain={{ y: yMax + 15 }}
				containerComponent={<VictoryZoomContainer />}
			>
				<VictoryArea
					data={averages}
					interpolation="linear"
					x="date"
					y="average"
					style={styles.areaChart}
					animate={{
						duration: 0,
						onLoad: { duration: 500 },
					}}
				/>
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
		// labels: {
		// 	fontSize: 15,
		// 	padding: -20,
		// 	fill: ({ datum }) => (datum.x === 3 ? "#000000" : "#c43a31"),
		// },
	},
});

export default ChartScreen;
