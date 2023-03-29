import moment from "moment";
import Week from "./Week";

class User {
	constructor(initProps = undefined) {
		this.entries = initProps && initProps.entries ? initProps.entries : [];
	}

	createEntry(entry) {
		let week = this.entries.find((w) => Date.parse(w.startDate) <= Date.parse(entry.date) && Date.parse(entry.date) <= Date.parse(w.endDate));

		let { entryDate, startISODate, endISODate, currentDate } = this.#genISODates(entry, week);

		if (weightLog.length === 0 || !week) {
			let newWeek = this.#addWeek(entry, startISODate, endISODate);
			this.entries.push(newWeek);
		} else {
			// Prevent users from posting past the current date.
			if (entryDate > currentDate) throw new Error("Can't log entries past current date.");
			if (entryDate > endISODate) weightLog.push(Util.addWeek(entry));
			if (entryDate < startISODate) Util.searchWeeksAndAddEntry(weightLog, entry);
			else {
				Util.addEntry(week, entry);
			}
		}
		// console.log(week);
		let index = this.entries.findIndex((e) => e.date === entry.date);

		if (index > -1) {
			this.entries[index] = entry;
		} else {
			this.entries.push(entry);
		}

		this.#sortDates();
	}

	findEntry(date) {
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

	#addWeek(
		{ weight, date, createdAt, updatedAt },
		startDate = moment().startOf("isoWeek").format("YYYY-MM-DD"),
		endDate = moment().endOf("isoWeek").format("YYYY-MM-DD")
	) {
		return {
			startDate,
			endDate,
			entries: [{ weight, date, createdAt, updatedAt }],
			// average: this.calcWeekAverage([{ weight }])
		};
	}

	#genISODates(entry, week, newDate) {
		return {
			currentDate: Date.parse(moment().format("YYYY-MM-DD")),
			newDate: Date.parse(newDate),
			entryDate: Date.parse(entry.date),
			endISODate: week
				? Date.parse(week.endDate)
				: Date.parse(moment(entry.date.toISOString().split("T")[0]).endOf("isoWeek").format("YYYY-MM-DD")),
			startISODate: week
				? Date.parse(week.startDate)
				: Date.parse(moment(entry.date.toISOString().split("T")[0]).startOf("isoWeek").format("YYYY-MM-DD")),
		};
	}
}

export default User;
