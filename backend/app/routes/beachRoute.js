import { Router } from "express";
import controller from "../controllers/beachController.js";

const router = new Router();

router.post("/", controller.addBeach);

export default router;
