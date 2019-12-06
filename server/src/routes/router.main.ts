import { httpVisitUrl } from "../controllers/shortener.controller";
import path from "path";
import { Router, Request, Response } from "express";
import { urlShortenerRoutes } from "./shortener.route";

const router = Router();

router.use("/api", urlShortenerRoutes);
//client app
router.get("/dashboard", (req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, "..", "..", "public", "index.html"));
});
router.get("/:urlPath", httpVisitUrl);

export { router as rootRouter };
