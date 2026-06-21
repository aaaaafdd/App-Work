import {Router} from 'express'
import {createRoom, getAllRooms, joinRoom} from '../controllers/room.controller'

const router = Router();

router.post('/create', createRoom);
router.get('/all/:userId', getAllRooms);
router.post('/joinRoom', joinRoom);


export default router;