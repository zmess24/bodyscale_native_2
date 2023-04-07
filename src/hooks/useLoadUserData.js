import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../constants/classes";
import moment from "moment";

const useLoadUserData = () => {
	const [weight, setWeight] = useState(0);
	const [date, setDate] = useState(new Date());
	const [user, setUser] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await AsyncStorage.getItem("bodyScale_user");
				console.log("useLoadDataHook", data);
				if (data !== null) {
					let userData = JSON.parse(data);
					let newUser = new User({ ...userData });
					let entry = newUser.findEntry(moment(date).format("MM-DD-YYYY"));
					if (entry) setWeight(entry.weight);
					setUser(newUser);
				} else {
					let newUser = new User();
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
