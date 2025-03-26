import { Router } from "express";
import controller from "../controllers/beachController.js";

const router = new Router();

router.get("/", controller.getBeaches);

router.post("/", controller.addBeach);

router.get("/:id", controller.getBeachById);

router.get("/:id/images", controller.getBeachImages);

router.get("/type/:id", controller.getBeachByType);

export default router;
