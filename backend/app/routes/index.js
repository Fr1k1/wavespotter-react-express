import { Router } from "express";
import city from "./cityRoute.js";
import beachTexture from "./beachTextureRoute.js";
import characteristic from "./characteristicRoute.js";
import country from "./countryRoute.js";
import beachType from "./beachTypeRoute.js";
import beachDepth from "./beachDepthRoute.js";
import beach from "./beachRoute.js";
import review from "./reviewRoute.js";
import message from "./messageRoute.js";
import conversation from "./conversationRoute.js";

const router = new Router();
router.use("/cities", city);

router.use("/beach-textures", beachTexture);

router.use("/characteristics", characteristic);

router.use("/messages", message);

router.use("/conversations", conversation);

router.use("/countries", country);

router.use("/beach-types", beachType);

router.use("/beach-depths", beachDepth);

router.use("/beaches", beach);

router.use("/reviews", review);

export default router;
