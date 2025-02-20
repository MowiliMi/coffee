import mongoose, { Document, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IOrder extends Document {
  customerId: ObjectId;
  productIds: ObjectId[];
  total: number;
}

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
