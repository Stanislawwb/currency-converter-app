import { Router } from "express";
import {
	convertAllCurrencies,
	convertSelectedCurrencies,
	getAllCurrencies,
} from "../controllers/currencyController";

const router = Router();
router.get("/", getAllCurrencies);
router.post("/convert-all", convertAllCurrencies);
router.post("/convert-selected", convertSelectedCurrencies);

export default router;
