import { Router } from "express";
import city from "./cityRoute.js";
import beachTexture from "./beachTextureRoute.js";
import characteristic from "./characteristicRoute.js";
import country from "./countryRoute.js";
import beachType from "./beachTypeRoute.js";

const router = new Router();
//ja zapravo trebam dobivati sve gradove koji imaju plazu, a ne sve opcenito
router.use("/cities", city);

router.use("/beach-textures", beachTexture);

router.use("/characteristics", characteristic);

router.use("/countries", country);

router.use("/beach-types", beachType);

export default router;
