import mongoose, { Document, Schema } from 'mongoose';

export interface IProductCategory extends Document {
  name: string;
  description: string;
  enabled: boolean;
  permalink: string;
}

/**
 * Schema for the Product Category model.
 * 
 * @property {string} name - The name of the product category. This field is required.
 * @property {string} description - A description of the product category. This field is required.
 * @property {boolean} enabled - Indicates whether the product category is enabled. This field is required.
 * @property {string} permalink - The permalink for the product category. This field is required.
 */
const ProductCategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  enabled: { type: Boolean, required: true },
  permalink: { type: String, required: true },
});

export const ProductCategoryModel = mongoose.model<IProductCategory>(
  'productsCategory',
  ProductCategorySchema,
  'productsCategories',
);
