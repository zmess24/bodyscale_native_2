import React from "react";
import AreaChart from "./AreaChart";
import moment from "moment";

function CurrentMonthChart({ userData }) {
	let yMax = 0;
	let yMin = 1000;
	console.log("Current month is:", moment().month());

	let chartData = userData.entries.map((w, i) => {
		if (parseFloat(w.average) < yMin) yMin = parseFloat(w.average);
		if (parseFloat(w.average) > yMax) yMax = parseFloat(w.average);
		return { date: new Date(moment(w.startDate)), average: parseFloat(w.average), key: i };
	});

	return <AreaChart chartData={chartData} yMax={yMax} yMin={yMin} />;
}

export default CurrentMonthChart;
