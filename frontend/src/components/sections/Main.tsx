import { Link } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import Form from "../Form";

const Main = () => {
	const today = new Date().toLocaleDateString();
	return (
		<section className="section-main">
			<div className="shell">
				<div className="section__inner">
					<div className="section__main">
						<div className="section__breadcrumbs">
							<Breadcrumbs />
						</div>

						<div className="section__content">
							<h1>Currency converter</h1>

							<Link to="#">
								At the rate of the National Bank of the Republic
								of Belarus
							</Link>

							<p>
								The official exchange rate set by the National
								Bank of the Republic of Belarus on {today}
							</p>
						</div>

						<Form />

						<div className="section__actions">
							<Link to="/listing">All exchange rates</Link>
						</div>
					</div>

					<div className="section__aside">
						<h3>Blogs</h3>

						<p>
							Companies and experts share unique news, expertise
							and experience.
						</p>

						<Link to="#">Read</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Main;
