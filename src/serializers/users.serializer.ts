import * as yup from 'yup';

export const createUserSerializer = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  isAdm: yup.boolean().required(),
  password: yup.string().required(),
});

export const loginUserSerializer = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const displayUserSerializer = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  isAdm: yup.boolean().required(),
  isActive: yup.boolean().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
});

export const listUsersDisplaySerializer = yup.array().of(displayUserSerializer);
