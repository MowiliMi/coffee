import Boom from '@hapi/boom';
import { CustomerModel } from '@/application/model/customerModel';
import { getCustomerByEmailValidator } from '@/application/validators/customerValidator';
import { publicField, publicFields } from '@/application/model/customerDecorator';

/**
 * Retrieves a customer by their email address.
 *
 * @param email - The email address of the customer to retrieve.
 * @returns A promise that resolves to an object containing the status code and customer details,
 *          or an error payload if the customer is not found or the email is invalid.
 */
export const getCustomerByEmailQuery = async (email: string) => {
  const { error } = getCustomerByEmailValidator.validate({ email });
  if (error) {
    return Boom.badRequest(error.details[0].message).output.payload;
  }

  const customer = await CustomerModel.findOne({ email }, { email: 1, name: 1, createdAt: 1 }).lean();

  if (!customer) {
    return Boom.notFound('Customer not found').output.payload;
  }

  return {
    statusCode: 200,
    message: publicField(customer),
  };
};

/**
 * Retrieves a list of customers with selected fields (email, name, createdAt).
 * Limits the result to 100 customers.
 *
 * @returns {Promise<{ statusCode: number, message: any }>} An object containing the status code and the list of customers with public fields.
 */
export const getCustomersQuery = async () => {
  const customers = await CustomerModel.find({}, { email: 1, name: 1, createdAt: 1 }).limit(100).lean();

  if (!customers) {
    return Boom.notFound('No customers found').output.payload;
  }

  return {
    statusCode: 200,
    message: publicFields(customers),
  };
};
