import { Router } from "express";
import {
	convertAllCurrencies,
	getAllCurrencies,
} from "../controllers/currencyController";

const router = Router();
router.get("/", getAllCurrencies);
router.post("/convert-all", convertAllCurrencies);

export default router;
