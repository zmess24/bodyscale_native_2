import React from "react";
import AreaChart from "./AreaChart";
import moment from "moment";

function CurrentWeekChart({ userData }) {
	let yMax = 0;
	let yMin = 1000;

	let chartData = userData.entries.at(-1).days.map((d, i) => {
		if (parseFloat(d.weight) < yMin) yMin = parseFloat(d.weight);
		if (parseFloat(d.weight) > yMax) yMax = parseFloat(d.weight);
		return { date: new Date(moment(d.date)), average: parseFloat(d.weight), key: i };
	});

	return <AreaChart chartData={chartData} yMax={yMax} yMin={yMin} />;
}

export default CurrentWeekChart;
