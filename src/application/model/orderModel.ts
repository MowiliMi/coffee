import mongoose, { Document, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IOrder extends Document {
  customerId: ObjectId;
  products: {
      _id: unknown | ObjectId; productId: ObjectId; quantity: number 
}[];
  discounts: number;
}

/**
 * @typedef {Object} OrderSchema
 * @property {Schema.Types.ObjectId} customerId - The ID of the customer placing the order. This field is required.
 * @property {Array.<Object>} products - An array of products included in the order.
 * @property {Schema.Types.ObjectId} products.id - The ID of the product. This field is required.
 * @property {number} products.quantity - The quantity of the product. This field is required and must be at least 1.
 * @property {number} discounts - The total discounts applied to the order. Defaults to 0.
 * @property {Date} createdAt - The date and time when the order was created. This field is automatically managed by Mongoose.
 * @property {Date} updatedAt - The date and time when the order was last updated. This field is automatically managed by Mongoose.
 */
const OrderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'customer',
      required: true,
    },
    products: [
      {
        _id: { type: Schema.Types.ObjectId, ref: 'product', required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    discounts: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const OrderModel = mongoose.model<IOrder>('order', OrderSchema, 'orders');
