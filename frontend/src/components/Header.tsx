import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="header">
			<div className="shell shell--large">
				<div className="header__inner">
					<nav>
						<ul>
							<li>
								<Link to="#">Exchange rates</Link>
							</li>

							<li>
								<Link to="#">News</Link>
							</li>

							<li>
								<Link to="#">Credits</Link>
							</li>

							<li>
								<Link to="#">Leasing</Link>
							</li>

							<li>
								<Link to="#">Deposits</Link>
							</li>

							<li>
								<Link to="#">Cards</Link>
							</li>

							<li>
								<Link to="#">Ratings</Link>
							</li>

							<li>
								<Link to="#">Serivces</Link>
							</li>

							<li>
								<Link to="#">Investments</Link>
							</li>

							<li>
								<Link to="#">Business</Link>
							</li>

							<li>
								<Link to="#">More</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
