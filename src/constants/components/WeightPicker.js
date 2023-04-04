import React, { useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import constantStyles from "../styles";

function WeightPicker({ handleWeightChange, weight }) {
	const [int, setInt] = useState(weight.toString().indexOf(".") > -1 ? parseInt(weight.toString().split(".")[0]) : weight);
	const [float, setFloat] = useState(weight.toString().indexOf(".") > -1 ? `.${weight.toString().split(".")[1]}` : 0);
	const intRange = new Array(500 - 50).fill().map((d, i) => i + 50);
	const floatRange = new Array(10 - 0).fill().map((d, i) => i + 0);

	const intItems = intRange.map((i, v) => {
		return <Picker.Item label={`${i}`} value={i} key={i} style={{ height: 10 }} />;
	});

	const floatItems = floatRange.map((i, v) => {
		let float = (i / 10).toString().substring(1);
		return <Picker.Item label={`.${i} lbs`} value={float} key={float} />;
	});

	const handleFloatChange = (val) => {
		setFloat(val);
		let newWeight = parseFloat(int + val);
		handleWeightChange(newWeight);
	};

	const handleIntChange = (val) => {
		setInt(val);
		let newWeight = parseFloat(val + float);
		handleWeightChange(newWeight);
	};

	return (
		<View
			style={{
				...constantStyles.borderHelper,
				position: "absolute",
				bottom: 0,
				display: "flex",
				flexDirection: "row",
				height: 200,
				width: "85%",
			}}
		>
			<Picker
				style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center" }}
				selectedValue={int}
				onValueChange={handleIntChange}
				itemStyle={{ textAlign: "right", border: "green" }}
			>
				{intItems}
			</Picker>
			<Picker
				style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center" }}
				selectedValue={float}
				onValueChange={handleFloatChange}
				itemStyle={{ textAlign: "left" }}
			>
				{floatItems}
			</Picker>
		</View>
	);
}

export default WeightPicker;
