import Joi from 'joi';

/**
 * Validator for creating a new customer.
 * 
 * This validator ensures that the customer object has the following properties:
 * - `name`: A string with a minimum length of 3 and a maximum length of 30. This field is required.
 * - `email`: A valid email address. This field is required.
 * - `password`: A string with a minimum length of 6. This field is required.
 */
export const createCustomerValidator = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

/**
 * Validator for retrieving a customer by email.
 * 
 * This validator ensures that the provided email is a valid string,
 * follows the email format, and is required.
 */
export const getCustomerByEmailValidator = Joi.object({
  email: Joi.string().email().required(),
});
