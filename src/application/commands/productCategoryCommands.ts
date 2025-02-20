import Boom from '@hapi/boom';
import { ProductCategoryModel } from '@/application/model/productCategoryModel';
import { createProductCategoryValidator } from '@/application/validators/productCategoryValidators';
import { createPermalink } from '@/utils/permalink';

interface ICreateProductCategoryInput {
  name: string;
  description: string;
  enabled: boolean;
}

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
