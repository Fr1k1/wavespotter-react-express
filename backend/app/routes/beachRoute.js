import { Router } from "express";
import controller from "../controllers/beachController.js";

const router = new Router();

router.get("/", controller.getBeaches);

router.post("/", controller.addBeach);

router.put("/:id", controller.updateBeach);

router.get("/:id", controller.getBeachById);

router.get("/:id/images", controller.getBeachImages);

router.get("/type/:id", controller.getBeachByType);

router.get("/:id/geodata", controller.getBeachGeoDataById);

export default router;
