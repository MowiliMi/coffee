import { Request, Response } from 'express';
import { createOrderCommand } from '@/application/commands/orderCommands';

export const createOrder = async (req: Request, res: Response) => {
  const { statusCode, message } = await createOrderCommand(req.body);
  res.status(statusCode).json({
    statusCode,
    message,
  });
};
