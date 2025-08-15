import { Router } from "express";
import controller from "../controllers/conversationController.js";

const router = new Router();

router.post("/", controller.createConversation);
router.get("/:id", controller.getConversation);

export default router;
