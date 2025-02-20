import Boom from '@hapi/boom';
import { ProductCategoryModel } from '@/application/model/productCategoryModel';
import { getProductCategoryByPermalinkValidator } from '@/application/validators/productCategoryValidators';
import { publicField, publicFields } from '@/application/model/productCategoryDecorator';

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

export const getProductCategoriesQuery = async () => {
  const productCategories = await ProductCategoryModel.find({}, { name: 1, description: 1, permalink: 1 })
    .limit(100)
    .lean();

  return {
    statusCode: 200,
    message: publicFields(productCategories),
  };
};
