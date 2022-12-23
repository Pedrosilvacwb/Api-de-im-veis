import { Router } from 'express';
import {
  createCategoryController,
  listAllCategoriesController,
  retrievePropertiesFromCategoryController,
} from '../controllers/categories.controllers';
import { verifyCategoryIdMiddleware } from '../middlewares/properties.middlewares';
import {
  verifyUserIsAdmMiddleware,
  verifyUserTokenMiddleware,
} from '../middlewares/users.middlewares';

const categoriesRoutes = Router();

categoriesRoutes.post(
  '',
  verifyUserTokenMiddleware,
  verifyUserIsAdmMiddleware,
  createCategoryController,
);

categoriesRoutes.get('', listAllCategoriesController);
categoriesRoutes.get(
  '/:id/properties',
  retrievePropertiesFromCategoryController,
);

export default categoriesRoutes;
