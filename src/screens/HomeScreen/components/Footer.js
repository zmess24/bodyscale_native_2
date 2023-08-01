import React from "react";
import { Text, View } from "react-native";
import DataItem from "./DataItem";
import moment from "moment";
import tw from "twrnc";
import DateChangeTabs from "../../../components/DateChangeTabs";
import CurrentWeekChart from "./CurrentWeekChart";

function Footer({ week: { average, delta, data, startDate, endDate }, hide, goal, handleDateChange }) {
	let remaining = goal ? (goal - average).toFixed(2).toString() : "--";

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
				<CurrentWeekChart startDate={startDate} endDate={endDate} data={data} />
			</View>
		</View>
	);
}

export default Footer;
