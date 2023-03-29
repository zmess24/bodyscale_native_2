class User {
	constructor(initProps = undefined) {
		this.entries = initProps && initProps.entries ? initProps.entries : [];
	}

	addEntry(entry) {
		let index = this.entries.findIndex((e) => e.date === entry.date);

		if (index > -1) {
			this.entries[index] = entry;
		} else {
			this.entries.push(entry);
		}

		this.sortDates();
		this.#genISODates();
	}

	findEntry(date) {
		let entry = this.entries.find((e) => e.date === date);
		return entry ? entry : null;
	}

	sortDates() {
		this.entries = this.entries.sort((eA, eB) => {
			return new Date(eA.date) - new Date(eB.date);
		});
	}

	#genISODates(entry, week, newDate) {
		// return {
		// 	currentDate: Date.parse(moment().format("YYYY-MM-DD")),
		// 	newDate: Date.parse(newDate),
		// 	entryDate: Date.parse(entry.date),
		// 	endISODate: week
		// 		? Date.parse(week.endDate)
		// 		: Date.parse(
		// 				moment(entry.date.toISOString().split("T")[0])
		// 					.endOf("isoWeek")
		// 					.format("YYYY-MM-DD")
		// 		  ),
		// 	startISODate: week
		// 		? Date.parse(week.startDate)
		// 		: Date.parse(
		// 				moment(entry.date.toISOString().split("T")[0])
		// 					.startOf("isoWeek")
		// 					.format("YYYY-MM-DD")
		// 		  ),
		// };
		console.log("TESTING PRIVATE METHOD");
	}
}

export default User;
