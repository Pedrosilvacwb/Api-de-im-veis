import { Request, Response } from 'express';
import {
  createCategoryService,
  listAllCategoriesServices,
} from '../services/categories.services';

export const createCategoryController = async (req: Request, res: Response) => {
  const data = await createCategoryService(req.body);

  return res.status(201).json(data);
};

export const listAllCategoriesController = async (
  req: Request,
  res: Response,
) => {
  const data = await listAllCategoriesServices();

  return res.status(200).json(data);
};
