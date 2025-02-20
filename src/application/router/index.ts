import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';

import { orderRouter } from '@/application/router/orderRouter';
import { productRouter } from '@/application/router/productRouter';
import { productCategoryRouter } from '@/application/router/productCategoryRouter';
import { customerRouter } from '@/application/router/customerRouter';

const router: Router = Router();

router.use('/orders', orderRouter);
router.use('/products', productRouter);
router.use('/product-categories', productCategoryRouter);
router.use('/customers', customerRouter);

router.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Resource not found',
  });
});

export default router;
