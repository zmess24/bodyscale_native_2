import React from "react";
import AreaChart from "./AreaChart";
import moment from "moment";

function CurrentMonthChart({ userData }) {
	let yMax = 0;
	let yMin = 1000;
	let firstOfMonth = Date.parse(moment().date(1).format("YYYY-MM-DD"));
	let lastOfMonth = Date.parse(moment().date(1).endOf("month").format("YYYY-MM-DD"));
	let chartDataDays = [];

	function findWeekRange(w) {
		let weekStart = new Date(moment(w.startDate));
		let weekEnd = new Date(moment(w.endDate));
		if ((firstOfMonth <= weekStart || firstOfMonth <= weekEnd) && (weekStart <= lastOfMonth || weekEnd <= lastOfMonth)) return w;
	}

	function findAndPushDays({ weight, date }) {
		date = new Date(moment(date));
		if (parseFloat(weight) < yMin) yMin = parseFloat(weight);
		if (parseFloat(weight) > yMax) yMax = parseFloat(weight);
		if (firstOfMonth <= date && date <= lastOfMonth) chartDataDays.push({ x: moment(date).format("MM/DD"), y: weight });
	}

	let chartDataWeeks = userData.entries.filter(findWeekRange).map((w, i) => {
		w.days.forEach(findAndPushDays);
		return { x: new Date(moment(w.startDate)), y: parseFloat(w.average), key: i };
	});

	return <AreaChart chartData={chartDataDays} yMax={yMax} yMin={yMin} />;
}

export default CurrentMonthChart;
