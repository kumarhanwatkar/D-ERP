import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { emitRealtimeEvent } from '../lib/socket.js';
import { appendActivityLog, buildEmployeeDashboard, loadDatabase, updateDatabase } from '../lib/store.js';

const employeeRouter = Router();

employeeRouter.use(authRequired);

const canAccessEmployee = (request, userId) => request.user.role === 'admin' || request.user.id === userId;

employeeRouter.get('/dashboard/:userId', async (request, response, next) => {
  try {
    if (!canAccessEmployee(request, request.params.userId)) {
      return response.status(403).json({ message: 'You can only access your own employee data' });
    }

    const database = await loadDatabase();
    response.json(buildEmployeeDashboard(database, request.params.userId));
  } catch (error) {
    next(error);
  }
});

employeeRouter.get('/earnings/:userId', async (request, response, next) => {
  try {
    if (!canAccessEmployee(request, request.params.userId)) {
      return response.status(403).json({ message: 'You can only access your own employee data' });
    }

    const database = await loadDatabase();
    const dashboard = buildEmployeeDashboard(database, request.params.userId);

    response.json({
      summary: dashboard.summary,
      charts: dashboard.charts,
    });
  } catch (error) {
    next(error);
  }
});

employeeRouter.get('/transactions/:userId', async (request, response, next) => {
  try {
    if (!canAccessEmployee(request, request.params.userId)) {
      return response.status(403).json({ message: 'You can only access your own employee data' });
    }

    const database = await loadDatabase();
    const dashboard = buildEmployeeDashboard(database, request.params.userId);

    response.json({
      transactions: dashboard.transactions,
    });
  } catch (error) {
    next(error);
  }
});

employeeRouter.get('/settings/:userId', async (request, response, next) => {
  try {
    if (!canAccessEmployee(request, request.params.userId)) {
      return response.status(403).json({ message: 'You can only access your own employee data' });
    }

    const database = await loadDatabase();
    response.json({
      settings: database.employeeSettings[request.params.userId] || {
        alerts: true,
        autoLock: true,
        lockedPercentage: 85,
        accessiblePercentage: 15,
      },
    });
  } catch (error) {
    next(error);
  }
});

employeeRouter.patch('/settings/:userId', async (request, response, next) => {
  try {
    if (!canAccessEmployee(request, request.params.userId)) {
      return response.status(403).json({ message: 'You can only update your own employee settings' });
    }

    const settings = await updateDatabase((database) => {
      const current = database.employeeSettings[request.params.userId] || {
        alerts: true,
        autoLock: true,
        lockedPercentage: 85,
        accessiblePercentage: 15,
      };

      database.employeeSettings[request.params.userId] = {
        ...current,
        ...(request.body || {}),
        updatedAt: new Date().toISOString(),
      };

      return database.employeeSettings[request.params.userId];
    });

    await appendActivityLog({
      organizationId: request.user.organizationId,
      actorId: request.user.id,
      action: 'employee.settings.update',
      entityType: 'employee-settings',
      entityId: request.params.userId,
      details: request.body || {},
    });

    emitRealtimeEvent('settings:update', { userId: request.params.userId, settings });
    emitRealtimeEvent('dashboard:update', { scope: 'employee', userId: request.params.userId });

    response.json({ settings });
  } catch (error) {
    next(error);
  }
});

export default employeeRouter;
