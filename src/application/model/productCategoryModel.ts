import mongoose, { Document, Schema } from 'mongoose';

export interface IProductCategory extends Document {
  name: string;
  description: string;
  enabled: boolean;
  permalink: string;
}

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
