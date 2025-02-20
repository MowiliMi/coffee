import Boom from '@hapi/boom';
import { CustomerModel } from '@/application/model/customerModel';
import { publicField } from '@/application/model/customerDecorator';
import { createCustomerValidator } from '@/application/validators/customerValidator';

interface ICreateCustomerInput {
  name: string;
  email: string;
  password: string;
  location: string;
}

/**
 * Creates a new customer.
 *
 * This function validates the input data using `createCustomerValidator`.
 * If the validation fails, it returns a bad request error with the validation message.
 * It then checks if a customer with the same email or name already exists in the database.
 * If such a customer exists, it returns a bad request error indicating that the customer already exists.
 * If the customer does not exist, it creates a new customer record in the database and saves it.
 * Finally, it returns a success response with the created customer data.
 *
 * @param {ICreateCustomerInput} data - The input data for creating a customer.
 * @returns {Promise<Object>} The response object containing the status code and message.
 */
export const createCustomerCommand = async (data: ICreateCustomerInput) => {
  const { error } = createCustomerValidator.validate(data);
  if (error) {
    return Boom.badRequest(error.details[0].message).output.payload;
  }

  const { email, name } = data;
  const existingCustomer = await CustomerModel.findOne(
    {
      $or: [{ email }, { name }],
    },
    { email: 1, name: 1 },
  ).lean();

  if (existingCustomer) {
    return Boom.badRequest('Customer already exists').output.payload;
  }

  const customer = new CustomerModel(data);
  await customer.save();

  return {
    statusCode: 201,
    message: publicField(customer),
  };
};
