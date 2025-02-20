import Joi from 'joi';

export const createProductCategoryValidator = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(100).required(),
  enabled: Joi.boolean().required(),
});

export const getProductCategoryByPermalinkValidator = Joi.object({
  permalink: Joi.string().max(50).required(),
});
