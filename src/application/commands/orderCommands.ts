import Boom from '@hapi/boom';
import { ObjectId } from 'mongodb';
import { CustomerModel } from '@/application/model/customerModel';
import { ProductModel } from '@/application/model/productModel';
import { OrderModel } from '@/application/model/orderModel';
import { createOrderValidator } from '@/application/validators/orderValidators';
import { isBlackFriday, isHoliday } from '@/application/services/orderService';

interface ICreateOrderInput {
  customerId: string;
  products: { _id: string; stock: number }[];
}

export const createOrderCommand = async (data: ICreateOrderInput) => {
  const { error } = createOrderValidator.validate(data);
  if (error) {
    return Boom.badRequest(error.details[0].message).output.payload;
  }

  const { customerId, products } = data;
  const existingCustomer = await CustomerModel.findOne({ _id: customerId }, { _id: 1, location: 1 }).lean();

  if (!existingCustomer) {
    return Boom.badRequest('Customer does not exist').output.payload;
  }

  const productIds = products.map((product) => new ObjectId(product._id));
  const orderProducts = await ProductModel.find({ _id: { $in: productIds } }, { _id: 1, price: 1, stock: 1 }).lean();
  if (!orderProducts?.length) {
    return Boom.badRequest('One or more products do not exist').output.payload;
  }

  const insufficientStock = orderProducts.some((item) => {
    const orderProduct = products.find((p) => p._id === item._id.toString());

    if (orderProduct && item?.stock < orderProduct.stock) {
      return true;
    }

    return false;
  });

  if (insufficientStock) {
    return Boom.badRequest('Insufficient stock for one or more products').output.payload;
  }

  let totalOrderValue = 0;
  let totalQuantity = 0;
  let locationMultiplier = 1;

  const customerRegion = existingCustomer.location;
  switch (customerRegion) {
    case 'eu':
      locationMultiplier = 1.15; // 15% VAT
      break;
    case 'asia':
      locationMultiplier = 0.95; // 5% discount due to logistics
      break;
    default:
      locationMultiplier = 1; // Standard pricing for US and other regions
  }

  orderProducts.forEach((item) => {
    const orderProduct = products.find((p) => p._id === item._id.toString());
    const price = item.price * locationMultiplier;
    if (orderProduct) {
      totalOrderValue += price * orderProduct.stock;
      totalQuantity += orderProduct.stock;
    }
  });

  let highestDiscount = 0;
  if (totalQuantity >= 50) {
    highestDiscount = Math.max(highestDiscount, 0.3);
  } else if (totalQuantity >= 10) {
    highestDiscount = Math.max(highestDiscount, 0.2);
  } else if (totalQuantity >= 5) {
    highestDiscount = Math.max(highestDiscount, 0.1);
  }

  if (isBlackFriday()) {
    highestDiscount = Math.max(highestDiscount, 0.25);
  } else if (isHoliday()) {
    highestDiscount = Math.max(highestDiscount, 0.15);
  }

  totalOrderValue *= 1 - highestDiscount;

  const order = new OrderModel({
    customerId,
    products: products.map((product) => ({ _id: new ObjectId(product._id), quantity: product.stock })),
    totalValue: totalOrderValue,
    discounts: highestDiscount,
    location: existingCustomer.location,
  });
  await order.save();

  await Promise.all(
    order.products.map(async (product) => {
      await ProductModel.updateOne({ _id: product._id }, { $inc: { stock: -product.quantity } });
    }),
  );

  return {
    statusCode: 201,
    message: order,
  };
};
