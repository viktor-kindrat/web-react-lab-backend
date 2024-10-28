import {Router} from 'express';
import {createInsect, deleteInsect, getInsects, getInsectsById, updateInsect} from './Controller.mjs';
import cors from "cors";

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({storage});

const router = Router();
router.use(cors())

router.get('/', getInsects);
router.get('/:id', getInsectsById);
router.post('/', upload.single("image"), createInsect);
router.put('/:id', updateInsect);
router.delete('/:id', deleteInsect);

export default router;
