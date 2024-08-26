import express from 'express';
import { addTurf, deleteTurf, editTurf, getAllturf, getTurf } from '../controllers/turf/turf-controller.js';
import { managerAuth } from '../middlewares/managerAuthMiddleware.js';
import { upload }  from '../middlewares/fileUploadMiddleware.js';
import { createSlots } from '../utils/create-slots.js';

const router = express.Router();

router.route('/getAllTurf').get(getAllturf)
router.route('/getTurf:id').get(getTurf)
router.route('/addTurf').post(managerAuth,upload.single('file'),addTurf);
router.route('/editTurf:id').patch(managerAuth,upload.single('file'),editTurf)
router.route('/deleteTurf:id').delete(managerAuth,deleteTurf)
router.route('/createSlots:key').put(createSlots)


export default router;