import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import BottomDrawer from "react-native-animated-bottom-drawer";

const SettingsDrawer = ({ bottomDrawerRef }) => {
	return (
		<SafeAreaView style={styles.container}>
			<BottomDrawer ref={bottomDrawerRef} openOnMount>
				<View style={styles.contentContainer}>
					<Text>Awesome 🎉</Text>
				</View>
			</BottomDrawer>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
	},
	contentContainer: {
		flex: 1,
		alignItems: "center",
	},
});

export default SettingsDrawer;
