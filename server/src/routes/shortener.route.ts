import { Router } from "express";
import { httpEncodeURL, httpDecodeURL, httpGetURL, httpListURL } from "../controllers/shortener.controller";
import { body, check } from "express-validator";
import { errorValidator } from "../middlewares/error-validator.middleware";

const router = Router();

router.route("/encode").post([check("url", "URL is required").notEmpty()], errorValidator, httpEncodeURL);
router.route("/decode").post([check("url", "URL is required").notEmpty()], errorValidator, httpDecodeURL);

router.route("/statistics/:urlPath").get(httpGetURL);
router.route("/list").get(httpListURL);

export { router as urlShortenerRoutes };
