import React from "react";
import { Text, View, Dimensions } from "react-native";
import DataItem from "./DataItem";
import moment from "moment";
import tw from "twrnc";
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis, VictoryTheme, VictoryGroup } from "victory-native";

function Footer({ week: { average, delta, data, startDate, endDate }, hide, goal }) {
	let remaining = goal ? (goal - average).toFixed(2).toString() : "--";
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height * 0.25;

	let yMax = 215;
	let yMin = 200;

	const enumerateDaysBetweenDates = (startDate, endDate) => {
		let dates = [];

		while (moment(startDate) <= moment(endDate)) {
			dates.push(startDate);
			startDate = moment(startDate).add(1, "days").format("YYYY-MM-DD");
		}

		return dates;
	};

	let currentWeek = enumerateDaysBetweenDates(startDate, endDate);

	console.log(currentWeek);

	let chartData = currentWeek.map((date, i) => {
		let found = data.find((entry) => entry.date == date);
		if (found) {
			if (parseFloat(found.weight) < yMin) yMin = parseFloat(found.weight);
			if (parseFloat(found.weight) > yMax) yMax = parseFloat(found.weight);
			return { x: moment(date).format("MM/DD"), y: parseFloat(found.weight), key: i };
		} else {
			return { x: moment(date).format("MM/DD"), y: null, key: i };
		}
	});

	// let chartData = data
	// 	.sort((a, b) => new Date(a.date) - new Date(b.date))
	// 	.map((entry, i) => {
	// 		if (parseFloat(entry.weight) < yMin) yMin = parseFloat(entry.weight);
	// 		if (parseFloat(entry.weight) > yMax) yMax = parseFloat(entry.weight);
	// 		return { x: moment(entry.date).format("MM/DD"), y: parseFloat(entry.weight), key: i };
	// 	});

	console.log(chartData);

	console.log(chartData);
	return (
		<View style={tw.style("flex-col", hide && "opacity-0")}>
			<View style={tw.style("flex flex-row justify-center mb-5")}>
				<Text style={tw.style("text-sm text-gray-500")}>
					{moment(startDate).format("MMMM Do")} - {moment(endDate).format("MMMM Do, YYYY")}
				</Text>
			</View>
			<View style={tw.style("flex flex-row justify-between")}>
				<DataItem icon="scale-bathroom" position={""} int={average} type={"numeric"} />
				<DataItem icon="exchange" int={delta} />
				<DataItem icon="bullseye" int={remaining} type={remaining === undefined ? "numeric" : "change"} />
			</View>
			<View style={tw.style("flex flex-row")}>
				<VictoryChart width={windowWidth} height={windowHeight} theme={VictoryTheme.material} domain={{ y: [yMin - 5, yMax + 5] }}>
					{/* <VictoryGroup data={chartData} tickValues={currentWeek} tickFor> */}
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
						// tickValues={currentWeek}
					/>
					<VictoryLine
						interpolation="monotoneX"
						style={{ data: { stroke: "black", strokeWidth: 2, strokeLinecap: "round" } }}
						scale={{ x: "time", y: "linear" }}
						data={chartData}
					/>
					<VictoryScatter
						size={4}
						labels={({ datum }) => datum.y}
						style={{ data: { fill: "white", stroke: "#C0C0C0", strokeWidth: 1 } }}
						data={chartData}
					/>
					{/* </VictoryGroup> */}
				</VictoryChart>
			</View>
		</View>
	);
}

export default Footer;
