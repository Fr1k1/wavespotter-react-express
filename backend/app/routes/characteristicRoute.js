import { Router } from "express";
import controller from "../controllers/characteristicController.js";

const router = new Router();

router.get("/", controller.getCharacteristics);

export default router;
