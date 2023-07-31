import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "twrnc";

function Header({ onPressSettings }) {
	return (
		<View style={tw.style("flex flex-row justify-between")}>
			<TouchableOpacity style={tw.style("flex flex-col")} onPress={onPressSettings}>
				<FontAwesome name="gear" size={24} color="#00bfff" />
			</TouchableOpacity>
			<View style={styles.row}>
				<TouchableOpacity style={tw.style("flex flex-col")} onPress={onPressSettings}>
					<FontAwesome name="gear" size={24} color="#00bfff" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
	},
	row: {
		display: "flex",
		flexDirection: "row",
		fontSize: 24,
	},
});

export default Header;
