import { Dimensions } from "react-native";
import { VictoryChart, VictoryArea, VictoryScatter, VictoryAxis, VictoryTheme } from "victory-native";

function LineChart({ chartData, yMin, yMax }) {
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height * 0.25;

	return (
		<VictoryChart width={windowWidth} height={windowHeight} theme={VictoryTheme.material} domain={{ y: [yMin - 5, yMax + 5] }}>
			<VictoryAxis
				dependentAxis
				style={{
					grid: { stroke: "white", strokeWidth: 0 },
					ticks: { stroke: "white", strokeWidth: 0 },
				}}
			/>
			<VictoryAxis
				style={{
					grid: { stroke: "lightgrey", strokeWidth: 1 },
					ticks: { stroke: "white", strokeWidth: 0 },
				}}
			/>
			<VictoryArea
				data={chartData}
				interpolation="monotoneX"
				style={{ data: { stroke: "black", strokeWidth: 2, fill: "#19355f", fillOpacity: 0.25 } }}
				scale={{ x: "time", y: "linear" }}
			/>
			<VictoryScatter
				size={4}
				labels={({ datum }) => datum.y}
				style={{ data: { fill: "white", stroke: "#C0C0C0", strokeWidth: 1 } }}
				data={chartData}
			/>
		</VictoryChart>
	);
}

export default LineChart;
