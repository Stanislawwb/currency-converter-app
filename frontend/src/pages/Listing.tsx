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

					<div className="section__content">
						<h1>All Exchange Rates</h1>
					</div>
				</div>
				<Form showAllCurrencies={true} />
			</div>
		</section>
	);
};

export default Listing;
