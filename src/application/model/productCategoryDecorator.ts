import { IProductCategory } from '@/application/model/productCategoryModel';
import { deepPick } from '@/utils/deepPick';

/**
 * An array of field names representing the properties of a product category.
 * 
 * @constant
 * @type {string[]}
 * @default ['name', 'description', 'permalink']
 */
const fields = ['name', 'description', 'permalink'];

/**
 * Selects and returns specific fields from a product category item.
 *
 * @param item - The product category item to pick fields from.
 * @returns An object containing only the selected fields from the item.
 */
export const publicField = (item: IProductCategory) => deepPick(item, fields);

/**
 * Filters and maps an array of product categories to their public fields.
 *
 * @param items - An optional array of product categories to be processed. 
 *                If the array is null, undefined, or empty, the function returns null.
 * @returns An array of public fields of the product categories, or null if the input array is null, undefined, or empty.
 */
export const publicFields = (items?: IProductCategory[] | null) => {
  if (!items?.length) {
    return null;
  }

  return items.map((item: IProductCategory) => publicField(item) || null);
};
