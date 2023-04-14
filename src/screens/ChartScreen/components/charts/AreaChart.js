import React from "react";
import { Dimensions } from "react-native";
import { VictoryArea, VictoryChart, VictoryTheme, VictoryZoomContainer, VictoryScatter, VictoryLabel } from "victory-native";

function AreaChart({ chartData, yMin, yMax }) {
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height * 0.75;

	return (
		<VictoryChart
			width={windowWidth}
			height={windowHeight}
			theme={VictoryTheme.material}
			domain={{ y: [yMin - 5, yMax + 5] }}
			containerComponent={<VictoryZoomContainer />}
		>
			<VictoryArea
				data={chartData}
				scale={{ x: "time", y: "linear" }}
				interpolation="linear"
				style={styles}
				animate={{
					duration: 0,
					onLoad: { duration: 500 },
				}}
			/>
			<VictoryScatter
				data={chartData}
				size={5}
				scale={{ x: "time", y: "linear" }}
				style={{ data: { fill: "#c43a31" } }}
				animate={{
					duration: 0,
					onLoad: { duration: 500 },
				}}
			/>
		</VictoryChart>
	);
}

const styles = {
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
};

export default AreaChart;
