import Joi from 'joi';

export const createProductValidator = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(3).max(50).required(),
  categoryIds: Joi.array().items(Joi.string()).required(),
  price: Joi.number().min(10).required(),
  stock: Joi.number().min(1).required(),
  enabled: Joi.boolean().required(),
});

export const pathProductStockValidator = Joi.object({
  id: Joi.string().required(),
  type: Joi.string().valid('restock', 'sell').required(),
});
