import AppDataSource from '../data-source';
import Addresses from '../entities/addresses.entity';
import Categories from '../entities/categories.entity';
import Properties from '../entities/properties.entity';
import { AppError } from '../errors';
import { ICategory } from '../interfaces/categories';
import { IPropertyRequest } from '../interfaces/properties';

export const createPropertiesService = async (
  payload: IPropertyRequest,
  category: ICategory,
) => {
  const propertiesRepo = AppDataSource.getRepository(Properties);
  const addressRepo = AppDataSource.getRepository(Addresses);

  const address = addressRepo.create(payload.address);
  await addressRepo.save(address);

  const newProperty = propertiesRepo.create({
    ...payload,
    address,
    category,
  });
  await propertiesRepo.save(newProperty);
  return newProperty;
};

export const listAllPropertiesService = async () => {
  const propertiesRepo = AppDataSource.getRepository(Properties);
  const properties = propertiesRepo.find();
  return properties;
};
