declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		MONGO_URI: string;
		BANKING_API_URL: string;
	}
}
