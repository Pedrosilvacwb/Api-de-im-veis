import { hash } from 'bcryptjs';
import AppDataSource from '../data-source';
import Users from '../entities/users.entity';
import { AppError } from '../errors';
import { IUser, IUserRequest, IUserUpdate } from '../interfaces/users';
import {
  displayUserSerializer,
  listUsersDisplaySerializer,
} from '../serializers/users.serializer';

export const createUserService = async (
  payload: IUserRequest,
): Promise<IUser> => {
  const hashedPassword = await hash(payload.password, 10);
  const userRepo = AppDataSource.getRepository(Users);
  const newUser = userRepo.create({ ...payload, password: hashedPassword });
  await userRepo.save(newUser);
  const usersDisplay = displayUserSerializer.validate(newUser, {
    abortEarly: false,
    stripUnknown: true,
  });
  return usersDisplay;
};

export const listUsersService = async (): Promise<IUser[]> => {
  const userRepo = AppDataSource.getRepository(Users);
  const users = await userRepo.find();
  const usersDisplay = listUsersDisplaySerializer.validate(users, {
    abortEarly: false,
    stripUnknown: true,
  });
  return usersDisplay;
};

export const deleteUserService = async (id: string): Promise<object> => {
  const userRepo = AppDataSource.getRepository(Users);

  const user = await userRepo.findOne({ where: { id: id } });

  if (!user.isActive) {
    throw new AppError('User is not Active', 400);
  }

  await userRepo.save({ ...user, isActive: false });

  return {};
};

export const updateUserService = async (
  id: string,
  payload: IUserUpdate,
  token: string,
): Promise<object> => {
  const keys = Object.keys(payload);

  keys.forEach((key) => {
    if (key === 'isActive' || key === 'isAdm' || key === 'id') {
      throw new AppError(
        'You do not have permission to change this value',
        401,
      );
    }
  });

  const userRepo = AppDataSource.getRepository(Users);
  const user = await userRepo.findOne({ where: { id: id } });

  const userUpdate = userRepo.create({ ...user, ...payload });
  await userRepo.save(userUpdate);

  return userUpdate;
};
