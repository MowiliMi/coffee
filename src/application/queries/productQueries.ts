import Boom from '@hapi/boom';
import { ProductModel } from '@/application/model/productModel';
import { publicFields } from '@/application/model/productDecorator';

/**
 * Retrieves a list of products from the database.
 *
 * @returns {Promise<{ statusCode: number; message: any }>} An object containing the status code and the list of products with selected fields.
 *
 * @async
 */
export const getProductsQuery = async () => {
  const products = await ProductModel.find(
    {},
    { name: 1, description: 1, price: 1, stock: 1, category: 1, permalink: 1 },
  )
    .limit(100)
    .lean();

  return {
    statusCode: 200,
    message: publicFields(products),
  };
};
