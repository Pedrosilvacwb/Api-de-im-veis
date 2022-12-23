import { Request, Response } from 'express';
import { loginUserService } from '../services/sessions.services';

export const loginUserController = async (req: Request, res: Response) => {
  const data = await loginUserService(req.body);

  return res.status(200).json(data);
};
