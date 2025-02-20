import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  email: string;
  password: string;
  location: string;
}

/**
 * @schema CustomerSchema
 * @description Mongoose schema for the Customer model.
 *
 * @property {string} name - The name of the customer. This field is required and must be unique.
 * @property {string} email - The email of the customer. This field is required and must be unique.
 * @property {string} password - The password of the customer. This field is required.
 *
 * @option {boolean} timestamps - Automatically adds createdAt and updatedAt timestamps to the schema.
 */
const CustomerSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true },
);

export const CustomerModel = mongoose.model<ICustomer>('customer', CustomerSchema, 'customers');
