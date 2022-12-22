import { ICategory } from '../../interfaces/categories';
import { IAddressRequest, IPropertyRequest } from '../../interfaces/properties';
import { IUser } from '../../interfaces/users';

declare global {
  namespace Express {
    interface Request {
      foundUser: IUser;
      foundAddress: IAddressRequest;
      foundCategory: ICategory;
      foundProperty: IPropertyRequest;
    }
  }
}

export {};
