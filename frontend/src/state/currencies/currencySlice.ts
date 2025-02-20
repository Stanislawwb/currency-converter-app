import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CurrencyState {
	rates: Record<string, number>;
	baseCurrency: string;
	loading: boolean;
	error: string | null;
}

const initialState: CurrencyState = {
	rates: {},
	baseCurrency: "USD",
	loading: false,
	error: null,
};

export const fetchCurrencies = createAsyncThunk(
	"currency/fetchCurrencies",
	async () => {
		const response = await fetch("http://localhost:5000/api/");

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
			})
			.addCase(fetchCurrencies.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Something went wrong";
			});
	},
});

export default currencySlice.reducer;
