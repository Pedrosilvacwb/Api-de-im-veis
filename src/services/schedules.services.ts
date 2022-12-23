import AppDataSource from '../data-source';
import Properties from '../entities/properties.entity';
import Schedules from '../entities/schedules.entity';
import Users from '../entities/users.entity';
import { IScheduleRequest } from '../interfaces/schedules';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors';

export const createSchedulesService = async (
  payload: IScheduleRequest,
  token: string,
) => {
  const schedulesRepo = AppDataSource.getRepository(Schedules);
  const userRepo = AppDataSource.getRepository(Users);
  const propertyRepo = AppDataSource.getRepository(Properties);

  const userEmail = jwt.decode(token).sub;
  const user = await userRepo.findOne({
    where: { email: userEmail as string },
  });

  const property = await propertyRepo.findOne({
    where: { id: payload.propertyId },
    relations: { address: true },
  });
  const newSchedule = schedulesRepo.create({ ...payload, user, property });
  await schedulesRepo.save(newSchedule);
  return 'Schedule created!';
};

export const listPropertiesSchedulesService = async (id: string) => {
  const properties = await AppDataSource.getRepository(Properties)
    .createQueryBuilder('properties')
    .innerJoinAndSelect('properties.schedules', 'schedules')
    .innerJoinAndSelect('schedules.user', 'user')
    .innerJoinAndSelect('properties.address', 'address')
    .innerJoinAndSelect('properties.category', 'category')
    .where('properties.id = :id', { id: id })
    .getOne();

  if (!properties) throw new AppError('Property not found!', 404);
  return properties;
};
