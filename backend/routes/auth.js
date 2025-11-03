import { Router } from 'express'
import { login, logout, session, signup } from '../controllers/auth.js';
import { loginSchema, signupSchema } from '../schemas/auth.js';
import validate from '../middlewares/validation.js'

const router = Router()

// sign up
router.get('/api/auth/signup', validate(signupSchema), signup);

// login
router.get('/api/auth/login', validate(loginSchema), login);

// session
router.get('/api/auth/session', session);

// logout
router.get('/api/auth/logout', logout);

export default router;