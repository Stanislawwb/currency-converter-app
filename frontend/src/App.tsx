import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import { useFetchCurrencies } from "./hooks/useFetchCurrencies";
import Listing from "./pages/Listing";

function App() {
	const { dataLoaded, error } = useFetchCurrencies();

	if (!dataLoaded) return null;

	return (
		<Router>
			<Header />
			{error && (
				<div className="error">
					<strong>{error}</strong>
				</div>
			)}
			<Routes>
				<Route path="/" element={<Homepage />} />

				<Route path="/listing" element={<Listing />} />
			</Routes>
		</Router>
	);
}

export default App;
