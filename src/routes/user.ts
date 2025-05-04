import express, { Request, Response, Router } from 'express';
import { authenticate } from '../middleware/auth';
import { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

const router: Router = express.Router();

router.get('/profile', authenticate, (req: AuthRequest, res: Response) => {
  res.json({ message: `Welcome ${req.user?.username}` });
});

router.get('/hello', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

export default router;
