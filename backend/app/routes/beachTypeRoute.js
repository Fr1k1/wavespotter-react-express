import { Router } from "express";
import controller from "../controllers/beachTypeController.js";

const router = new Router();

router.get("/", controller.getBeachTypes);

export default router;
