import Joi from 'joi';

/**
 * Validator for creating a product category.
 * 
 * This validator ensures that the product category object has the following properties:
 * - `name`: A string with a minimum length of 3 and a maximum length of 30 characters. This field is required.
 * - `description`: A string with a minimum length of 3 and a maximum length of 100 characters. This field is required.
 * - `enabled`: A boolean indicating whether the product category is enabled. This field is required.
 */
export const createProductCategoryValidator = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(100).required(),
  enabled: Joi.boolean().required(),
});

/**
 * Validator for getting a product category by permalink.
 * 
 * This validator ensures that the permalink is a string with a maximum length of 50 characters and is required.
 */
export const getProductCategoryByPermalinkValidator = Joi.object({
  permalink: Joi.string().max(50).required(),
});
