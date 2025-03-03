import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;

interface ConversionState {
	convertedValues: Record<string, number>;
	loading: boolean;
	error: string | null;
}

const initialState: ConversionState = {
	convertedValues: {},
	loading: false,
	error: null,
};

export const convertAllCurrencies = createAsyncThunk(
	"conversion/converetAll",
	async ({
		amount,
		fromCurrency,
		sortBy,
	}: {
		amount: number;
		fromCurrency: string;
		sortBy?: string;
	}) => {
		const url = new URL(`${apiUrl}/convert-all`);

		if (sortBy) {
			url.searchParams.append("sortBy", sortBy);
		}

		console.log("Fetching from URL:", url.toString());

		const response = await fetch(url.toString(), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ amount, fromCurrency }),
		});

		if (!response.ok) throw new Error("Failed to convert currencies");

		const data = await response.json();

		return data.convertedValues;
	}
);

const conversionSlice = createSlice({
	name: "conversion",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(convertAllCurrencies.pending, (state, action) => {
				console.log("Sorting currencies with:", action.meta.arg.sortBy);
				state.loading = true;
				state.error = null;
			})
			.addCase(convertAllCurrencies.fulfilled, (state, action) => {
				state.loading = false;
				state.convertedValues = action.payload ?? state.convertedValues;
			})
			.addCase(convertAllCurrencies.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.error.message || "Error fetching conversions";
			});
	},
});

export default conversionSlice.reducer;
