import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const apiUrl = import.meta.env.VITE_API_URL;

interface CurrencyState {
	rates: Record<string, number>;
	baseCurrency: string;
	loading: boolean;
	error: string | null;
}

const loadRatesFromSession = (): Record<string, number> => {
	try {
		const storedRates = sessionStorage.getItem("convertedValues");
		return storedRates ? JSON.parse(storedRates) : {};
	} catch (error) {
		console.error("Error loading currencies from sessionStorage:", error);
		return {};
	}
};

const initialState: CurrencyState = {
	rates: loadRatesFromSession(),
	baseCurrency: "USD",
	loading: false,
	error: null,
};

export const fetchCurrencies = createAsyncThunk(
	"currency/fetchCurrencies",
	async () => {
		const response = await fetch(apiUrl);

		if (!response.ok) throw new Error("Failed to fetch currencies");

		return await response.json();
	}
);

export const currencySlice = createSlice({
	name: "currency",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCurrencies.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCurrencies.fulfilled, (state, action) => {
				state.loading = false;
				state.rates = action.payload.rates;
				state.baseCurrency = action.payload.baseCurrency;

				sessionStorage.setItem(
					"convertedValues",
					JSON.stringify(action.payload.rates)
				);
			})
			.addCase(fetchCurrencies.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Something went wrong";
			});
	},
});

export default currencySlice.reducer;
