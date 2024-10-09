import { Router } from "express";
import controller from "../controllers/cityController.js";

const router = new Router();

router.get("/", controller.getCities);

export default router;
