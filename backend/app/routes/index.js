import { Router } from "express";
import city from "./cityRoute.js";
import beachTexture from "./beachTextureRoute.js";

const router = new Router();

router.use("/cities", city);

router.use("/beach-textures", beachTexture);

export default router;
