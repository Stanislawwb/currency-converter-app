import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Listing from "./pages/Listing";
import Layout from "./components/Layout";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Homepage />} />

					<Route path="/listing" element={<Listing />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
