import React, { useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import constantStyles from "../styles";

function WeightPicker({ onValueChange, value }) {
	const [float, setFloat] = useState(0);
	const [int, setInt] = useState(0);
	const intRange = new Array(500 - 50).fill().map((d, i) => i + 50);
	const floatRange = new Array(9 - 1).fill().map((d, i) => i + 1);

	const intItems = intRange.map((i, v) => {
		return <Picker.Item label={`${i}`} value={i} key={i} style={{ height: 10 }} />;
	});

	const floatItems = floatRange.map((i, v) => {
		let float = (i / 10).toString().substring(1);
		return <Picker.Item label={`${float} lbs`} value={float} key={float} />;
	});

	return (
		<View
			style={{
				...constantStyles.borderHelper,
				position: "absolute",
				bottom: 0,
				display: "flex",
				flexDirection: "row",
				height: 200,
				marginLeft: 30,
				marginRight: 30,
			}}
		>
			<Picker
				style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center" }}
				selectedValue={value}
				onValueChange={onValueChange}
				itemStyle={{ textAlign: "right", border: "green" }}
			>
				{intItems}
			</Picker>
			<Picker
				style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center" }}
				selectedValue={value}
				onValueChange={onValueChange}
				itemStyle={{ textAlign: "left" }}
			>
				{floatItems}
			</Picker>
		</View>
	);
}

export default WeightPicker;
