import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import constantStyles from "../constants/styles";
import moment from "moment";

function DatePicker({ handleDateChange, date }) {
	const tomorrow = new Date(moment().add(1, "days").format("YYYY-MM-DD"));

	return (
		<DateTimePicker
			maximumDate={tomorrow}
			style={constantStyles.pickerStyles}
			value={date}
			mode={"date"}
			display={"spinner"}
			onChange={handleDateChange}
		/>
	);
}

export default DatePicker;
