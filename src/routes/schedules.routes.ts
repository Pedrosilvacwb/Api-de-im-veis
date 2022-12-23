import { Router } from 'express';
import {
  createScheduleController,
  listPropertiesSchedulesController,
} from '../controllers/schedules.controllers';
import {
  validateDateAndTimeMiddleware,
  validatePropertyMiddleware,
  validateUserScheduleMiddleware,
} from '../middlewares/schedules.middlewares';
import {
  verifyUserIsAdmMiddleware,
  verifyUserTokenMiddleware,
} from '../middlewares/users.middlewares';

const schedulesRoutes = Router();

schedulesRoutes.post(
  '',
  verifyUserTokenMiddleware,
  validateDateAndTimeMiddleware,
  validatePropertyMiddleware,
  validateUserScheduleMiddleware,
  createScheduleController,
);

schedulesRoutes.get(
  '/properties/:id',
  verifyUserTokenMiddleware,
  verifyUserIsAdmMiddleware,
  listPropertiesSchedulesController,
);
export default schedulesRoutes;
