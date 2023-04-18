import React from "react";
import AreaChart from "./AreaChart";
import moment from "moment";

function CurrentWeekChart({ userData }) {
	let yMax = 0;
	let yMin = 1000;

	let chartData = userData.entries.at(-1).data.map((d, i) => {
		if (parseFloat(d.weight) < yMin) yMin = parseFloat(d.weight);
		if (parseFloat(d.weight) > yMax) yMax = parseFloat(d.weight);
		return { x: moment(d.date).format("MM/DD"), y: parseFloat(d.weight), key: i };
	});

	return <AreaChart chartData={chartData} yMax={yMax} yMin={yMin} />;
}

export default CurrentWeekChart;
