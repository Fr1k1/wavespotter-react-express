import { Router } from "express";
import city from "./cityRoute.js";
import beachTexture from "./beachTextureRoute.js";
import characteristic from "./characteristicRoute.js";
import country from "./countryRoute.js";

const router = new Router();

router.use("/cities", city);

router.use("/beach-textures", beachTexture);

router.use("/characteristics", characteristic);

router.use("/countries", country);

export default router;
