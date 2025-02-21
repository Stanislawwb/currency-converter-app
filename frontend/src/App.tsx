import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import { useFetchCurrencies } from "./hooks/useFetchCurrencies";
import { useUpdateSelectedCurrencies } from "./hooks/useUpdateSelectedCurrencies";
import Listing from "./pages/Listing";

function App() {
	const { dataLoaded, currencyRates } = useFetchCurrencies();
	useUpdateSelectedCurrencies(dataLoaded, currencyRates);

	if (!dataLoaded) return null;

	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/listing" element={<Listing />} />
			</Routes>
		</Router>
	);
}

export default App;
