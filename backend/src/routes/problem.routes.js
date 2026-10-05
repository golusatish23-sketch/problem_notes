import { Router } from "express";
import { FindAllproblem, Problemnotes } from "../controllers/problem.controller.js";
import { verifyjwt } from "../middleware/auth.middlwware.js";
import { upload } from "../middleware/multermiddleware.js";
const router=Router()
router.route("/problemnotes").post(verifyjwt,upload.none(),Problemnotes)
router.route("/Allproblem").get(verifyjwt,FindAllproblem)


export default router