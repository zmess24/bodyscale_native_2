import Week from "./Week";

class User {
	constructor(initProps = undefined) {
		this.entries = initProps && initProps.entries ? initProps.entries : [];
		this.activityMultiplyer = 0;
		this.age = 0;
		this.gender = null;
		this.height = 0;
		this.bodyFat = 0;
	}

	createEntry(entry) {
		let week = this.entries.find((w) => Date.parse(w.startDate) <= Date.parse(entry.date) && Date.parse(entry.date) <= Date.parse(w.endDate));

		if (this.entries.length === 0 || !week) {
			let newWeek = new Week(entry);
			this.entries.push(newWeek);
			this.entries.sort((a, b) => new Date(a.endDate) - new Date(b.startDate));
		} else {
			let dayIndex = week.data.findIndex(({ date }) => date === entry.date);
			dayIndex > -1 ? (week.data[dayIndex].weight = entry.weight) : week.data.push(entry);
			week.data.sort((a, b) => new Date(b.date) - new Date(a.date));
			week.average = (week.data.reduce((a, c) => a + c.weight, 0) / week.data.length).toFixed(2);
		}

		this.#calculateDeltas();
	}

	findEntry(date) {
		let week = this.entries.find((w) => Date.parse(w.startDate) <= Date.parse(date) && Date.parse(date) <= Date.parse(w.endDate));
		if (this.entries.length === 0 || !week) {
			return undefined;
		} else {
			let entry = week.data.find((e) => e.date === date);
			return entry;
		}
	}

	/**
    |--------------------------------------------------
    | Private Class Methods
    |--------------------------------------------------
    */

	#calculateDeltas() {
		this.entries.forEach((week, i) => {
			let prevWeek = this.entries[i - 1];
			if (prevWeek) week.delta = (week.average - prevWeek.average).toFixed(2);
		});
	}
}

export default User;
