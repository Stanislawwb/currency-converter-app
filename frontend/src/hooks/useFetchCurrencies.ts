import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencies } from "../state/currencies/currencySlice";
import { convertAllCurrencies } from "../state/currencies/conversionSlice";
import { AppDispatch, RootState } from "../state/store";

export function useFetchCurrencies() {
	const dispatch = useDispatch<AppDispatch>();
	const [dataLoaded, setDataLoaded] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [dataFetched, setDataFetched] = useState(false);

	const rates = useSelector((state: RootState) => state.currency.rates);
	const currencyError = useSelector(
		(state: RootState) => state.currency.error
	);

	useEffect(() => {
		if (dataFetched || Object.keys(rates).length > 0) {
			setDataLoaded(true);
			return;
		}

		setDataFetched(true);

		dispatch(fetchCurrencies()).then((result) => {
			if (result.meta.requestStatus === "fulfilled") {
				dispatch(
					convertAllCurrencies({ amount: 1, fromCurrency: "USD" })
				);
				setDataLoaded(true);
			} else {
				setError(currencyError || "Error loading currency data.");
			}
		});
	}, [dispatch, dataFetched]);

	return { dataLoaded, error };
}
