import { ICustomer } from '@/application/model/customerModel';
import { deepPick } from '@/utils/deepPick';

const fields = ['name', 'email', 'createdAt'];

export const publicField = (item: ICustomer) => deepPick(item, fields);

export const publicFields = (items?: ICustomer[] | null) => {
  if (!items?.length) {
    return null;
  }

  return items.map((item: ICustomer) => publicField(item) || null);
};
