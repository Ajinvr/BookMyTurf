import express from 'express';
import {adminAuth} from "../middlewares/adminAuthMiddleware"
import { adminGetAllTurfs,adminGetAllManagers ,adminGetAllOrders } from '../controllers/Manager-Admin/admin-allorders-turfs';

const router = express.Router();

router.route('/adminGetAllTurfs').get(adminAuth,adminGetAllTurfs)
router.route('/adminGetAllManagers').get(adminAuth,adminGetAllManagers)
router.route('/adminGetAllOrders').get(adminAuth,adminGetAllOrders)

export default router;