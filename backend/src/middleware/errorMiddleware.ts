import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const errorMiddleware = (
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(error);

	let errorMessage = "An unknown error occured";
	let statusCode = 500;

	if (error instanceof mongoose.Error.ValidationError) {
		statusCode = 400;
		errorMessage = Object.values(error.errors)
			.map((err) => err.message)
			.join(", ");
	}

	res.status(statusCode).json({ error: errorMessage });
};

export default errorMiddleware;
