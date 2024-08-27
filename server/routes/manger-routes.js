import express from 'express';
import { managerLogin, managerSignup } from '../controllers/Manager-Admin/manager-controllers.js';
import { deleteReview } from '../controllers/user/review-contoller.js';
import { managerAuth } from '../middlewares/managerAuthMiddleware.js';
import { managerAssignedTurfs, managerAssignedTurfsOrders } from '../controllers/Manager-Admin/orders-assigned-turfs-manager.js';

const router = express.Router();

router.route('/managerSignup').post(managerSignup)
router.route('/managerLogin').post(managerLogin)
router.route('/getManagerAssignedTurfs').get(managerAuth,managerAssignedTurfs)
router.route('/getManagerAssignedTurfsOrders').get(managerAuth,managerAssignedTurfsOrders)
router.route('/deleteReview/:reviewId').delete(managerAuth,deleteReview)


export default router;