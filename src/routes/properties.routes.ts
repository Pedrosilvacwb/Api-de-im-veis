import { Router } from 'express';
import {
  createPropertiesController,
  listAllPropertiesController,
} from '../controllers/properties.controllers';
import {
  verifyCategoryIdMiddleware,
  verifyNumberAndZipCodeMiddleware,
  verifyPropertyExistsMiddleware,
} from '../middlewares/properties.middlewares';
import {
  verifyUserIsAdmMiddleware,
  verifyUserTokenMiddleware,
} from '../middlewares/users.middlewares';

const propertiesRoutes = Router();

propertiesRoutes.post(
  '',
  verifyUserTokenMiddleware,
  verifyUserIsAdmMiddleware,
  verifyCategoryIdMiddleware,
  verifyNumberAndZipCodeMiddleware,
  verifyPropertyExistsMiddleware,
  createPropertiesController,
);

propertiesRoutes.get('', listAllPropertiesController);

export default propertiesRoutes;
