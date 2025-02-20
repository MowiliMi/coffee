import Boom from '@hapi/boom';
import { CustomerModel } from '@/application/model/customerModel';
import { publicField } from '@/application/model/customerDecorator';
import { createCustomerValidator } from '@/application/validators/customerValidator';

interface ICreateCustomerInput {
  name: string;
  email: string;
  password: string;
}

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
