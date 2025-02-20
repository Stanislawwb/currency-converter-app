import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedCurrenciesState {
	selected: string[];
}

const initialState: SelectedCurrenciesState = {
	selected: ["USD", "EUR", "RUB", "BYN"],
};

const selectedCurrenciesSlice = createSlice({
	name: "selectedCurrencies",
	initialState,
	reducers: {
		addCurrency: (state, action: PayloadAction<string>) => {
			if (!state.selected.includes(action.payload)) {
				state.selected.push(action.payload);
			}
		},
		removeCurrency: (state, action: PayloadAction<string>) => {
			state.selected = state.selected.filter(
				(currency) => currency !== action.payload
			);
		},
	},
});

export const { addCurrency, removeCurrency } = selectedCurrenciesSlice.actions;
export default selectedCurrenciesSlice.reducer;
