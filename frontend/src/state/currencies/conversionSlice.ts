import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;

interface ConversionState {
	convertedValues: Record<string, number>;
	loading: boolean;
	error: string | null;
}

const loadState = (): ConversionState => {
	try {
		const storedData = sessionStorage.getItem("convertedValues");

		if (storedData === null) {
			return { convertedValues: {}, loading: false, error: null };
		}
		const parsedData = JSON.parse(storedData);
		return {
			convertedValues: parsedData ?? {},
			loading: false,
			error: null,
		};
	} catch (error) {
		console.error(error);
		return { convertedValues: {}, loading: false, error: null };
	}
};

const initialState: ConversionState = loadState();

export const convertAllCurrencies = createAsyncThunk(
	"conversion/converetAll",
	async ({
		amount,
		fromCurrency,
	}: {
		amount: number;
		fromCurrency: string;
	}) => {
		const response = await fetch(`${apiUrl}/convert-all`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ amount, fromCurrency }),
		});

		if (!response.ok) throw new Error("Failed to convert currencies");

		const data = await response.json();

		sessionStorage.setItem(
			"convertedValues",
			JSON.stringify(data.convertedValues || {})
		);

		return data.convertedValues;
	}
);

const conversionSlice = createSlice({
	name: "conversion",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(convertAllCurrencies.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(convertAllCurrencies.fulfilled, (state, action) => {
				state.loading = false;
				state.convertedValues =
					action.payload && Object.keys(action.payload).length > 0
						? action.payload
						: state.convertedValues;

				sessionStorage.setItem(
					"convertedValues",
					JSON.stringify(state.convertedValues)
				);
			})
			.addCase(convertAllCurrencies.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.error.message || "Error fetching conversions";
			});
	},
});

export default conversionSlice.reducer;
