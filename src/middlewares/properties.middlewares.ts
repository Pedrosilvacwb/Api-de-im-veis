import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../data-source';
import Addresses from '../entities/addresses.entity';
import Categories from '../entities/categories.entity';
import { AppError } from '../errors';

export const verifyPropertyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const addressRepo = AppDataSource.getRepository(Addresses);
  const address = await addressRepo.findOne({
    where: {
      district: req.body.address.district,
      number: req.body.address.number,
      zipCode: req.body.address.zipCode,
    },
  });
  if (address) {
    throw new AppError('Adress Already exists!', 409);
  }

  return next();
};

export const verifyNumberAndZipCodeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const zipCode = req.body.address.zipCode;
  const state = req.body.address.state;

  if (zipCode.length > 8 || state.length > 2) {
    throw new AppError('Invalid Data', 400);
  }

  return next();
};

export const verifyCategoryIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  const category = await categoryRepo.findOne({
    where: { id: req.body.categoryId },
  });
  if (!category) throw new AppError('Category not found!', 404);

  req.foundCategory = category;
  return next();
};
