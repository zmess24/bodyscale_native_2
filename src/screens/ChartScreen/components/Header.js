import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import constantStyles from "../../../constants/styles";

function Header({ activeTab, setActiveTab }) {
	const tabsObject = [
		{ key: "all", text: "All Time" },
		{ key: "year", text: "This Year" },
		{ key: "month", text: "This Month" },
		{ key: "week", text: "This Week" },
	];

	const tabs = tabsObject.map(({ key, text }, i) => {
		let buttonStyle;
		if (i === 0) {
			buttonStyle = styles.buttonLeft;
		} else if (i === tabsObject.length - 1) {
			buttonStyle = styles.buttonRight;
		} else {
			buttonStyle = styles.buttonMiddle;
		}
		return (
			<TouchableOpacity
				onPress={() => setActiveTab(key)}
				activeOpacity={1}
				key={i}
				style={[styles.button, buttonStyle, activeTab === key ? styles.activeButton : styles.inactiveButton]}
			>
				<Text style={activeTab === key ? styles.activeText : styles.inactiveText}>{text}</Text>
			</TouchableOpacity>
		);
	});

	return <View style={styles.container}>{tabs}</View>;
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		width: "80%",
		justifyContent: "space-around",
		marginTop: 15,
	},
	button: {
		padding: 8,
	},
	buttonMiddle: {
		borderWidth: 1,
		border: 8,
	},
	buttonLeft: {
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		borderWidth: 1,
	},
	buttonRight: {
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		borderWidth: 1,
	},
	activeButton: {
		backgroundColor: "black",
	},
	inactiveButton: {
		backgroundColor: "white",
	},
	activeText: {
		color: "white",
	},
	inactiveText: {
		color: "black",
	},
});

export default Header;
