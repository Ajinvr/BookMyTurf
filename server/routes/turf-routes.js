import express from 'express';
import { addturf } from '../controllers/trufs/add-turf-controller.js';
import { managerAuth } from '../middlewares/managerAuthMiddleware.js';
import  {upload}  from '../middlewares/fileUploadMiddleware.js';

const router = express.Router();

router.route('/addturf').post(managerAuth,upload.single('file'),addturf);

export default router;