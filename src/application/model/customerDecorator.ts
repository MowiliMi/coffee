import { ICustomer } from '@/application/model/customerModel';
import { deepPick } from '@/utils/deepPick';

/**
 * An array of field names related to the customer model.
 * 
 * @constant
 * @type {string[]}
 * @default ['name', 'email', 'createdAt']
 */
const fields = ['name', 'email', 'createdAt'];

/**
 * Selects and returns specific fields from the given customer object.
 *
 * @param item - The customer object from which fields are to be selected.
 * @returns A new object containing only the specified fields from the customer object.
 */
export const publicField = (item: ICustomer) => deepPick(item, fields);

/**
 * Filters and maps an array of ICustomer objects to their public fields.
 *
 * @param items - An optional array of ICustomer objects or null.
 * @returns An array of public fields of the ICustomer objects or null if the input is null or empty.
 */
export const publicFields = (items?: ICustomer[] | null) => {
  if (!items?.length) {
    return null;
  }

  return items.map((item: ICustomer) => publicField(item) || null);
};
