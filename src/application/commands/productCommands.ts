import Boom from '@hapi/boom';
import { ProductModel } from '@/application/model/productModel';
import { createProductValidator } from '@/application/validators/productValidators';
import { createPermalink } from '@/utils/permalink';
import { publicField } from '@/application/model/productDecorator';

interface ICreateProductInput {
  name: string;
  description: string;
  categoryIds: string[];
  price: number;
  stock: number;
}

export enum ProductStockType {
  RESTOCK = 'restock',
  SELL = 'sell',
}

interface IProductStockInput {
  id: string;
  type: ProductStockType;
}

/**
 * Creates a new product.
 *
 * This function validates the input data for creating a product, checks if a product with the same name already exists,
 * and if not, creates a new product and saves it to the database.
 *
 * @param {ICreateProductInput} data - The input data for creating a product.
 * @returns {Promise<object>} - Returns a promise that resolves to an object containing the status code and message.
 * If validation fails or the product already exists, it returns a bad request error payload.
 */
export const createProductCommand = async (data: ICreateProductInput) => {
  const { error } = createProductValidator.validate(data);
  if (error) {
    return Boom.badRequest(error.details[0].message).output.payload;
  }

  const { name } = data;
  const existingProduct = await ProductModel.findOne({ name }, { name: 1 }).lean();

  if (existingProduct) {
    return Boom.badRequest('Product already exists').output.payload;
  }

  const product = new ProductModel({
    ...data,
    permalink: createPermalink(name),
  });
  await product.save();

  return {
    statusCode: 201,
    message: publicField(product),
  };
};

/**
 * Updates the stock of a product based on the provided input data.
 *
 * @param {IProductStockInput} data - The input data containing the product ID and stock update type.
 * @returns {Promise<object>} - A promise that resolves to an object containing the status code and message.
 *
 * @throws {Boom.Boom} - Throws an error if the product is not found or if the stock update is invalid.
 *
 * @example
 * const data = { id: 'productId', type: ProductStockType.RESTOCK };
 * const result = await pathProductStockCommand(data);
 */
export const pathProductStockCommand = async (data: IProductStockInput) => {
  const { id, type } = data;
  const product = await ProductModel.findOne({ _id: id }, { _id: 1 }).lean();

  if (!product) {
    return Boom.badRequest('Product not found').output.payload;
  }

  if (type === ProductStockType.SELL && product.stock === 1) {
    return Boom.badRequest('Product stock cannot be below zero').output.payload;
  }

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    { _id: id },
    { $inc: { stock: type === ProductStockType.RESTOCK ? 1 : -1 } },
    { new: true },
  ).lean();

  if (!updatedProduct) {
    return Boom.badRequest('Product out of stock').output.payload;
  }

  return {
    statusCode: 200,
    message: publicField(updatedProduct),
  };
};
