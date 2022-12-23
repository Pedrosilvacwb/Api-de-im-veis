import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BaseSchema } from 'yup';
import AppDataSource from '../data-source';
import Users from '../entities/users.entity';
import { AppError } from '../errors';

export const validateUserInputDataMiddleware =
  (serializer: BaseSchema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validate = await serializer.validate(req.body);

      return next();
    } catch (error) {
      throw new AppError(error.errors, 400);
    }
  };

export const verifyDuplicateUserEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userRepo = AppDataSource.getRepository(Users);
  const exists = await userRepo.findOne({ where: { email: req.body.email } });

  if (exists) {
    throw new AppError('Email already exists!', 409);
  }

  return next();
};

export const verifyUserTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers.authorization) throw new AppError('Missing token', 401);
  const token = req.headers.authorization.split(' ')[1];
  return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) throw new AppError(err.message, 401);

    return next();
  });
};

export const verifyUserIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const email = jwt.decode(req.headers.authorization.split(' ')[1]).sub;
  const userRepo = AppDataSource.getRepository(Users);
  const user = await userRepo.findOne({ where: { email: email as string } });
  if (!user.isAdm) throw new AppError('User is not admin', 403);

  return next();
};

export const verifyUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userRepo = AppDataSource.getRepository(Users);

  const user = await userRepo.findOne({ where: { id: req.params.id } });

  if (!user) {
    throw new AppError('User not found!', 404);
  }

  return next();
};
