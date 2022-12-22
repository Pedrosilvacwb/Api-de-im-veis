import AppDataSource from '../data-source';
import Categories from '../entities/categories.entity';
import { AppError } from '../errors';
import { ICategory, ICategoryRequest } from '../interfaces/categories';

export const createCategoryService = async (
  payload: ICategoryRequest,
): Promise<ICategory> => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  const categoryExists = await categoryRepo.findOne({
    where: { name: payload.name },
  });

  if (categoryExists) throw new AppError('Category already exists!', 409);
  const newCategory = categoryRepo.create(payload);
  await categoryRepo.save(newCategory);

  return newCategory;
};

export const listAllCategoriesServices = async (): Promise<ICategory[]> => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  const categories = await categoryRepo.find();

  return categories;
};
