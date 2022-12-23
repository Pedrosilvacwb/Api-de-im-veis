import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserController,
} from '../controllers/users.controllers';
import {
  validateUserInputDataMiddleware,
  verifyDuplicateUserEmailMiddleware,
  verifyUserExistsMiddleware,
  verifyUserIsAdmMiddleware,
  verifyUserTokenMiddleware,
} from '../middlewares/users.middlewares';
import { createUserSerializer } from '../serializers/users.serializer';

const userRouter = Router();

userRouter.get(
  '',
  verifyUserTokenMiddleware,
  verifyUserIsAdmMiddleware,
  listUsersController,
);

userRouter.post(
  '',
  validateUserInputDataMiddleware(createUserSerializer),
  verifyDuplicateUserEmailMiddleware,
  createUserController,
);

userRouter.delete(
  '/:id',
  verifyUserTokenMiddleware,
  verifyUserIsAdmMiddleware,
  verifyUserExistsMiddleware,
  deleteUserController,
);

userRouter.patch(
  '/:id',
  verifyUserTokenMiddleware,
  verifyUserIsAdmMiddleware,
  verifyUserExistsMiddleware,
  updateUserController,
);

export default userRouter;
