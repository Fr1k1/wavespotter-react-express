import { Router } from "express";

import controller from "../controllers/userController.js";

const router = new Router();

router.get("/", controller.getUsers);

export default router;
