import { Request, Response } from 'express';
import { createProductCategoryCommand } from '@/application/commands/productCategoryCommands';
import {
  getProductCategoryByPermalinkQuery,
  getProductCategoriesQuery,
} from '@/application/queries/productCategoryQueries';

export const createProductCategory = async (req: Request, res: Response) => {
  const { statusCode, message } = await createProductCategoryCommand(req.body);
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

export const getProductCategoryByPermalink = async (req: Request, res: Response) => {
  const { statusCode, message } = await getProductCategoryByPermalinkQuery(req.params.permalink);
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

export const getProductCategories = async (req: Request, res: Response) => {
  const { statusCode, message } = await getProductCategoriesQuery();
  res.status(statusCode).json({
    statusCode,
    message,
  });
};
