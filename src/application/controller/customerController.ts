import { Request, Response } from 'express';
import { createCustomerCommand } from '@/application/commands/customerCommands';
import { getCustomerByEmailQuery, getCustomersQuery } from '@/application/queries/customerQueries';

export const createCustomer = async (req: Request, res: Response) => {
  const { statusCode, message } = await createCustomerCommand(req.body);
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

export const getCustomerByEmail = async (req: Request, res: Response) => {
  const { statusCode, message } = await getCustomerByEmailQuery(req.params.email);
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

export const getCustomers = async (req: Request, res: Response) => {
  const { statusCode, message } = await getCustomersQuery();
  res.status(statusCode).json({
    statusCode,
    message,
  });
};
