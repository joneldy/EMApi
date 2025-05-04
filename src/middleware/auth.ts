import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

interface JwtPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as JwtPayload;
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
