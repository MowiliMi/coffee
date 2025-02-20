import { Router } from 'express';
import { createOrder } from '@/application/controller/orderController';

const router = Router();

router.post('/orders', createOrder);

export { router as orderRouter };
