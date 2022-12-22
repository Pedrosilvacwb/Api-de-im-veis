import {
  createPropertiesService,
  listAllPropertiesService,
} from '../services/properties.services';
import { Request, Response } from 'express';

export const createPropertiesController = async (
  req: Request,
  res: Response,
) => {
  const data = await createPropertiesService(req.body, req.foundCategory);

  return res.status(201).json(data);
};

export const listAllPropertiesController = async (
  req: Request,
  res: Response,
) => {
  const data = await listAllPropertiesService();

  return res.status(200).json(data);
};
