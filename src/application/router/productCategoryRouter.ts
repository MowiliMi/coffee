import { Router } from 'express';
import {
  createProductCategory,
  getProductCategories,
  getProductCategoryByPermalink,
} from '@/application/controller/productCategoryController';

const router = Router();

router.post('/category', createProductCategory);
router.get('/categories', getProductCategories);
router.get('/category/:permalink', getProductCategoryByPermalink);

export { router as productCategoryRouter };
