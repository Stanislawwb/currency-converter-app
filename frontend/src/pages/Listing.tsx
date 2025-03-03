import { useDispatch } from "react-redux";
import Breadcrumbs from "../components/Breadcrumbs";
import Form from "../components/Form";
import { AppDispatch, RootState } from "../state/store";
import { convertAllCurrencies } from "../state/currencies/conversionSlice";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Listing = () => {
	const [, setSearchParams] = useSearchParams();
	const dispatch = useDispatch<AppDispatch>();
	const amountInUsd = useSelector(
		(state: RootState) => state.conversion.convertedValues["USD"]
	);

	const handleSortChange = (sortType: "alphabet" | "value") => {
		setSearchParams({ sortBy: sortType });
		dispatch(
			convertAllCurrencies({
				amount: amountInUsd,
				fromCurrency: "USD",
				sortBy: sortType,
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

						<div className="section__sorting">
							<button
								onClick={() => handleSortChange("alphabet")}
							>
								Sort By Name
							</button>
							<button onClick={() => handleSortChange("value")}>
								Sort By Value
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
