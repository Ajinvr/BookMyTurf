import express from 'express';
import { managerAuth } from '../middlewares/managerAuthMiddleware.js';
import { deleteOrder } from '../controllers/Manager-Admin/orders-assigned-turfs-manager.js';

const router = express.Router();

router.route('/deleteOrder/:id').delete(managerAuth,deleteOrder)


export default router;