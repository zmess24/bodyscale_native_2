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
		return (
			<Picker.Item
				label={`${i}`}
				value={i}
				key={i}
				style={{ borderColor: "blue", borderBottomWidth: 1, borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1 }}
			/>
		);
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
				justifyContent: "center",
				alignContent: "flex-end",
				height: 200,
				marginLeft: 30,
				marginRight: 30,
			}}
		>
			<Picker
				style={{ width: "50%" }}
				selectedValue={value}
				onValueChange={onValueChange}
				itemStyle={{
					textAlign: "right",
					borderColor: "blue",
					borderBottomWidth: 1,
					borderTopWidth: 1,
					borderLeftWidth: 1,
					borderRightWidth: 1,
				}}
			>
				{intItems}
			</Picker>
			<Picker style={{ width: "50%" }} selectedValue={value} onValueChange={onValueChange} itemStyle={{ textAlign: "left" }}>
				{floatItems}
			</Picker>
		</View>
	);
}

export default WeightPicker;
