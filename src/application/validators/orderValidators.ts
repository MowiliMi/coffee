import Joi from 'joi';

export const createOrderValidator = Joi.object({
  customerId: Joi.string().hex().length(24),
  products: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().hex().length(24),
        stock: Joi.number().min(1).max(200).required(),
      }),
    )
    .required(),
});
