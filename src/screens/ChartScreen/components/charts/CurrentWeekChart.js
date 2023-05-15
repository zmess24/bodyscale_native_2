import React from "react";
import AreaChart from "./AreaChart";
import moment from "moment";
import { Text } from "react-native";

function CurrentWeekChart({ userData }) {
	let yMax = 0;
	let yMin = 1000;

	console.log(userData.entries);

	let chartData = userData.entries
		.at(0)
		.data.sort((a, b) => new Date(a.date) - new Date(b.date))
		.map((d, i) => {
			if (parseFloat(d.weight) < yMin) yMin = parseFloat(d.weight);
			if (parseFloat(d.weight) > yMax) yMax = parseFloat(d.weight);
			return { x: moment(d.date).format("MM/DD"), y: parseFloat(d.weight), key: i };
		});

	console.log("RENDER CHART", chartData.length >= 2);
	if (chartData.length >= 2) {
		return <AreaChart chartData={chartData} yMax={yMax} yMin={yMin} />;
	} else {
		return <Text style={tw.style("text-4xl font-bold tracking-tight")}>Not Enough Data</Text>;
	}
}

export default CurrentWeekChart;
