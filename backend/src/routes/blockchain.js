import { Router } from 'express';
import { authRequired, requireRole } from '../middleware/auth.js';
import { emitRealtimeEvent } from '../lib/socket.js';
import { appendActivityLog, loadDatabase, updateDatabase } from '../lib/store.js';

const blockchainRouter = Router();

blockchainRouter.use(authRequired);

blockchainRouter.get('/transactions', async (request, response, next) => {
  try {
    const database = await loadDatabase();
    response.json({ transactions: database.transactions });
  } catch (error) {
    next(error);
  }
});

blockchainRouter.get('/wallets', async (request, response, next) => {
  try {
    const database = await loadDatabase();
    response.json({ wallets: database.wallets });
  } catch (error) {
    next(error);
  }
});

blockchainRouter.post('/stream/start', requireRole('admin'), async (request, response, next) => {
  try {
    const { userId, hourlyRate = 25, lockedPercentage = 85 } = request.body || {};
    const updated = await updateDatabase((database) => {
      const payroll = database.payrollEntries.find((entry) => entry.userId === userId);
      if (!payroll) {
        throw Object.assign(new Error('Payroll entry not found'), { statusCode: 404 });
      }

      payroll.status = 'active';
      payroll.hourlyRate = Number(hourlyRate);
      payroll.lockedPercentage = Number(lockedPercentage);
      payroll.updatedAt = new Date().toISOString();
      return payroll;
    });

    await appendActivityLog({
      organizationId: request.user.organizationId,
      actorId: request.user.id,
      action: 'blockchain.stream.start',
      entityType: 'payroll',
      entityId: updated.id,
      details: request.body || {},
    });

    emitRealtimeEvent('payroll:update', { entry: updated });
    response.json({ payroll: updated });
  } catch (error) {
    next(error);
  }
});

blockchainRouter.post('/stream/pause/:userId', requireRole('admin'), async (request, response, next) => {
  try {
    const updated = await updateDatabase((database) => {
      const payroll = database.payrollEntries.find((entry) => entry.userId === request.params.userId);
      if (!payroll) {
        throw Object.assign(new Error('Payroll entry not found'), { statusCode: 404 });
      }

      payroll.status = 'paused';
      payroll.updatedAt = new Date().toISOString();
      return payroll;
    });

    emitRealtimeEvent('payroll:update', { entry: updated });
    response.json({ payroll: updated });
  } catch (error) {
    next(error);
  }
});

blockchainRouter.post('/stream/resume/:userId', requireRole('admin'), async (request, response, next) => {
  try {
    const updated = await updateDatabase((database) => {
      const payroll = database.payrollEntries.find((entry) => entry.userId === request.params.userId);
      if (!payroll) {
        throw Object.assign(new Error('Payroll entry not found'), { statusCode: 404 });
      }

      payroll.status = 'active';
      payroll.updatedAt = new Date().toISOString();
      return payroll;
    });

    emitRealtimeEvent('payroll:update', { entry: updated });
    response.json({ payroll: updated });
  } catch (error) {
    next(error);
  }
});

blockchainRouter.post('/withdraw/:userId', async (request, response, next) => {
  try {
    if (request.user.role !== 'admin' && request.user.id !== request.params.userId) {
      return response.status(403).json({ message: 'You can only withdraw your own payroll stream' });
    }

    const payload = await updateDatabase((database) => {
      const transaction = {
        id: `tx-${Date.now()}`,
        organizationId: request.user.organizationId,
        userId: request.params.userId,
        type: 'payroll',
        amount: Number(request.body?.amount || 0),
        status: 'confirmed',
        chain: 'BSC Testnet',
        hash: `0x${Date.now().toString(16).padStart(64, '0')}`,
        from: database.organizations[0]?.walletAddress,
        to: request.user.walletAddress,
        gasUsed: 0.0015,
        txHash: `0x${(Date.now() + 1000).toString(16).padStart(64, '0')}`,
        description: 'Simulated payroll withdrawal',
        timestamp: new Date().toISOString(),
      };

      database.transactions.unshift(transaction);
      return transaction;
    });

    await appendActivityLog({
      organizationId: request.user.organizationId,
      actorId: request.user.id,
      action: 'blockchain.withdraw',
      entityType: 'transaction',
      entityId: payload.id,
      details: request.body || {},
    });

    emitRealtimeEvent('dashboard:update', { scope: 'employee', userId: request.params.userId });
    response.status(201).json({ transaction: payload });
  } catch (error) {
    next(error);
  }
});

export default blockchainRouter;
