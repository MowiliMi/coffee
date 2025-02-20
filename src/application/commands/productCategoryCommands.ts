import Boom from '@hapi/boom';
import { ProductCategoryModel } from '@/application/model/productCategoryModel';
import { createProductCategoryValidator } from '@/application/validators/productCategoryValidators';
import { createPermalink } from '@/utils/permalink';

interface ICreateProductCategoryInput {
  name: string;
  description: string;
  enabled: boolean;
}

/**
 * Creates a new product category.
 *
 * This function validates the input data using `createProductCategoryValidator`.
 * If validation fails, it returns a bad request error with the validation message.
 * It then checks if a product category with the same name already exists.
 * If it does, it returns a bad request error indicating that the product category already exists.
 * If the product category does not exist, it creates a new product category,
 * generates a permalink for it, saves it to the database, and returns a success response.
 *
 * @param {ICreateProductCategoryInput} data - The input data for creating a product category.
 * @returns {Promise<{ statusCode: number; message: any } | { statusCode: number; error: string; message: string }>} 
 * A promise that resolves to an object containing the status code and either the created product category or an error message.
 */
export const createProductCategoryCommand = async (data: ICreateProductCategoryInput) => {
  const { error } = createProductCategoryValidator.validate(data);
  if (error) {
    return Boom.badRequest(error.details[0].message).output.payload;
  }

  const { name } = data;
  const existingProductCategory = await ProductCategoryModel.findOne({ name }, { name: 1 }).lean();

  if (existingProductCategory) {
    return Boom.badRequest('Product category already exists').output.payload;
  }

  const productCategory = new ProductCategoryModel({
    ...data,
    permalink: createPermalink(name),
  });
  await productCategory.save();

  return {
    statusCode: 201,
    message: productCategory,
  };
};
