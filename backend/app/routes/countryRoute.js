import { Router } from "express";
import controller from "../controllers/countryController.js";

const router = new Router();

router.get("/", controller.getCountries);

export default router;
