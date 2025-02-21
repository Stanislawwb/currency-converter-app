import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencies } from "../state/currencies/currencySlice";
import { AppDispatch, RootState } from "../state/store";

export function useFetchCurrencies() {
	const dispatch = useDispatch<AppDispatch>();
	const [dataLoaded, setDataLoaded] = useState(false);
	const currencyRates = useSelector(
		(state: RootState) => state.currency.rates
	);

	useEffect(() => {
		const storedRates = sessionStorage.getItem("convertedValues");

		if (storedRates) {
			setDataLoaded(true);
		} else {
			dispatch(fetchCurrencies()).then((response) => {
				sessionStorage.setItem(
					"convertedValues",
					JSON.stringify(response.payload.rates)
				);
				setDataLoaded(true);
			});
		}
	}, [dispatch]);

	return { dataLoaded, currencyRates };
}
