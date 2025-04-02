import { Router} from 'express';
import { registerUser } from '../controllers/auth-controllers/registerUser';
import { loginUser } from '../controllers/auth-controllers/loginUser';
import { auth } from '../middleware/auth';
import { getCurrentUser } from '../controllers/auth-controllers/getCurrentUser';

const router = Router();

router.post('/create-user', registerUser)
router.post('/login-user', loginUser)
router.get('/get-current-user/:id', auth, getCurrentUser)


export default router;