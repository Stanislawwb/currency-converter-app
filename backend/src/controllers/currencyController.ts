import { RequestHandler } from "express";
import Currency from "../models/currencyModel";
import { fetchCurrencyData } from "../services/currencyService";

const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;

export const getAllCurrencies: RequestHandler = async (req, res, next) => {
	try {
		let currencyData = await Currency.findOne();
		const now = new Date().getTime();

		if (!currencyData) {
			const data = await fetchCurrencyData();

			currencyData = await new Currency({
				baseCurrency: data.base,
				rates: data.rates,
			}).save();
		} else {
			const lastUpdated = new Date(currencyData.updatedAt).getTime();
			const isDataOutdated = now - lastUpdated > TWO_HOURS_IN_MS;

			if (isDataOutdated) {
				const data = await fetchCurrencyData();

				currencyData.baseCurrency = data.base;
				currencyData.rates = data.rates;

				await currencyData.save();
			}
		}

		res.json(currencyData);
	} catch (error) {
		next(error);
	}
};

export const convertAllCurrencies: RequestHandler = async (req, res, next) => {
	try {
		const { amount, fromCurrency } = req.body;

		const sortBy = req.query.sortBy as "alphabet" | "value" | undefined;

		if (!amount || !fromCurrency) {
			res.status(400).json({
				error: "Amount and fromCurrency are required",
			});
			return;
		}

		const currencyData = await Currency.findOne();
		if (!currencyData) {
			res.status(500).json({ error: "Currency rates not available" });
			return;
		}

		const rates = currencyData.rates;

		const rateFromCurrency = rates.get(fromCurrency);
		if (rateFromCurrency === undefined) {
			res.status(400).json({ error: "Invalid fromCurrency rate" });
			return;
		}

		const baseAmount = amount / rateFromCurrency;
		const convertedValues: Record<string, number> = {};

		rates.forEach((rate, currency) => {
			convertedValues[currency] = parseFloat(
				(baseAmount * rate).toFixed(4)
			);
		});

		let sortedValues = Object.entries(convertedValues);

		if (sortBy === "alphabet") {
			sortedValues.sort(([currencyA], [currencyB]) =>
				currencyA.localeCompare(currencyB)
			);
		} else if (sortBy === "value") {
			sortedValues.sort(([, valueA], [, valueB]) => valueB - valueA);
		}

		const sortedConvertedValues = Object.fromEntries(sortedValues);

		res.json({
			baseCurrency: currencyData.baseCurrency,
			fromCurrency,
			amount,
			convertedValues: sortedConvertedValues,
		});
	} catch (error) {
		next(error);
	}
};
