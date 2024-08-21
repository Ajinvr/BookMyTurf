import express from 'express';
import { managerAuth } from '../middlewares/managerAuthMiddleware.js';
import { deleteOrder } from '../controllers/Manager-Admin/orders-assinedturfs-manger.js';

const router = express.Router();

router.route('/deleteOrder').delete(managerAuth,deleteOrder)


export default router;