import "dotenv/config";
import express from "express";
import cors from "cors";
import currencyRoutes from "./routes/currencyRoutes";
import errorMiddleware from "./middleware/errorMiddleware";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", currencyRoutes);

app.use(errorMiddleware);

export default app;
