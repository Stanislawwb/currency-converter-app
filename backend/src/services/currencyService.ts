const BANKING_API_URL = process.env.BANKING_API_URL;

if (!BANKING_API_URL) {
	console.error("BANKING_API_URL is not defined");
	process.exit(1);
}

export const fetchCurrencyData = async () => {
	const response = await fetch(BANKING_API_URL);

	if (!response.ok) {
		throw new Error(
			`Failed to fetch currency data: ${response.statusText}`
		);
	}

	const data = await response.json();

	if (!data || !data.base || !data.rates) {
		throw new Error("Invalid currency data received from API");
	}

	return data;
};
