import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCurrencies = ["USD", "EUR", "RUB", "BYN"];

const storedCurrencies = JSON.parse(
	sessionStorage.getItem("selectedCurrencies") || "null"
);

const initialState: string[] = storedCurrencies ?? initialCurrencies;

const selectedCurrenciesSlice = createSlice({
	name: "selectedCurrencies",
	initialState,
	reducers: {
		addCurrency: (state, action: PayloadAction<string>) => {
			if (!state.includes(action.payload)) {
				state.push(action.payload);

				sessionStorage.setItem(
					"selectedCurrencies",
					JSON.stringify(state)
				);
			}
		},
		removeCurrency: (state, action: PayloadAction<string>) => {
			const updatedState = state.filter(
				(currency) => currency !== action.payload
			);
			sessionStorage.setItem(
				"selectedCurrencies",
				JSON.stringify(updatedState)
			);
			return updatedState;
		},
		resetCurrencies: () => {
			sessionStorage.setItem(
				"selectedCurrencies",
				JSON.stringify(initialCurrencies)
			);
			return initialCurrencies;
		},
	},
});

export const { addCurrency, removeCurrency, resetCurrencies } =
	selectedCurrenciesSlice.actions;
export { initialCurrencies };
export default selectedCurrenciesSlice.reducer;
