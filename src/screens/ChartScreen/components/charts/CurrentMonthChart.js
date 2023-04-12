import React from "react";
import AreaChart from "./AreaChart";
import moment from "moment";

function CurrentMonthChart({ userData }) {
	let yMax = 0;
	let yMin = 1000;
	let firstOfMonth = Date.parse(moment().date(1).format("YYYY-MM-DD"));
	let endOfMonth = Date.parse(moment().date(1).endOf("month").format("YYYY-MM-DD"));

	let chartData = userData.entries
		.filter((w) => {
			if (firstOfMonth < new Date(moment(w.startDate)) && new Date(moment(w.startDate)) < endOfMonth) return w;
		})
		.map((w, i) => {
			if (parseFloat(w.average) < yMin) yMin = parseFloat(w.average);
			if (parseFloat(w.average) > yMax) yMax = parseFloat(w.average);
			return { date: new Date(moment(w.startDate)), average: parseFloat(w.average), key: i };
		});

	return <AreaChart chartData={chartData} yMax={yMax} yMin={yMin} />;
}

export default CurrentMonthChart;
