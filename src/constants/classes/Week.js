import moment from "moment";

class Week {
	constructor(entry, startDate = moment().startOf("week").format("YYYY-MM-DD"), endDate = moment().endOf("week").format("YYYY-MM-DD")) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.data = [{ ...entry }];
		this.average = entry.weight.toFixed(2);
		this.delta = null;
	}

	calculateAverage() {
		let sum = this.data.reduce((a, c) => console.log(a, parseInt(c)), 0);
		console.log("SUM", sum);
	}
}

export default Week;
