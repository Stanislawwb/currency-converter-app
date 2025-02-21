import { NavLink } from "react-router-dom";

const Breadcrumbs = () => {
	return (
		<div className="breadcrumbs">
			<ul>
				<li>
					<NavLink to="/">Home</NavLink>
				</li>

				<li>
					<NavLink to="/listing">Listing Page</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default Breadcrumbs;
