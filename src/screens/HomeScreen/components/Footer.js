import React from "react";
import { Text, View, Dimensions } from "react-native";
import DataItem from "./DataItem";
import moment from "moment";
import tw from "twrnc";
import DateChangeTabs from "../../../components/DateChangeTabs";
import { VictoryChart, VictoryArea, VictoryScatter, VictoryAxis, VictoryTheme } from "victory-native";
import { colorTheme } from "../../../constants/styles";

function Footer({ week: { average, delta, data, startDate, endDate }, hide, goal, handleDateChange }) {
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

	let chartData = data
		.sort((a, b) => new Date(a.date) - new Date(b.date))
		.map((entry, i) => {
			if (parseFloat(entry.weight) < yMin) yMin = parseFloat(entry.weight);
			if (parseFloat(entry.weight) > yMax) yMax = parseFloat(entry.weight);
			return { x: moment(entry.date).format("YYYY-MM-DD"), y: parseFloat(entry.weight), key: i };
		});

	console.log("Current Week", currentWeek);
	console.log("Data", chartData);
	return (
		<View style={tw.style("flex-col", hide && "opacity-0")}>
			<DateChangeTabs date={startDate} handleDateChange={handleDateChange} dateUnit={"w"} size={18} padding={"mx-12"}>
				<Text style={tw.style("text-sm text-gray-500 ")}>
					{moment(startDate).format("MMM Do")} - {moment(endDate).format("MMM Do, YYYY")}
				</Text>
			</DateChangeTabs>
			<View style={tw.style("flex flex-row justify-between mt-5")}>
				<DataItem icon="scale-bathroom" position={""} int={average} type={"numeric"} />
				<DataItem icon="exchange" int={delta} />
				<DataItem icon="bullseye" int={remaining} type={remaining === undefined ? "numeric" : "change"} />
			</View>
			<View style={tw.style("flex flex-row")}>
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
						tickValues={currentWeek}
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
			</View>
		</View>
	);
}

export default Footer;
