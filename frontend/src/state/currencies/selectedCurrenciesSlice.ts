import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedCurrenciesState {
	selected: Record<string, number>;
}

const defaultSelectedCurrencies = {
	USD: 1,
	EUR: 0,
	RUB: 0,
	BYN: 0,
	PLN: 0,
	CNY: 0,
};

const loadState = (): SelectedCurrenciesState => {
	try {
		const storedData = sessionStorage.getItem("selectedCurrencies");
		return storedData
			? { selected: JSON.parse(storedData) }
			: { selected: { ...defaultSelectedCurrencies } };
	} catch (error) {
		console.error("Error loading selected currencies:", error);
		return { selected: { ...defaultSelectedCurrencies } };
	}
};

const initialState: SelectedCurrenciesState = loadState();

const selectedCurrenciesSlice = createSlice({
	name: "selectedCurrencies",
	initialState,
	reducers: {
		setInitialCurrencies: (
			state,
			action: PayloadAction<Record<string, number>>
		) => {
			state.selected = action.payload ?? {};
			sessionStorage.setItem(
				"selectedCurrencies",
				JSON.stringify(state.selected)
			);
		},
		addCurrency: (
			state,
			action: PayloadAction<{ currency: string; rate: number }>
		) => {
			if (!state.selected[action.payload.currency]) {
				state.selected[action.payload.currency] = action.payload.rate;
				sessionStorage.setItem(
					"selectedCurrencies",
					JSON.stringify(state.selected)
				);
			}
		},
		removeCurrency: (state, action: PayloadAction<string>) => {
			const newSelected = { ...state.selected };

			delete newSelected[action.payload];

			state.selected = newSelected;

			sessionStorage.setItem(
				"selectedCurrencies",
				JSON.stringify(state.selected)
			);
		},
	},
});

export const { setInitialCurrencies, addCurrency, removeCurrency } =
	selectedCurrenciesSlice.actions;
export default selectedCurrenciesSlice.reducer;
