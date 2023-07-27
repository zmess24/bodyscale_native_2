import React, { useState } from "react";
import tw from "twrnc";
import { View } from "react-native";
import Header from "./components/Header";
import AllTimeChart from "./components/charts/AllTimeChart";
import CurrentYearChart from "./components/charts/CurrentYearChart";
import CurrentMonthChart from "./components/charts/CurrentMonthChart";
import CurrentWeekChart from "./components/charts/CurrentWeekChart";

function ChartScreen({ userData }) {
	const [activeTab, setActiveTab] = useState("all");

	return (
		<View style={tw.style("flex flex-col justify-between grow bg-white pl-3 pr-3 pt-15")}>
			<Header setActiveTab={setActiveTab} activeTab={activeTab} />
			<View style={tw.style("flex flex-row")}>
				{activeTab === "all" && <AllTimeChart userData={userData} />}
				{activeTab === "year" && <CurrentYearChart userData={userData} />}
				{activeTab === "month" && <CurrentMonthChart userData={userData} />}
				{activeTab === "week" && <CurrentWeekChart userData={userData} />}
			</View>
			<View style={tw.style("flex flex-row")}></View>
		</View>
	);
}

export default ChartScreen;
