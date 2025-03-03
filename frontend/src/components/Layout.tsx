import { Outlet } from "react-router-dom";
import { useFetchCurrencies } from "../hooks/useFetchCurrencies";
import Header from "./Header";

const Layout = () => {
	const { error } = useFetchCurrencies();

	return (
		<>
			<Header />

			{error && (
				<div className="error">
					<strong>{error}</strong>
				</div>
			)}

			<Outlet />
		</>
	);
};

export default Layout;
