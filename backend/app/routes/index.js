import { Router } from "express";
import user from "./userRoute.js";

const router = new Router();

router.use("/users", user);

export default router;
