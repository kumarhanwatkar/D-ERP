import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { verifyMessage } from 'ethers';
import { authRequired } from '../middleware/auth.js';
import {
  acceptEmployeeInvite,
  appendActivityLog,
  appendNotification,
  createAuthNonce,
  createEmployeeInvite,
  createOrganizationForAdmin,
  consumeAuthNonce,
  findUserByWallet,
  loadDatabase,
  updateDatabase,
} from '../lib/store.js';

const authRouter = Router();

const signJwt = (user) =>
  jwt.sign(
    {
      role: user.role,
      walletAddress: user.walletAddress,
      organizationId: user.organizationId,
      employeeId: user.role === 'employee' ? user.id : undefined,
    },
    process.env.JWT_SECRET || 'derp-dev-secret',
    { subject: user.id, expiresIn: '7d' }
  );

const demoLoginEnabled = () => process.env.ALLOW_DEMO_LOGIN !== 'false';

const fallbackDemoLogin = async ({ walletAddress, role, name, email, organizationName, inviteCode }) => {
  const database = await loadDatabase();
  let user = await findUserByWallet(walletAddress, role);

  if (!user && role === 'employee' && inviteCode) {
    const invite = database.invites.find((item) => item.inviteCode === inviteCode);
    if (invite) {
      const created = await acceptEmployeeInvite({ inviteCode, walletAddress });
      user = created.user;
    }
  }

  if (!user && role === 'admin') {
    const created = await createOrganizationForAdmin({
      walletAddress,
      name: organizationName || name,
      email,
    });
    user = created.adminUser;
  }

  if (!user && role === 'employee') {
    const organization = database.organizations[0];
    const suffix = String(Date.now()).slice(-6);
    user = {
      id: `user-emp-${suffix}`,
      organizationId: organization?.id,
      walletAddress,
      role: 'employee',
      name: name || 'Employee User',
      email: email || 'employee@techforge.io',
      passwordHash: '',
      status: 'active',
      department: 'Engineering',
      jobTitle: 'Engineer',
      hourlyRate: 25,
      avatarUrl: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await updateDatabase((current) => {
      current.users.push(user);
      current.payrollEntries.unshift({
        id: `pay-${user.id}`,
        organizationId: user.organizationId,
        userId: user.id,
        name: user.name,
        department: user.department,
        walletAddress,
        hourlyRate: user.hourlyRate,
        hoursThisMonth: 144,
        totalEarned: 3600,
        status: 'active',
        streamRatePerHour: 24,
        lockedPercentage: 85,
        accessiblePercentage: 15,
        chain: 'BSC Testnet',
        contractAddress: `0x${suffix.padStart(40, '0')}`,
        updatedAt: new Date().toISOString(),
      });
      current.wallets.unshift({
        id: `wallet-${user.id}`,
        organizationId: user.organizationId,
        userId: user.id,
        address: walletAddress,
        chain: 'BSC Testnet',
        balance: 2.5847,
        connected: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      current.employeeSettings[user.id] = {
        alerts: true,
        autoLock: true,
        lockedPercentage: 85,
        accessiblePercentage: 15,
        notificationChannels: ['in-app', 'email'],
        walletSync: true,
        updatedAt: new Date().toISOString(),
      };
      return user;
    });
  }

  return user;
};

authRouter.post('/request-nonce', async (request, response, next) => {
  try {
    const { walletAddress } = request.body || {};
    if (!walletAddress) {
      return response.status(400).json({ message: 'walletAddress is required' });
    }

    const result = await createAuthNonce(walletAddress);
    response.json(result);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/register-admin', async (request, response, next) => {
  try {
    const { walletAddress, signature, nonceId, organizationName, name, email, industry } = request.body || {};

    if (!walletAddress || !nonceId) {
      return response.status(400).json({ message: 'walletAddress and nonceId are required' });
    }

    const nonceRecord = await consumeAuthNonce(nonceId);
    const demoMode = demoLoginEnabled();

    if (!demoMode) {
      if (!nonceRecord || String(nonceRecord.walletAddress).toLowerCase() !== String(walletAddress).toLowerCase()) {
        return response.status(400).json({ message: 'Invalid or expired login nonce' });
      }

      if (!signature) {
        return response.status(400).json({ message: 'walletAddress, signature, and nonceId are required' });
      }

      const recovered = verifyMessage(nonceRecord.nonce, signature);
      if (String(recovered).toLowerCase() !== String(walletAddress).toLowerCase()) {
        return response.status(401).json({ message: 'Wallet signature verification failed' });
      }
    }

    let user = await findUserByWallet(walletAddress, 'admin');
    if (!user && demoMode) {
      const created = await fallbackDemoLogin({
        walletAddress,
        role: 'admin',
        name,
        email,
        organizationName,
      });
      user = created;
    }
    if (!user) {
      const created = await createOrganizationForAdmin({
        walletAddress,
        name: organizationName || name,
        email,
        industry,
      });
      user = created.adminUser;
      await updateDatabase((database) => {
        database.adminSettings.orgName = organizationName || name || database.adminSettings.orgName;
        return database.adminSettings;
      });
    }

    const token = signJwt(user);
    await appendNotification({
      organizationId: user.organizationId,
      userId: user.id,
      title: 'Admin wallet verified',
      message: `${user.name} authenticated with MetaMask.`,
      type: 'system',
      read: false,
    });
    await appendActivityLog({
      organizationId: user.organizationId,
      actorId: user.id,
      action: 'auth.admin.register',
      entityType: 'user',
      entityId: user.id,
      details: { walletAddress },
    });

    response.json({ user, token, role: 'admin' });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/verify-signature', async (request, response, next) => {
  try {
    const { walletAddress, signature, nonceId, role, inviteCode, name, email, organizationId } = request.body || {};

    if (!walletAddress || !nonceId || !role || (!signature && !demoLoginEnabled())) {
      return response.status(400).json({ message: 'walletAddress, nonceId, role, and signature are required' });
    }

    const nonceRecord = await consumeAuthNonce(nonceId);
    if (!nonceRecord || String(nonceRecord.walletAddress).toLowerCase() !== String(walletAddress).toLowerCase()) {
      if (!demoLoginEnabled()) {
        return response.status(400).json({ message: 'Invalid or expired login nonce' });
      }
    }

    if (signature && nonceRecord) {
      const recovered = verifyMessage(nonceRecord.nonce, signature);
      if (String(recovered).toLowerCase() !== String(walletAddress).toLowerCase()) {
        if (!demoLoginEnabled()) {
          return response.status(401).json({ message: 'Wallet signature verification failed' });
        }
      }
    }

    let user = demoLoginEnabled()
      ? await fallbackDemoLogin({ walletAddress, role, inviteCode, name, email, organizationName: request.body?.organizationName })
      : await findUserByWallet(walletAddress, role);

    if (!user && role === 'admin') {
      const created = await createOrganizationForAdmin({
        walletAddress,
        name,
        email,
      });
      user = created.adminUser;
    }

    if (!user && role === 'employee') {
      return response.status(404).json({ message: 'Employee invite not found. Ask your admin for a join link.' });
    }

    const token = signJwt(user);
    await appendNotification({
      organizationId: user.organizationId,
      userId: user.id,
      title: 'Wallet verified',
      message: `${user.name} signed in with MetaMask.`,
      type: 'system',
      read: false,
    });
    await appendActivityLog({
      organizationId: user.organizationId,
      actorId: user.id,
      action: 'auth.wallet.verify',
      entityType: 'user',
      entityId: user.id,
      details: { walletAddress, role, inviteCode: inviteCode || null },
    });

    response.json({ user, token, role: user.role, organizationId: user.organizationId });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/employee/invite', authRequired, async (request, response, next) => {
  try {
    if (request.user.role !== 'admin') {
      return response.status(403).json({ message: 'Only admins can create employee invites' });
    }

    const { name, email, department, hourlyRate } = request.body || {};
    const invite = await createEmployeeInvite({
      organizationId: request.user.organizationId,
      name,
      email,
      department,
      hourlyRate,
    });

    response.status(201).json({ invite });
  } catch (error) {
    next(error);
  }
});

authRouter.get('/demo-users', async (request, response, next) => {
  try {
    const database = await loadDatabase();
    response.json({ users: database.users });
  } catch (error) {
    next(error);
  }
});

authRouter.get('/me', authRequired, async (request, response) => {
  response.json({ user: request.user });
});

export default authRouter;
