import {Router} from 'express'
import { getChatMessages } from '../controllers/room_message.controller'

const router = Router();

router.get('/:roomId', getChatMessages)

export default router;