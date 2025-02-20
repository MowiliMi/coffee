import 'dotenv/config';

import express, { json, urlencoded } from 'express';
import methodOverride from 'method-override';

import errorHandler from '@/middleware/errors';
import { HelmetSecurity, CorsSecurity } from '@/infrastructure/security';
import database from '@/infrastructure/database';
import router from '@/application/router';

(async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(HelmetSecurity);
  app.use(CorsSecurity);
  app.options('*', CorsSecurity);
  app.use(json({ limit: '15mb' }));
  app.use(urlencoded({ limit: '15mb', extended: true }));
  app.use(methodOverride());
  app.use(express.static('public'));

  await database();

  app.use('/api/v1', router);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`[server] Running at http://localhost:${PORT}`);
  });
})();
