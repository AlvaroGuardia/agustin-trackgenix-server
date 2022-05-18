import express from 'express';
import superAdminRoutes from './super-admins';
import adminRoutes from './admins';
import projectRoutes from './projects';
import timesheetRoutes from './time-sheets';

const router = express.Router();
router.use('/admins', adminRoutes);
router.use('/projects', projectRoutes);
router.use('/time-sheets', timesheetRoutes);
router.use('/super-admins', superAdminRoutes);

export default router;
