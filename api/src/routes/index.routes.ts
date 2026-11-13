import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated.js';
import { Router } from 'express';
import { myRefundsRoutes } from './my-refunds.routes.js';
import { refundsRoutes } from './refunds.routes.js';
import { sessionsRoutes } from './sessions.routes.js';
import { uploadsRoutes } from './uploads.routes.js';
import { usersRoutes } from './users.routes.js';

const routes = Router();

// public routes
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

// private routes
routes.use(ensureAuthenticated);
routes.use('/refunds', refundsRoutes);
routes.use('/uploads', uploadsRoutes);
routes.use('/my-refunds', myRefundsRoutes);

export { routes };
