import { Router } from "express";
import controller from "../controllers/beachTextureController.js";

const router = new Router();

router.get("/", controller.getBeachTextures);

export default router;
