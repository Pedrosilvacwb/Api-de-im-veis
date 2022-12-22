import { Router } from 'express';
import { loginUserController } from '../controllers/session.controlllers';
import { validateUserInputDataMiddleware } from '../middlewares/users.middlewares';
import { loginUserSerializer } from '../serializers/users.serializer';

const sessionsRoutes = Router();

sessionsRoutes.post(
  '',
  validateUserInputDataMiddleware(loginUserSerializer),
  loginUserController,
);

export default sessionsRoutes;
