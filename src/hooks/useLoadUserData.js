import { useEffect, useState } from "react";
import { loadStorageData } from "../db";
import { User, Week } from "../constants/classes";

const useLoadUserData = () => {
	const [weight, setWeight] = useState(0);
	const [date, setDate] = useState(new Date());
	const [user, setUser] = useState(new User());
	const [week, setWeek] = useState(new Week({ date: new Date(), weight: 0 }));
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await loadStorageData();
				if (data !== null) {
					let userData = JSON.parse(data);
					let newUser = new User({ ...userData });
					let entry = newUser.findEntry(date);
					let week = newUser.findWeek(date);
					console.log(entry);
					if (entry) setWeight(entry.weight);
					if (week) setWeek(week);
					setUser(newUser);
				}
				setAppIsReady(true);
			} catch (err) {
				console.log(err.message);
			}
		};

		fetchData();
	}, []);

	return { user, setUser, weight, setWeight, date, setDate, week, setWeek, appIsReady };
};

export default useLoadUserData;
