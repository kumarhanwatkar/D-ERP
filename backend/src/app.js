import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import healthRouter from './routes/health.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import employeeRouter from './routes/employee.js';
import chatRouter from './routes/chat.js';
import blockchainRouter from './routes/blockchain.js';
import { notFound, errorHandler } from './middleware/error.js';

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true,
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 250 }));
  app.use(express.json({ limit: '1mb' }));
  app.use(mongoSanitize());

  app.get('/', (request, response) => {
    response.json({
      service: 'derp-backend',
      status: 'running',
      version: '2.0.0',
      endpoints: ['/api/health', '/api/auth/login', '/api/bootstrap', '/api/admin/dashboard'],
    });
  });

  app.get('/api/bootstrap', async (request, response, next) => {
    try {
      const { loadDatabase, buildAdminDashboard, buildEmployeeDashboard } = await import('./lib/store.js');
      const database = await loadDatabase();

      response.json({
        adminDashboard: buildAdminDashboard(database),
        employeeDashboards: database.users
          .filter((user) => user.role === 'employee')
          .map((user) => buildEmployeeDashboard(database, user.id)),
        users: database.users,
        payrollEntries: database.payrollEntries,
        resources: database.resources,
        transactions: database.transactions,
        notifications: database.notifications,
        adminSettings: database.adminSettings,
        employeeSettings: database.employeeSettings,
        dashboardConfigs: database.dashboardConfigs,
      });
    } catch (error) {
      next(error);
    }
  });

  app.use('/api/health', healthRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/employee', employeeRouter);
  app.use('/api/chat', chatRouter);
  app.use('/api/blockchain', blockchainRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
