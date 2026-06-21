import { sendPrivateMessage, getPrivateChat } from "../controllers/private_message.controller";
import { Router } from "express";

const router = Router();

router.get('/:userId1/:userId2', getPrivateChat)
router.post('/', sendPrivateMessage)

export default router;