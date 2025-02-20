import mongoose, { Document, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IProduct extends Document {
  name: string;
  description: string;
  categoryIds: ObjectId[];
  price: number;
  stock: number;
}

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    categoryIds: [{ type: Schema.Types.ObjectId, ref: 'productCategory', required: true }],
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model<IProduct>('product', ProductSchema, 'products');
