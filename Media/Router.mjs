import {Router} from 'express';
import {getImageById} from './Controller.mjs';
import cors from "cors";

const router = Router();
router.use(cors())

router.get('/image/:id', getImageById);

export default router;
