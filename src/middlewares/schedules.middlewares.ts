import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../data-source';
import Properties from '../entities/properties.entity';
import Users from '../entities/users.entity';
import { AppError } from '../errors';
import jwt from 'jsonwebtoken';
import Schedules from '../entities/schedules.entity';

export const validateDateAndTimeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const [hour, minute] = req.body.hour.split(':');
  const [year, month, day] = req.body.date.split('/');
  const date = new Date(year, month - 1, day, hour, minute).getDay();

  if (+hour < 8 || +hour > 18 || (+hour === 18 && +minute > 0)) {
    throw new AppError('Invalid Hour', 400);
  }
  if (date === 0 || date === 6) {
    throw new AppError('Invalid Date', 400);
  }
  return next();
};

export const validatePropertyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const propertyRepo = AppDataSource.getRepository(Properties);
  const property = await propertyRepo.findOne({
    where: { id: req.body.propertyId },
    relations: { schedules: true, address: true },
  });

  if (!property) throw new AppError('Property Not Found!', 404);
  const schedules = property.schedules;
  schedules.forEach((el) => {
    const formatedDate = el.date.replaceAll('-', '/');
    const formatedHour = el.hour.slice(0, 5);
    if (formatedDate === req.body.date || formatedHour === req.body.hour) {
      throw new AppError('Property schedule already exists', 409);
    }
  });

  return next();
};

export const validateUserScheduleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userEmail = jwt.decode(req.headers.authorization.split(' ')[1]).sub;
  const user = await AppDataSource.getRepository(Users).findOne({
    where: { email: userEmail as string },
  });

  const schedules = await AppDataSource.getRepository(Schedules).findOne({
    where: { date: req.body.date, hour: req.body.hour },
    relations: { user: true },
  });

  if (schedules && schedules.user.email === userEmail)
    throw new AppError('User schedule already exists', 409);

  return next();
};
