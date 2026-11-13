import { UserRefundsController } from '@/controllers/UserRefundsController.js';
import { verifyUserAuthorization } from '@/middlewares/verifyUserAuthorization.js';
import { Router } from 'express';

const myRefundsRoutes = Router();
const userRefundsController = new UserRefundsController();

myRefundsRoutes.get(
  '/:id',
  verifyUserAuthorization(['employee']),
  userRefundsController.show
);

export { myRefundsRoutes };

