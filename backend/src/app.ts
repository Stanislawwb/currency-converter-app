import "dotenv/config";
import express from "express";
import cors from "cors";
import currencyRoutes from "./routes/currencyRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", currencyRoutes);

export default app;
