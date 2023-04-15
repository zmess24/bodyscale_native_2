import React from "react";
import { Dimensions } from "react-native";
import { VictoryArea, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";

function AreaChart({ chartData, yMin, yMax }) {
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height * 0.75;

	return (
		<VictoryChart width={windowWidth} height={windowHeight} theme={VictoryTheme.material} domain={{ y: [yMin - 5, yMax + 5] }}>
			{/* <VictoryAxis tickCount={5} dependentAxis={true} />
			<VictoryAxis tickCount={5} /> */}
			<VictoryArea
				data={chartData}
				scale={{ x: "time", y: "linear" }}
				interpolation="linear"
				style={styles}
				animate={{
					duration: 0,
					onLoad: { duration: 400 },
					easing: "sinIn",
				}}
			/>
		</VictoryChart>
	);
}

const styles = {
	data: {
		fill: "#4682B4",
		fillOpacity: 0.65,
		stroke: "#4682B4",
		strokeWidth: 3,
	},
	labels: {
		fontSize: 15,
		padding: -20,
		fill: ({ datum }) => (datum.x === 3 ? "#000000" : "#c43a31"),
	},
};

export default AreaChart;
