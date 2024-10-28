import {Router} from 'express';
import {createInsect, deleteInsect, getInsects, getInsectsById, updateInsect} from './Controller.mjs';
import cors from "cors";

const router = Router();
router.use(cors())

router.get('/', getInsects);
router.get('/:id', getInsectsById);
router.post('/', createInsect);
router.put('/:id', updateInsect);
router.delete('/:id', deleteInsect);

export default router;
