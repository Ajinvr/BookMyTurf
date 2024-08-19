import express from 'express';
import { addturf, deleteturf, editturf } from '../controllers/trufs/turf-controller.js';
import { managerAuth } from '../middlewares/managerAuthMiddleware.js';
import { upload }  from '../middlewares/fileUploadMiddleware.js';
import { createslots } from '../utils/create-slots.js';

const router = express.Router();
router.route('/addturf').post(managerAuth,upload.single('file'),addturf);
router.route('/editturf:id').patch(managerAuth,upload.single('file'),editturf)
router.route('/deleteturf:id').delete(managerAuth,deleteturf)
router.route('/createslots:key').put(createslots)


export default router;