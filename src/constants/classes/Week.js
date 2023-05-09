import moment from "moment";

class Week {
	constructor(entry) {
		this.startDate = moment(entry.date).startOf("week").format("YYYY-MM-DD");
		this.endDate = moment(entry.date).endOf("week").format("YYYY-MM-DD");
		this.data = [{ ...entry }];
		this.average = entry.weight.toFixed(2);
		this.delta = "0";
	}
}

export default Week;
