import Boom from '@hapi/boom';
import { CustomerModel } from '@/application/model/customerModel';
import { getCustomerByEmailValidator } from '@/application/validators/customerValidator';
import { publicField, publicFields } from '@/application/model/customerDecorator';

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

export const getCustomersQuery = async () => {
  const customers = await CustomerModel.find({}, { email: 1, name: 1, createdAt: 1 }).lean();

  return {
    statusCode: 200,
    message: publicFields(customers),
  };
};
