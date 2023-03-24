class Week {
	constructor(startDate, endDate) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.average = 0;
		this.entries = [];
	}

	addEntry(entry) {
		this.entries.push(entry);
	}
}

export default Week;
