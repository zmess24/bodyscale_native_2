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
		// let date = week.entries.find((e) => Date.parse(e.date) === entryDate);
		// if (date) throw new Error("Date already logged.");
		// week.entries.push(entry);
		// week.average = this.calcWeekAverage(week.entries);
		// return week;
	}

	findEntry(date) {
		console.log(date);
		let entry = this.entries.find((e) => e.date === date);
		return entry ? entry : null;
	}

	sortDates() {
		this.entries = this.entries.sort((eA, eB) => {
			return new Date(eA.date) - new Date(eB.date);
		});
	}
}

export default User;
