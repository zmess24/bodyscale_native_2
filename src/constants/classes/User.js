import moment from "moment";

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
			let { startOfWeek, endOfWeek } = this.#generateDates(entry, week);
			let newWeek = this.#createWeek(entry, startOfWeek, endOfWeek);
			this.entries.push(newWeek);
			this.entries.sort((a, b) => new Date(a.endDate) - new Date(b.startDate));
		} else {
			console.log("Find index");
			let dayIndex = week.data.findIndex(({ date }) => date === entry.date);
			console.log(dayIndex);
			dayIndex > -1 ? (week.data[dayIndex].weight = entry.weight) : week.data.push(entry);
			week.data.sort((a, b) => new Date(a.date) - new Date(b.date));
			week.average = (week.data.reduce((a, c) => a + c.weight, 0) / week.data.length).toFixed(2);
		}
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

	#createWeek(entry, startDate = moment().startOf("week").format("YYYY-MM-DD"), endDate = moment().endOf("week").format("YYYY-MM-DD")) {
		return {
			startDate,
			endDate,
			data: [{ ...entry }],
			average: entry.weight.toFixed(2),
		};
	}

	#generateDates(entry, week) {
		return {
			startOfWeek: week ? week.endDate : moment(entry.date).startOf("week").format("YYYY-MM-DD"),
			endOfWeek: week ? week.startDate : moment(entry.date).endOf("week").format("YYYY-MM-DD"),
		};
	}
}

export default User;
