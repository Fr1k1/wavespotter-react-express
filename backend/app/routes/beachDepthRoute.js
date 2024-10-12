import { Router } from "express";
import controller from "../controllers/beachDepthController.js";

const router = new Router();

router.get("/", controller.getBeachDepths);

export default router;
