import { Router } from 'express';
import { authRequired, requireRole } from '../middleware/auth.js';
import { emitRealtimeEvent } from '../lib/socket.js';
import {
  appendActivityLog,
  buildAdminDashboard,
  generateAiDashboardConfig,
  loadDatabase,
  updateDatabase,
} from '../lib/store.js';

const adminRouter = Router();

adminRouter.use(authRequired, requireRole('admin'));

adminRouter.get('/dashboard', async (request, response, next) => {
  try {
    const database = await loadDatabase();
    response.json(buildAdminDashboard(database));
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/payroll', async (request, response, next) => {
  try {
    const database = await loadDatabase();
    response.json({
      entries: database.payrollEntries,
      totalPayroll: database.payrollEntries.reduce((sum, entry) => sum + Number(entry.totalEarned || 0), 0),
      activeStreams: database.payrollEntries.filter((entry) => entry.status === 'active').length,
    });
  } catch (error) {
    next(error);
  }
});

adminRouter.patch('/payroll/:id/status', async (request, response, next) => {
  try {
    const { status } = request.body || {};
    const updatedEntry = await updateDatabase((database) => {
      const entry = database.payrollEntries.find((item) => item.id === request.params.id);
      if (!entry) {
        throw Object.assign(new Error('Payroll entry not found'), { statusCode: 404 });
      }

      if (status) {
        entry.status = status;
      }

      entry.updatedAt = new Date().toISOString();

      return entry;
    });

    await appendActivityLog({
      organizationId: request.user.organizationId,
      actorId: request.user.id,
      action: 'payroll.status.update',
      entityType: 'payroll',
      entityId: updatedEntry.id,
      details: { status },
    });

    emitRealtimeEvent('payroll:update', { entry: updatedEntry });
    emitRealtimeEvent('dashboard:update', { scope: 'admin' });

    response.json({ entry: updatedEntry });
  } catch (error) {
    next(error);
  }
});

adminRouter.patch('/payroll/:id', async (request, response, next) => {
  try {
    const updatedEntry = await updateDatabase((database) => {
      const entry = database.payrollEntries.find((item) => item.id === request.params.id);
      if (!entry) {
        throw Object.assign(new Error('Payroll entry not found'), { statusCode: 404 });
      }

      Object.assign(entry, request.body || {});
      entry.updatedAt = new Date().toISOString();
      return entry;
    });

    await appendActivityLog({
      organizationId: request.user.organizationId,
      actorId: request.user.id,
      action: 'payroll.update',
      entityType: 'payroll',
      entityId: updatedEntry.id,
      details: request.body || {},
    });

    emitRealtimeEvent('payroll:update', { entry: updatedEntry });
    emitRealtimeEvent('dashboard:update', { scope: 'admin' });

    response.json({ entry: updatedEntry });
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/resources', async (request, response, next) => {
  try {
    const database = await loadDatabase();
    response.json({ resources: database.resources });
  } catch (error) {
    next(error);
  }
});

adminRouter.patch('/resources/:id', async (request, response, next) => {
  try {
    const updatedResource = await updateDatabase((database) => {
      const resource = database.resources.find((item) => item.id === request.params.id);
      if (!resource) {
        throw Object.assign(new Error('Resource not found'), { statusCode: 404 });
      }

      Object.assign(resource, request.body || {});
      resource.updatedAt = new Date().toISOString();
      return resource;
    });

    emitRealtimeEvent('resource:update', { resource: updatedResource });
    emitRealtimeEvent('dashboard:update', { scope: 'admin' });

    response.json({ resource: updatedResource });
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/transactions', async (request, response, next) => {
  try {
    const database = await loadDatabase();
    response.json({ transactions: database.transactions });
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/settings', async (request, response, next) => {
  try {
    const database = await loadDatabase();
    response.json(database.adminSettings);
  } catch (error) {
    next(error);
  }
});

adminRouter.patch('/settings', async (request, response, next) => {
  try {
    const updatedSettings = await updateDatabase((database) => {
      database.adminSettings = {
        ...database.adminSettings,
        ...(request.body || {}),
        updatedAt: new Date().toISOString(),
      };

      return database.adminSettings;
    });

    emitRealtimeEvent('dashboard:update', { scope: 'admin' });

    response.json(updatedSettings);
  } catch (error) {
    next(error);
  }
});

adminRouter.post('/ai-config/generate', async (request, response, next) => {
  try {
    const config = generateAiDashboardConfig(request.body?.prompt);
    response.json(config);
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/ai-configs', async (request, response, next) => {
  try {
    const database = await loadDatabase();
    response.json({ configs: database.aiConfigs });
  } catch (error) {
    next(error);
  }
});

adminRouter.post('/ai-configs', async (request, response, next) => {
  try {
    const savedConfig = await updateDatabase((database) => {
      const config = {
        id: `cfg-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...(request.body || {}),
      };

      database.aiConfigs.push(config);
      return config;
    });

    emitRealtimeEvent('dashboard:update', { scope: 'admin' });

    response.status(201).json({ config: savedConfig });
  } catch (error) {
    next(error);
  }
});

export default adminRouter;
