import express from 'express';
import { managerAuth } from '../middlewares/managerAuthMiddleware';
import { deleteOrder } from '../controllers/Manager-Admin/orders-assinedturfs-manger';

const router = express.Router();

router.route('/deleteorder').delete(managerAuth,deleteOrder)


export default router;