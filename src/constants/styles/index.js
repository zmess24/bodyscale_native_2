/**
|--------------------------------------------------
| COLOR THEME :: Space Blue (https://www.color-hex.com/color-palette/70273)
|--------------------------------------------------
*/

const colorTheme = {
	white: "#ffffff",
	light: "#9da5bd",
	medium: "#3a4c7a",
	dark: "#0a205a",
	darkest: "#040c24",
};

/**
|--------------------------------------------------
| COLOR THEME :: Space Blue (https://www.color-hex.com/color-palette/70273)
|--------------------------------------------------
*/

const constantStyles = {
	screenStyles: {
		backgroundColor: "white",
		flexGrow: 1,
		display: "flex",
	},
	pickerStyles: {
		position: "absolute",
		bottom: 0,
		borderColor: "red",
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
	},
	itemStyles: {
		borderColor: "blue",
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
	},
	borderHelper: {
		borderColor: "red",
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
	},
};

export { colorTheme, constantStyles };
