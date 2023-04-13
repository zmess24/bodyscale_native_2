import React from "react";
import AreaChart from "./AreaChart";
import moment from "moment";

function AllTimeChart({ userData }) {
	let yMax = 0;
	let yMin = 1000;

	let chartData = userData.entries.map((w, i) => {
		if (parseFloat(w.average) < yMin) yMin = parseFloat(w.average);
		if (parseFloat(w.average) > yMax) yMax = parseFloat(w.average);
		return { x: new Date(moment(w.startDate)), y: parseFloat(w.average), key: i };
	});

	return <AreaChart chartData={chartData} yMax={yMax} yMin={yMin} />;
}

export default AllTimeChart;
