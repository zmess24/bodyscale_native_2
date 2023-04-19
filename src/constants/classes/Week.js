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
		let sum = 0;
		this.data.forEach(({ weight }) => {
			sum += weight;
		});

		this.average = (sum / this.data.length).toFixed(2);
	}
}

export default Week;
