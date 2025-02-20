import { Request, Response } from 'express';
import {
  ProductStockType,
  createProductCommand,
  pathProductStockCommand,
} from '@/application/commands/productCommands';
import { getProductsQuery } from '@/application/queries/productQueries';

export const createProduct = async (req: Request, res: Response) => {
  const { statusCode, message } = await createProductCommand(req.body);
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

export const getProducts = async (req: Request, res: Response) => {
  const { statusCode, message } = await getProductsQuery();
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

export const increaseProductStock = async (req: Request, res: Response) => {
  const { statusCode, message } = await pathProductStockCommand({
    id: req.params.id,
    type: ProductStockType.RESTOCK,
  });

  res.status(statusCode).json({
    statusCode,
    message,
  });
};

export const decreaseProductStock = async (req: Request, res: Response) => {
  const { statusCode, message } = await pathProductStockCommand({
    id: req.params.id,
    type: ProductStockType.SELL,
  });

  res.status(statusCode).json({
    statusCode,
    message,
  });
};
