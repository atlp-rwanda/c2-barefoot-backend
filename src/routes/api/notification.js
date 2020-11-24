import express from 'express';
import notifications from '../../controllers/notification/getNotifications';
import updateNotification from '../../controllers/notification/updateNotification';

const router = express.Router();

router.get('/notifications', notifications);
router.patch('/notifications/:id', updateNotification);
export default router;
