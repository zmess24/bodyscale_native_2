import moment from "moment";

class User {
	constructor(initProps = undefined) {
		this.entries = initProps && initProps.entries ? initProps.entries : [];
	}

	createEntry(entry) {
		let week = this.entries.find((w) => Date.parse(w.startDate) <= Date.parse(entry.date) && Date.parse(entry.date) <= Date.parse(w.endDate));

		if (this.entries.length === 0 || !week) {
			let { startOfWeek, endOfWeek } = this.#generateDates(entry, week);
			let newWeek = this.#createWeek(entry, startOfWeek, endOfWeek);
			this.entries.push(newWeek);
			this.entries.sort((a, b) => new Date(a.endDate) - new Date(b.startDate));
		} else {
			let dayIndex = week.days.findIndex(({ date }) => date === entry.date);
			dayIndex > -1 ? (week.days[dayIndex].weight = entry.weight) : week.days.push(entry);
			week.days.sort((a, b) => new Date(a.date) - new Date(b.date));
			week.average = (week.days.reduce((a, c) => a + c.weight, 0) / week.days.length).toFixed(2);
		}
	}

	findEntry(date) {
		let week = this.entries.find((w) => Date.parse(w.startDate) <= Date.parse(date) && Date.parse(date) <= Date.parse(w.endDate));
		if (this.entries.length === 0 || !week) {
			return undefined;
		} else {
			let entry = week.days.find((e) => e.date === date);
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
			days: [{ ...entry }],
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
