import { IProductCategory } from '@/application/model/productCategoryModel';
import { deepPick } from '@/utils/deepPick';

const fields = ['name', 'description', 'permalink'];

export const publicField = (item: IProductCategory) => deepPick(item, fields);

export const publicFields = (items?: IProductCategory[] | null) => {
  if (!items?.length) {
    return null;
  }

  return items.map((item: IProductCategory) => publicField(item) || null);
};
