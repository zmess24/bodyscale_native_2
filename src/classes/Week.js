class Week {
	constructor(startDate, endDate) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.average = 0;
		this.entries = [];
	}

	static calcWeekAverage(entries) {
		let initialValue = 0;
		return (
			entries.reduce((a, c) => a + c.weight, initialValue) /
			entries.length
		);
	}
}

export { Week };
