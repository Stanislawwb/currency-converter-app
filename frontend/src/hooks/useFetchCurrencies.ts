import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrencies } from "../state/currencies/currencySlice";
import { AppDispatch, RootState } from "../state/store";
import { useSelector } from "react-redux";
import { convertAllCurrencies } from "../state/currencies/conversionSlice";

export function useFetchCurrencies() {
	const dispatch = useDispatch<AppDispatch>();
	const [dataLoaded, setDataLoaded] = useState(false);
	const rates = useSelector((state: RootState) => state.currency.rates);

	useEffect(() => {
		if (Object.keys(rates).length === 0) {
			dispatch(fetchCurrencies()).then((result) => {
				if (result.meta.requestStatus === "fulfilled") {
					dispatch(
						convertAllCurrencies({ amount: 1, fromCurrency: "USD" })
					);
					setDataLoaded(true);
				}
			});
		} else {
			setDataLoaded(true);
		}
	}, [dispatch, rates]);

	return { dataLoaded };
}
