import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = (await User.findOne({ username })) as IUser | null;

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    console.log('request', req);
    const passwordMatch = await user.comparePassword(password);
    console.log('passwordMatch', passwordMatch);
    if (!passwordMatch) {
      res.status(401).json({ message: 'Incorrect password' });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY as string,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
