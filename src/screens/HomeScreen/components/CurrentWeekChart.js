import React, { useState } from "react";
import { Dimensions } from "react-native";
import moment from "moment";
import { VictoryChart, VictoryArea, VictoryScatter, VictoryAxis, VictoryTheme } from "victory-native";
import { colorTheme } from "../../../constants/styles";

function CurrentWeekChart({ startDate, endDate, data }) {
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height * 0.25;
	let yMax = 215;
	let yMin = 200;

	let enumerateDaysBetweenDates = (startDate, endDate) => {
		let dates = [];

		while (moment(startDate) <= moment(endDate)) {
			dates.push(startDate);
			startDate = moment(startDate).add(1, "days").format("YYYY-MM-DD");
		}

		return dates;
	};

	let chartData = data
		.sort((a, b) => new Date(a.date) - new Date(b.date))
		.map((entry, i) => {
			if (parseFloat(entry.weight) < yMin) yMin = parseFloat(entry.weight);
			if (parseFloat(entry.weight) > yMax) yMax = parseFloat(entry.weight);
			return { x: moment(entry.date).format("YYYY-MM-DD"), y: parseFloat(entry.weight), key: i };
		});

	return (
		<VictoryChart width={windowWidth} height={windowHeight} theme={VictoryTheme.material} domain={{ y: [yMin - 5, yMax + 5] }}>
			<VictoryAxis
				dependentAxis
				maxDomain={{ y: 5 }}
				style={{
					grid: { stroke: "white", strokeWidth: 0 },
					ticks: { stroke: "white", strokeWidth: 0 },
				}}
			/>
			<VictoryAxis
				tickValues={enumerateDaysBetweenDates(startDate, endDate)}
				maxDomain={{ x: 7 }}
				style={{
					grid: { stroke: "lightgrey", strokeWidth: 1 },
					ticks: { stroke: "white", strokeWidth: 0 },
				}}
				tickFormat={(t) => `${moment(t).format("ddd")}\n${moment(t).format("D")}`}
			/>
			<VictoryArea
				interpolation="monotoneX"
				style={{ data: { stroke: colorTheme.accent, strokeWidth: 2, fill: colorTheme.accent, fillOpacity: 0.25 } }}
				scale={{ x: "time", y: "linear" }}
				data={chartData}
			/>
			<VictoryScatter size={4} style={{ data: { fill: "white", stroke: colorTheme.accent, strokeWidth: 1 } }} data={chartData} />
		</VictoryChart>
	);
}

export default CurrentWeekChart;
