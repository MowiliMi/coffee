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

// adding categoryIds reference from array

export const getProductsQuery = async () => {
  const products = await ProductModel.find(
    {},
    { name: 1, description: 1, price: 1, stock: 1, category: 1, permalink: 1 },
  )
    .populate('categoryIds', 'name description permalink')
    .limit(100)
    .lean();

  if (!products) {
    return Boom.notFound('No products found').output.payload;
  }

  return {
    statusCode: 200,
    message: publicFields(products),
  };
};
