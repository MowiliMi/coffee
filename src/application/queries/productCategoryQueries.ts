import Boom from '@hapi/boom';
import { ProductCategoryModel } from '@/application/model/productCategoryModel';
import { getProductCategoryByPermalinkValidator } from '@/application/validators/productCategoryValidators';
import { publicField, publicFields } from '@/application/model/productCategoryDecorator';

/**
 * Retrieves a product category by its permalink.
 *
 * @param {string} permalink - The permalink of the product category to retrieve.
 * @returns {Promise<object>} The product category data or an error payload.
 *
 * @throws {Boom.badRequest} If the permalink validation fails.
 * @throws {Boom.notFound} If no product category is found with the given permalink.
 */
export const getProductCategoryByPermalinkQuery = async (permalink: string) => {
  const { error } = getProductCategoryByPermalinkValidator.validate({ permalink });
  if (error) {
    return Boom.badRequest(error.details[0].message).output.payload;
  }

  const productCategory = await ProductCategoryModel.findOne(
    { permalink },
    { name: 1, description: 1, permalink: 1 },
  ).lean();

  if (!productCategory) {
    return Boom.notFound('Product category not found').output.payload;
  }

  return {
    statusCode: 200,
    message: publicField(productCategory),
  };
};

/**
 * Retrieves a list of product categories from the database.
 *
 * @returns {Promise<{ statusCode: number, message: any }>} An object containing the status code and the list of product categories with public fields.
 */
export const getProductCategoriesQuery = async () => {
  const productCategories = await ProductCategoryModel.find({}, { name: 1, description: 1, permalink: 1 })
    .limit(100)
    .lean();

  return {
    statusCode: 200,
    message: publicFields(productCategories),
  };
};
