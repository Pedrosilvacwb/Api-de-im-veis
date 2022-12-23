import { IUserLogin } from '../interfaces/users';
import jwt from 'jsonwebtoken';
import AppDataSource from '../data-source';
import Users from '../entities/users.entity';
import { compare } from 'bcryptjs';
import { AppError } from '../errors';

export const loginUserService = async (
  payload: IUserLogin,
): Promise<object> => {
  const userRepo = AppDataSource.getRepository(Users);
  const user = await userRepo.findOne({ where: { email: payload.email } });
  if (!user.isActive) throw new AppError('User is not Active!', 400);
  if (!user) throw new AppError('Invalid email/password!', 403);
  const validPassword = await compare(payload.password, user.password);
  if (!validPassword) throw new AppError('Invalid email/password!', 403);

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    subject: user.email,
  });

  return { token };
};
