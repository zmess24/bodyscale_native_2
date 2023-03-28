import moment from "moment";

class _Helper {
	static genISODates(entry, week, newDate) {
		return {
			currentDate: Date.parse(moment().format("YYYY-MM-DD")),
			newDate: Date.parse(newDate),
			entryDate: Date.parse(entry.date),
			endISODate: week
				? Date.parse(week.endDate)
				: Date.parse(
						moment(entry.date.toISOString().split("T")[0])
							.endOf("isoWeek")
							.format("YYYY-MM-DD")
				  ),
			startISODate: week
				? Date.parse(week.startDate)
				: Date.parse(
						moment(entry.date.toISOString().split("T")[0])
							.startOf("isoWeek")
							.format("YYYY-MM-DD")
				  ),
		};
	}

	static addWeek(
		{ _id, weight, date, createdAt, updatedAt },
		startDate = moment().startOf("isoWeek").format("YYYY-MM-DD"),
		endDate = moment().endOf("isoWeek").format("YYYY-MM-DD")
	) {
		return {
			startDate,
			endDate,
			entries: [{ _id, weight, date, createdAt, updatedAt }],
			average: this.calcWeekAverage([{ weight }]),
		};
	}

	static searchEntryDates({ weightLog }, newDate) {
		let found = false;
		weightLog.find((w) => {
			if (w.entries.find((e) => Date.parse(e.date) === newDate))
				found = true;
		});
		return found;
	}

	static searchWeeksAndAddEntry(weightLog, entry, edit = false) {
		let entryDate = Date.parse(entry.date);
		let week = weightLog.find(
			(w) =>
				Date.parse(w.startDate) <= entryDate &&
				entryDate <= Date.parse(w.endDate)
		);
		let startDate = moment(entry.date.toISOString().split("T")[0])
			.startOf("isoWeek")
			.format("YYYY-MM-DD");
		let endDate = moment(entry.date.toISOString().split("T")[0])
			.endOf("isoWeek")
			.format("YYYY-MM-DD");
		// If previous week was found, add to found week. Otherwsie create new one.
		if (edit) entry.remove();
		return week
			? this.addEntry(week, entry, entryDate)
			: weightLog.push(this.addWeek(entry, startDate, endDate, false));
	}

	// Sort weeks and entries in descending order by most recent date.
	static sortDates(weeks) {
		let sortedWeeks = weeks.sort((wA, wB) => {
			return wA.endDate - wB.endDate;
		});
		return sortedWeeks.forEach((week) =>
			week.entries.sort((eA, eB) => {
				return eA.date - eB.date;
			})
		);
	}

	/**
    |--------------------------------------------------
    | Nutritional Methods
    |--------------------------------------------------
    */

	static setMacros(nutrientObject, nutrient, percent, calories) {
		nutrientObject[nutrient].percent = percent;
		nutrientObject[nutrient].calories = Math.floor(
			nutrientObject[nutrient].percent * nutrientObject.calories
		);
		nutrientObject[nutrient].grams = Math.floor(
			nutrientObject[nutrient].calories / calories
		);
		return nutrientObject;
	}
}

module.exports = UserUtil;
