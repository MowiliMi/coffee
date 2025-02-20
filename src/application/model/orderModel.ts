import mongoose, { Document, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IOrder extends Document {
  customerId: ObjectId;
  productIds: ObjectId[];
  total: number;
}

/**
 * Schema definition for the Order model.
 * 
 * @property {ObjectId} customerId - The ID of the customer who placed the order. This field is required.
 * @property {ObjectId[]} productIds - An array of product IDs included in the order. Each product ID is required.
 * @property {number} total - The total amount for the order. This field is required.
 * 
 * @schema OrderSchema
 * @timestamps true - Automatically adds `createdAt` and `updatedAt` timestamps to the schema.
 */
const OrderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'customer',
      required: true,
    },
    productIds: [{ type: Schema.Types.ObjectId, ref: 'product', required: true }],
    total: { type: Number, required: true },
  },
  { timestamps: true },
);

export const OrderModel = mongoose.model<IOrder>('order', OrderSchema, 'orders');
