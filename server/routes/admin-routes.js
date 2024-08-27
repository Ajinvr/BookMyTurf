import express from 'express';
import {adminAuth} from "../middlewares/adminAuthMiddleware.js"
import { adminGetAllTurfs,adminGetAllManagers ,adminGetAllOrders, adminGetAllUsers, deleteManager} from '../controllers/Manager-Admin/admin-controllers.js';

const router = express.Router();

router.route('/adminGetAllUsers').get(adminAuth,adminGetAllUsers)
router.route('/adminGetAllTurfs').get(adminAuth,adminGetAllTurfs)
router.route('/adminGetAllBookings').get(adminAuth,adminGetAllOrders)
router.route('/adminGetAllManagers').get(adminAuth,adminGetAllManagers)
router.route('/adminDeleteManager/:managerId').delete(adminAuth,deleteManager)
// router.route('/adminEditManager').delete(adminAuth,deleteManager)


export default router;