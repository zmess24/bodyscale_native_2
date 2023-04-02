import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

function WeightPicker({ onValueChange, value }) {
	let range = new Array(500 - 50).fill().map((d, i) => i + 50);

	const pickerItems = range.map((i, v) => {
		return <Picker.Item label={`${i} lbs`} value={i} key={i} />;
	});

	console.log(pickerItems);

	return (
		<Picker style={{ position: "absolute", bottom: 0, width: 500, height: 300 }} selectedValue={value} onValueChange={onValueChange}>
			{pickerItems}
		</Picker>
	);
}

export default WeightPicker;
