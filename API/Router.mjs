import {Router} from "express";
import cors from "cors";
import insectRouter from "./Insect/Router.mjs"

const router = Router();
router.use(cors())

router.use("/insect", insectRouter)

export default router;