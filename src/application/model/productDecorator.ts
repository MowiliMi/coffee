import { IProduct } from '@/application/model/productModel';
import { deepPick } from '@/utils/deepPick';

/**
 * An array of field names representing the properties of a product.
 * 
 * Fields included:
 * - `name`: The name of the product.
 * - `description`: A brief description of the product.
 * - `price`: The price of the product.
 * - `stock`: The available stock quantity of the product.
 * - `category`: The category to which the product belongs.
 * - `permalink`: A permanent link to the product.
 */
const fields = ['name', 'description', 'price', 'stock', 'category', 'permalink'];

/**
 * Selects and returns specific fields from the given product item.
 *
 * @param item - The product item from which fields are to be selected.
 * @returns The product item with only the specified fields.
 */
export const publicField = (item: IProduct) => deepPick(item, fields);

/**
 * Filters and maps an array of products to their public fields.
 *
 * @param items - An optional array of products to be processed. If null or undefined, the function returns null.
 * @returns An array of products with only their public fields, or null if the input array is empty or not provided.
 */
export const publicFields = (items?: IProduct[] | null) => {
  if (!items?.length) {
    return null;
  }

  return items.map((item: IProduct) => publicField(item) || null);
};
