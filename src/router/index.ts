import { Router, type Request, type Response, type NextFunction } from 'express';

const router: Router = Router();

router.use('*', (req: Request, res: Response, next: NextFunction) => res.status(301).redirect('/'));

export default router;