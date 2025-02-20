import { IProduct } from '@/application/model/productModel';
import { deepPick } from '@/utils/deepPick';

const fields = ['name', 'description', 'price', 'stock', 'category', 'permalink'];

export const publicField = (item: IProduct) => deepPick(item, fields);

export const publicFields = (items?: IProduct[] | null) => {
  if (!items?.length) {
    return null;
  }

  return items.map((item: IProduct) => publicField(item) || null);
};
