import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { parseCSV } from "../controllers/parseCSV.controller";

const router = Router();

router.route("/parse-csv").post(upload.single('file'), parseCSV)


export default router;