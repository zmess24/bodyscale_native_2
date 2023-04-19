import { User, Entry } from "../classes";
import moment from "moment";

function generateFakeDate() {
	console.log("Generating fake data...");
	try {
		let user = new User();
		let startOfYear = moment().startOf("year");
		let today = moment();
		let daysDiff = today.diff(startOfYear, "days");

		for (let i = 0; i < daysDiff; i++) {
			let date = moment()
				.startOf("year")
				.add(i + 1, "days")
				.format("YYYY-MM-DD");
			let weight = Math.floor(Math.random() * 11) + 200;
			let entry = new Entry(weight, date);
			user.createEntry(entry);
		}
		console.log("Fake user data...", user);
		return user;
	} catch (err) {
		console.log(err);
	}
}

export default generateFakeDate;
