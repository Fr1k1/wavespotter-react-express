import { Router } from "express";
import controller from "../controllers/messageController.js";

const router = new Router();

router.post("/", controller.addMessage);

export default router;
