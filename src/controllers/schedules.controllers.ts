import { Request, Response } from 'express';
import {
  createSchedulesService,
  listPropertiesSchedulesService,
} from '../services/schedules.services';

export const createScheduleController = async (req: Request, res: Response) => {
  const payload = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const data = await createSchedulesService(payload, token);

  return res.status(201).json({ message: data });
};

export const listPropertiesSchedulesController = async (
  req: Request,
  res: Response,
) => {
  const id = req.params.id;
  const data = await listPropertiesSchedulesService(id);

  return res.status(200).json(data);
};
