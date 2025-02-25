import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const apiUrl = import.meta.env.VITE_API_URL;

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
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(apiUrl);

			if (!response.ok) throw new Error("Failed to fetch currencies");

			const data = await response.json();

			if (!data.rates) {
				throw new Error("Invalid API response: missing rates");
			}

			return data;
		} catch (error) {
			console.error("Error fetching currencies:", error);

			if (error instanceof Error) {
				return rejectWithValue(error.message);
			} else {
				return rejectWithValue("An unknown error occured");
			}
		}
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

				if (action.payload && action.payload.rates) {
					state.rates = action.payload.rates;
					state.baseCurrency = action.payload.baseCurrency;
				} else {
					state.error = "Invalid API response: missing rates";
				}
			})
			.addCase(fetchCurrencies.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Something went wrong";
			});
	},
});

export default currencySlice.reducer;
