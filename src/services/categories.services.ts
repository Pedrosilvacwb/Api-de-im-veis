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

export const retrievePropertiesFromCategoryService = async (id: string) => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  const category = await categoryRepo.findOne({
    where: { id: id },
    relations: { properties: true },
  });
  if (!category) throw new AppError('Category not Found!', 404);

  return category;
};
