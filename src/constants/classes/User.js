import moment from "moment";
import Week from "./Week";

class User {
	constructor(initProps = undefined) {
		this.entries = initProps && initProps.entries ? initProps.entries : [];
	}

	createEntry(entry) {
		let week = this.entries.find((w) => Date.parse(w.startDate) <= Date.parse(entry.date) && Date.parse(entry.date) <= Date.parse(w.endDate));
		let { startOfWeek, endOfWeek } = this.#generateDates(entry, week);

		if (this.entries.length === 0 || !week) {
			console.log("CREATE NEW WEEK");
			let newWeek = this.#addWeek(entry, startOfWeek, endOfWeek);
			this.entries.push(newWeek);
		} else {
			// if (entryDate > endISODate) weightLog.push(Util.addWeek(entry));
			// if (entryDate < startISODate) Util.searchWeeksAndAddEntry(weightLog, entry);
			console.log("ADD TO EXISTING WEEK");
			// else {
			// 	Util.addEntry(week, entry);
			// }
		}
		// console.log(week);
		// let index = this.entries.findIndex((e) => e.date === entry.date);

		// if (index > -1) {
		// 	this.entries[index] = entry;
		// } else {
		// 	this.entries.push(entry);
		// }

		// this.#sortDates();
	}

	findEntry(date) {
		let week = this.entries.find((w) => Date.parse(w.startDate) <= Date.parse(date) && Date.parse(date) <= Date.parse(w.endDate));
		if (this.entries.length === 0 || !week) {
			return undefined;
		} else {
		}
		let entry = this.entries.find((e) => e.date === date);
		return entry ? entry : null;
	}

	/**
    |--------------------------------------------------
    | Private Class Methods
    |--------------------------------------------------
    */

	#sortDates() {
		this.entries = this.entries.sort((eA, eB) => {
			return new Date(eA.date) - new Date(eB.date);
		});
	}

	#addWeek(entry, startDate = moment().startOf("week").format("YYYY-MM-DD"), endDate = moment().endOf("week").format("YYYY-MM-DD")) {
		return {
			startDate,
			endDate,
			days: [{ ...entry }],
			// average: this.calcWeekAverage([{ weight }])
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
