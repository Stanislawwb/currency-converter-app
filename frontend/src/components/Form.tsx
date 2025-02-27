import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { AppDispatch, RootState } from "../state/store";
import {
	addCurrency,
	initialCurrencies,
	removeCurrency,
	resetCurrencies,
} from "../state/currencies/selectedCurrenciesSlice";
import { useDispatch } from "react-redux";
import { convertAllCurrencies } from "../state/currencies/conversionSlice";

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

const Form: React.FC<{ showAllCurrencies?: boolean }> = ({
	showAllCurrencies = false,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const [showDropdown, setShowDropdown] = useState(false);

	const selectedCurrencies = useSelector(
		(state: RootState) => state.selectedCurrencies
	);
	const convertedValues = useSelector(
		(state: RootState) => state.conversion.convertedValues
	);

	const [inputValues, setInputValues] = useState<Record<string, string>>({});

	useEffect(() => {
		const updatedValues: Record<string, string> = {};
		const currencies = showAllCurrencies
			? Object.keys(convertedValues)
			: selectedCurrencies;

		currencies.forEach((currency) => {
			updatedValues[currency] =
				convertedValues[currency]?.toString() || "";
		});
		setInputValues(updatedValues);
	}, [convertedValues, selectedCurrencies, showAllCurrencies]);

	const handleSelectCurrency = (
		selected: { value: string; label: string } | null
	) => {
		if (selected && !selectedCurrencies.includes(selected.value)) {
			dispatch(addCurrency(selected.value));
		}
		setShowDropdown(false);
	};

	const handleRemoveCurrency = (currency: string) => {
		dispatch(removeCurrency(currency));
	};

	const handleResetCurrencies = () => {
		dispatch(resetCurrencies());
		dispatch(convertAllCurrencies({ amount: 1, fromCurrency: "USD" }));
	};

	const onInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		currency: string
	) => {
		const newValue = e.target.value;
		setInputValues((prev) => ({ ...prev, [currency]: newValue }));

		if (newValue === "") {
			const resetValues = selectedCurrencies.reduce((acc, curr) => {
				acc[curr] = "0";
				return acc;
			}, {} as Record<string, string>);
			setInputValues(resetValues);
			return;
		}

		const amount = parseFloat(newValue);
		if (!isNaN(amount)) {
			dispatch(convertAllCurrencies({ amount, fromCurrency: currency }));
		}
	};

	return (
		<form className="form" onSubmit={(e) => e.preventDefault()}>
			<div className="form__inner">
				<div
					className={`form__rows ${
						showAllCurrencies ? "form__rows--two-columns" : ""
					}`}
				>
					{Object.keys(inputValues).map((currency) => (
						<div className="form__row" key={currency}>
							<label htmlFor={currency}>{currency}</label>

							<input
								id={currency}
								type="number"
								value={inputValues[currency] || ""}
								onChange={(e) => onInputChange(e, currency)}
							/>

							{!initialCurrencies.includes(currency) &&
								!showAllCurrencies && (
									<button
										type="button"
										onClick={() =>
											handleRemoveCurrency(currency)
										}
									></button>
								)}
						</div>
					))}
				</div>

				{!showAllCurrencies && (
					<div className="form__actions">
						{showDropdown && (
							<div className="form__select">
								<Select
									options={availableCurrencies}
									onChange={handleSelectCurrency}
									menuIsOpen
									onBlur={() =>
										setTimeout(
											() => setShowDropdown(false),
											100
										)
									}
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

							<button
								type="button"
								onClick={handleResetCurrencies}
							>
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
