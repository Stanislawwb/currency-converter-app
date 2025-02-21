import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialCurrencies } from "../state/currencies/selectedCurrenciesSlice";
import { RootState } from "../state/store";

export function useUpdateSelectedCurrencies(
	dataLoaded: boolean,
	currencyRates: Record<string, number>
) {
	const dispatch = useDispatch();
	const selectedCurrencies = useSelector(
		(state: RootState) => state.selectedCurrencies.selected
	);

	useEffect(() => {
		if (!dataLoaded || Object.keys(currencyRates).length === 0) return;

		const storedSelectedCurrencies =
			sessionStorage.getItem("selectedCurrencies");
		const isAlreadyUpdated = storedSelectedCurrencies
			? JSON.stringify(selectedCurrencies) === storedSelectedCurrencies
			: Object.keys(selectedCurrencies).every(
					(currency) =>
						selectedCurrencies[currency] === currencyRates[currency]
			  );

		if (!isAlreadyUpdated) {
			const updatedCurrencies = Object.keys(selectedCurrencies).reduce(
				(acc, currency) => {
					acc[currency] = currencyRates[currency] || 0;
					return acc;
				},
				{} as Record<string, number>
			);

			dispatch(setInitialCurrencies(updatedCurrencies));
			sessionStorage.setItem(
				"selectedCurrencies",
				JSON.stringify(updatedCurrencies)
			);
		}
	}, [dataLoaded, currencyRates, selectedCurrencies, dispatch]);
}
