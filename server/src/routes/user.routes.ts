import {Router} from 'express'
import { getUser, getUserRooms, getAllUsers } from '../controllers/user.controller';

const router = Router();

router.get('/:userId', getAllUsers)
router.get('/me/:userId', getUser)
router.get('/userRooms/:userId', getUserRooms)

export default router;