import { InferSchemaType, model, Schema } from "mongoose";

const currencySchema = new Schema(
	{
		baseCurrency: {
			type: String,
			required: true,
			default: "USD",
		},
		rates: {
			type: Map,
			of: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

type CurrencyType = InferSchemaType<typeof currencySchema>;

const Currency = model<CurrencyType>("Currency", currencySchema);

export default Currency;
