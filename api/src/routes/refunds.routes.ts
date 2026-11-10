import { RefundsController } from '@/controllers/RefundsController.js';
import { StatusController } from '@/controllers/StatusController.js';
import { verifyUserAuthorization } from '@/middlewares/verifyUserAuthorization.js';
import { Router } from 'express';

const refundsRoutes = Router();
const refundsController = new RefundsController();
const statusController = new StatusController();

refundsRoutes.post(
  '/',
  verifyUserAuthorization(['employee']),
  refundsController.create
);

refundsRoutes.get(
  '/',
  verifyUserAuthorization(['manager']),
  refundsController.index
);

refundsRoutes.get(
  '/:id',
  verifyUserAuthorization(['employee', 'manager']),
  refundsController.show
);

refundsRoutes.patch(
  '/:id',
  verifyUserAuthorization(['manager']),
  statusController.update
);

export { refundsRoutes };
