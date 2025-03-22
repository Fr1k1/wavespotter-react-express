import { Router } from "express";
import controller from "../controllers/reviewController.js";

const router = new Router();

router.post("/", controller.addReview);

export default router;
