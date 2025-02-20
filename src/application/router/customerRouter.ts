import { Router } from 'express';
import { createCustomer, getCustomerByEmail, getCustomers } from '@/application/controller/customerController';

const router = Router();

router.post('/customer', createCustomer);
router.get('/customer/:email', getCustomerByEmail);
router.get('/customers', getCustomers);

export { router as customerRouter };
