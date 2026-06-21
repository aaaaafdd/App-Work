import {Router} from 'express'
import {createContact, getAllContacts } from '../controllers/contact.controller';

const router = Router()

router.post('/', createContact);
router.get('/:id_user', getAllContacts);

export default router;