class User {
	constructor() {
		this.entries = [];
	}

	addEntry(entry) {
		let index = this.entries.findIndex((e) => e.date === entry.date);

		if (index > -1) {
			this.entries[index] = entry;
		} else {
			this.entries.push(entry);
		}
		// let date = week.entries.find((e) => Date.parse(e.date) === entryDate);
		// if (date) throw new Error("Date already logged.");
		// week.entries.push(entry);
		// week.average = this.calcWeekAverage(week.entries);
		// return week;
	}
}

export default User;
