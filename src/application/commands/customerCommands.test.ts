import Boom from '@hapi/boom';
import { createCustomerCommand } from './customerCommands';
import { CustomerModel } from '../model/customerModel';
import { createCustomerValidator } from '../validators/customerValidator';

jest.mock('@/application/model/customerModel');
jest.mock('@/application/validators/customerValidator', () => ({
  createCustomerValidator: {
    validate: jest.fn(),
  },
}));
jest.mock('@/application/model/customerDecorator', () => ({
  publicField: jest.fn(),
}));

describe('createCustomerCommand', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return validation error if input is invalid', async () => {
    (createCustomerValidator.validate as jest.Mock).mockReturnValue({
      error: { details: [{ message: 'Invalid data' }] },
    });

    const result = await createCustomerCommand({ name: '', email: '', password: '', location: '' });

    expect(result).toEqual(Boom.badRequest('Invalid data').output.payload);
  });

  it('should return an error if customer already exists', async () => {
    (createCustomerValidator.validate as jest.Mock).mockReturnValue({ error: null });
    (CustomerModel.findOne as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue({ email: 'test@example.com', name: 'John Doe' }),
    });

    const result = await createCustomerCommand({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
      location: 'NYC',
    });

    expect(result).toEqual(Boom.badRequest('Customer already exists').output.payload);
  });
});
