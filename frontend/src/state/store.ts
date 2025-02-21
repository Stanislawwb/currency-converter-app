import { configureStore } from "@reduxjs/toolkit";
import selectedCurrenciesReducer from "../state/currencies/selectedCurrenciesSlice";
import currencyReducer from "../state/currencies/currencySlice";
import conversionReducer from "../state/currencies/conversionSlice";

export const store = configureStore({
	reducer: {
		currency: currencyReducer,
		selectedCurrencies: selectedCurrenciesReducer,
		conversion: conversionReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
