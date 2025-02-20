import mongoose, { Document, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IProduct extends Document {
  name: string;
  description: string;
  categoryIds: ObjectId[];
  price: number;
  stock: number;
}

/**
 * @typedef {Object} ProductSchema
 * @property {string} name - The name of the product. This field is required.
 * @property {string} description - A description of the product. This field is required.
 * @property {Array<ObjectId>} categoryIds - An array of category IDs that the product belongs to. This field is required.
 * @property {number} price - The price of the product. This field is required.
 * @property {number} stock - The stock quantity of the product. This field is required.
 * @property {Date} createdAt - The date and time when the product was created. This field is automatically generated.
 * @property {Date} updatedAt - The date and time when the product was last updated. This field is automatically generated.
 */
const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    categoryIds: [{ type: Schema.Types.ObjectId, ref: 'productsCategory', required: true }],
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model<IProduct>('product', ProductSchema, 'products');
