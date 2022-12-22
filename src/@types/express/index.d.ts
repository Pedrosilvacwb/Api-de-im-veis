import { IUser } from '../../interfaces/users';

declare global {
  namespace Express {
    interface Request {
      foundData: IUser extends { isActive: boolean };
    }
  }
}

export {};
