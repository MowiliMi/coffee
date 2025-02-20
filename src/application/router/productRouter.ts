import { Router } from 'express';
import {
  createProduct,
  getProducts,
  decreaseProductStock,
  increaseProductStock,
} from '@/application/controller/productController';

const router = Router();

router.post('/products', createProduct);
router.get('/products', getProducts);
router.patch('/products/:id/restock', increaseProductStock);
router.patch('/products/:id/sell', decreaseProductStock);

export { router as productRouter };
