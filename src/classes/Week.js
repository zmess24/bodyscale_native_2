class Week {
	constructor(startDate, endDate) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.average = 0;
		this.entries = [];
	}

	static calcWeekAverage(entries) {
		this.entries =
			entries.reduce((a, c) => a + c.weight, 0) / entries.length;
	}
}

export { Week };
