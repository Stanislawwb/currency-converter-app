import Breadcrumbs from "../components/Breadcrumbs";
import Form from "../components/Form";

const Listing = () => {
	return (
		<section className="section-listing">
			<div className="shell">
				<div className="section__inner">
					<div className="section__breadcrumbs">
						<Breadcrumbs />
					</div>

					<h1>All Exchange Rates</h1>
				</div>
				<Form showAllCurrencies={true} />
			</div>
		</section>
	);
};

export default Listing;
