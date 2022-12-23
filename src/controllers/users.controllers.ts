import { Request, Response, NextFunction } from 'express';

import {
  createUserService,
  deleteUserService,
  listUsersService,
  updateUserService,
} from '../services/users.services';

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = await createUserService(req.body);

  return res.status(201).json(data);
};

export const listUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = await listUsersService();

  return res.status(200).json(data);
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = await deleteUserService(req.params.id);
  return res.status(204).json(data);
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = await updateUserService(
    req.params.id,
    req.body,
    req.headers.authorization,
  );
  return res.status(200).json(data);
};
