import express from 'express';
import {adminAuth} from "../middlewares/adminAuthMiddleware.js"
import { adminGetAllTurfs,adminGetAllManagers ,adminGetAllOrders, adminGetAllUsers, deleteManager } from '../controllers/Manager-Admin/admin-allorders-turfs.js';

const router = express.Router();

router.route('/adminGetAllTurfs').get(adminAuth,adminGetAllTurfs)
router.route('/adminGetAllManagers').get(adminAuth,adminGetAllManagers)
router.route('/adminGetAllOrders').get(adminAuth,adminGetAllOrders)
router.route('/adminGetAllUsers').get(adminAuth,adminGetAllUsers)
router.route('/adminDeleteManager').delete(adminAuth,deleteManager)

export default router;