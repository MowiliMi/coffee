import Joi from 'joi';

/**
 * Validator for creating a product.
 *
 * This validator ensures that the product object being created adheres to the following rules:
 * - `name`: A string with a minimum length of 3 and a maximum length of 50 characters. This field is required.
 * - `description`: A string with a minimum length of 3 and a maximum length of 50 characters. This field is required.
 * - `categoryIds`: An array of strings representing category IDs. This field is required.
 * - `price`: A number with a minimum value of 10. This field is required.
 * - `stock`: A number with a minimum value of 1. This field is required.
 * - `enabled`: A boolean indicating whether the product is enabled. This field is required.
 */
export const createProductValidator = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(3).max(50).required(),
  categoryIds: Joi.array().items(Joi.string()).required(),
  price: Joi.number().min(10).required(),
  stock: Joi.number().min(1).required(),
  enabled: Joi.boolean().required(),
});

/**
 * Validator for product stock operations.
 *
 * This validator ensures that the provided object contains:
 * - `id`: A required string representing the product ID.
 * - `type`: A required string that must be either 'restock' or 'sell'.
 */
export const pathProductStockValidator = Joi.object({
  id: Joi.string().hex().length(24),
  type: Joi.string().valid('restock', 'sell').required(),
});
