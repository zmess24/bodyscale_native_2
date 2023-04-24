import { useEffect, useState } from "react";
import { loadStorageData } from "../db";
import { User } from "../constants/classes";
import moment from "moment";

const useLoadUserData = () => {
	const [weight, setWeight] = useState(0);
	const [date, setDate] = useState(new Date());
	const [user, setUser] = useState(new User());

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await loadStorageData();
				if (data !== null) {
					let userData = JSON.parse(data);
					let newUser = new User({ ...userData });
					let entry = newUser.findEntry(moment(date).format("YYYY-MM-DD"));
					console.log(entry);
					if (entry) setWeight(entry.weight);
					setUser(newUser);
				}
			} catch (err) {
				console.log(err.message);
			}
		};

		fetchData();
	}, []);

	return { user, setUser, weight, setWeight, date, setDate };
};

export default useLoadUserData;
