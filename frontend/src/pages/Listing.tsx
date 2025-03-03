import { useDispatch } from "react-redux";
import Breadcrumbs from "../components/Breadcrumbs";
import Form from "../components/Form";
import { AppDispatch, RootState } from "../state/store";
import { convertAllCurrencies } from "../state/currencies/conversionSlice";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const Listing = () => {
	const [, setSearchParams] = useSearchParams();
	const dispatch = useDispatch<AppDispatch>();
	const amountInUsd = useSelector(
		(state: RootState) => state.conversion.convertedValues["USD"]
	);

	const [activeSort, setActiveSort] = useState<"alphabet" | "value" | "">("");

	const handleSortChange = (sortType: "alphabet" | "value") => {
		setSearchParams({ sortBy: sortType });

		setActiveSort(sortType);
		dispatch(
			convertAllCurrencies({
				amount: amountInUsd,
				fromCurrency: "USD",
				sortBy: sortType,
			})
		);
	};

	const handleRemoveSorting = () => {
		setSearchParams({});

		setActiveSort("");

		dispatch(
			convertAllCurrencies({
				amount: amountInUsd,
				fromCurrency: "USD",
				sortBy: undefined,
			})
		);
	};

	return (
		<section className="section-listing">
			<div className="shell">
				<div className="section__inner">
					<div className="section__breadcrumbs">
						<Breadcrumbs />
					</div>

					<div className="section__content">
						<h1>All Exchange Rates</h1>

						<div className="section__buttons">
							<div className="section__sorting">
								<button
									className={
										activeSort === "alphabet"
											? "active"
											: ""
									}
									onClick={() => handleSortChange("alphabet")}
								>
									Sort By Name
								</button>

								<button
									className={
										activeSort === "value" ? "active" : ""
									}
									onClick={() => handleSortChange("value")}
								>
									Sort By Value
								</button>
							</div>

							<button
								onClick={handleRemoveSorting}
								className="remove"
							>
								Remove Sorting
							</button>
						</div>
					</div>
				</div>
				<Form showAllCurrencies={true} />
			</div>
		</section>
	);
};

export default Listing;
