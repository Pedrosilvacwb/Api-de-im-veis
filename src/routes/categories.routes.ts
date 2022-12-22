import { Router } from 'express';
import {
  createCategoryController,
  listAllCategoriesController,
} from '../controllers/categories.controllers';
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

export default categoriesRoutes;
