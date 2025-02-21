import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
	addCurrency,
	removeCurrency,
} from "../state/currencies/selectedCurrenciesSlice";
import { convertAllCurrencies } from "../state/currencies/conversionSlice";
import { useFetchCurrencies } from "../hooks/useFetchCurrencies";

const availableCurrencies = [
	{ value: "AED", label: "AED - UAE Dirham" },
	{ value: "AMD", label: "AMD - Armenian Dram" },
	{ value: "AUD", label: "AUD - Australian Dollar" },
	{ value: "BGN", label: "BGN - Bulgarian Lev" },
	{ value: "BRL", label: "BRL - Brazilian Real" },
	{ value: "CAD", label: "CAD - Canadian Dollar" },
	{ value: "CHF", label: "CHF - Swiss Franc" },
	{ value: "CZK", label: "CZK - Czech Crown" },
	{ value: "DKK", label: "DKK - Danish Krone" },
	{ value: "GBP", label: "GBP - Pound Sterling" },
	{ value: "NZD", label: "NZD - New Zealand Dollar" },
	{ value: "VND", label: "VND - Vietnamese Dong" },
	{ value: "XDR", label: "XDR - SDR (Special Drawing Rights)" },
];

const initialCurrencies = ["USD", "EUR", "RUB", "BYN", "PLN", "CNY"];

const Form: React.FC<{ showAllCurrencies?: boolean }> = ({
	showAllCurrencies = false,
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const selectedCurrencies = useSelector(
		(state: RootState) => state.selectedCurrencies.selected ?? {}
	);
	const convertedValues = useSelector(
		(state: RootState) => state.conversion.convertedValues
	);

	const { currencyRates } = useFetchCurrencies();

	const displayedCurrencies = showAllCurrencies
		? currencyRates
		: selectedCurrencies;

	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		const storedConversions = sessionStorage.getItem("convertedValues");

		if (storedConversions) {
			const parsedData = JSON.parse(storedConversions);

			if (parsedData.amount && parsedData.fromCurrency) {
				dispatch(convertAllCurrencies(parsedData));
			}
		}
	}, [dispatch]);

	const handleInputChange = (amount: number, fromCurrency: string) => {
		dispatch(convertAllCurrencies({ amount, fromCurrency }));
	};

	const handleSelectCurrency = (
		selected: { value: string; label: string } | null
	) => {
		if (selected && !selectedCurrencies[selected.value]) {
			const currencyRate = currencyRates[selected.value] ?? 0;
			dispatch(
				addCurrency({ currency: selected.value, rate: currencyRate })
			);
		}
		setShowDropdown(false);
	};

	const handleRemoveCurrency = (currency: string) => {
		if (!initialCurrencies.includes(currency)) {
			dispatch(removeCurrency(currency));
		}
	};

	const handleReset = () => {
		sessionStorage.removeItem("selectedCurrencies");
		sessionStorage.removeItem("convertedValues");
		window.location.reload();
	};

	return (
		<form className="form" onSubmit={(e) => e.preventDefault()}>
			<div className="form__inner">
				<div
					className={`form__rows ${
						showAllCurrencies ? "form__rows--two-columns" : ""
					}`}
				>
					{displayedCurrencies &&
						Object.entries(displayedCurrencies).length > 0 &&
						Object.entries(displayedCurrencies).map(
							([currency, initialRate]) => (
								<div className="form__row" key={currency}>
									<label htmlFor={currency}>{currency}</label>

									<input
										type="number"
										value={parseFloat(
											(
												convertedValues[currency] ??
												initialRate
											).toFixed(4)
										)}
										onChange={(e) => {
											const newAmount =
												parseFloat(e.target.value) || 0;
											handleInputChange(
												newAmount,
												currency
											);
										}}
									/>

									{!showAllCurrencies &&
										!initialCurrencies.includes(
											currency
										) && (
											<button
												type="button"
												onClick={() =>
													handleRemoveCurrency(
														currency
													)
												}
											></button>
										)}
								</div>
							)
						)}
				</div>

				{!showAllCurrencies && (
					<div className="form__actions">
						{showDropdown && (
							<div className="form__select">
								<Select
									options={availableCurrencies}
									onChange={handleSelectCurrency}
									menuIsOpen
									onBlur={() => setShowDropdown(false)}
									autoFocus
									menuPlacement="auto"
								/>
							</div>
						)}

						<div className="form__buttons">
							<div className="form__add-btn">
								<span></span>

								<button
									type="button"
									onClick={() =>
										setShowDropdown(!showDropdown)
									}
								>
									Add currency
								</button>
							</div>

							<button type="button" onClick={handleReset}>
								Reset Currencies
							</button>
						</div>
					</div>
				)}
			</div>
		</form>
	);
};

export default Form;
