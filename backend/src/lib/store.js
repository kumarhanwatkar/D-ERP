import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectMongo, isMongoEnabled, loadMongoState, saveMongoState } from './mongoStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.resolve(__dirname, '..', '..', 'data', 'derp.json');

const departments = ['Engineering', 'Operations', 'Sales', 'Support', 'HR', 'Finance'];
const firstNames = [
  'Aarav', 'Aisha', 'Arjun', 'Diya', 'Kumar', 'Priya', 'Rahul', 'Meera',
  'Nikhil', 'Ananya', 'Rohan', 'Sana', 'Vikram', 'Isha', 'Kabir', 'Neha',
  'Aditya', 'Pooja', 'Sahil', 'Ritika', 'Manish', 'Tanvi', 'Yash', 'Kriti',
];
const lastNames = [
  'Sharma', 'Patel', 'Singh', 'Verma', 'Gupta', 'Iyer', 'Rao', 'Nair',
  'Khan', 'Chopra', 'Bhat', 'Joshi', 'Mehta', 'Deshmukh', 'Bhujade', 'Hanwatkar',
];
const roles = ['employee', 'employee', 'employee', 'employee', 'hr', 'employee'];

const clone = (value) => structuredClone(value);

const round = (value, digits = 2) => Number(Number(value).toFixed(digits));

const now = () => new Date().toISOString();

const createWallet = (index) => {
  const seed = (index + 1).toString(16).padStart(40, '0');
  return `0x${seed}`;
};

const makeName = (index) => `${firstNames[index % firstNames.length]} ${lastNames[index % lastNames.length]}`;

const makeEmail = (name) => name.toLowerCase().replace(/\s+/g, '.') + '@techforge.io';

const createSeedData = () => {
  const organization = {
    id: 'org-techforge',
    name: 'TechForge Industries',
    legalName: 'TechForge Industries Limited',
    industry: 'Decentralized enterprise automation',
    departments,
    location: 'Bengaluru, India',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f8dE71',
    createdAt: now(),
    updatedAt: now(),
  };

  const adminUser = {
    id: 'user-admin-001',
    organizationId: organization.id,
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f8dE71',
    role: 'admin',
    name: 'Ayush Bhujade',
    email: 'admin@derp.io',
    passwordHash: '',
    status: 'active',
    department: 'Operations',
    jobTitle: 'Head of Operations',
    hourlyRate: 0,
    avatarUrl: '',
    createdAt: now(),
    updatedAt: now(),
  };

  const employeeUsers = Array.from({ length: 100 }, (_, index) => {
    const name = makeName(index);
    const department = departments[index % departments.length];
    const role = roles[index % roles.length];
    const hourlyRate = [20, 22, 24, 25, 27, 30][index % 6] + (index % 3);
    return {
      id: `user-emp-${String(index + 1).padStart(3, '0')}`,
      organizationId: organization.id,
      walletAddress: createWallet(index + 1),
      role,
      name,
      email: makeEmail(name),
      passwordHash: '',
      status: index % 11 === 0 ? 'paused' : 'active',
      department,
      jobTitle: `${department} Specialist`,
      hourlyRate,
      avatarUrl: '',
      createdAt: now(),
      updatedAt: now(),
    };
  });

  const users = [adminUser, ...employeeUsers];

  const payrollEntries = employeeUsers.map((user, index) => {
    const hoursThisMonth = 128 + (index % 40);
    const totalEarned = round(hoursThisMonth * Number(user.hourlyRate));
    const status = index % 11 === 0 ? 'paused' : index % 17 === 0 ? 'completed' : 'active';
    return {
      id: `pay-${user.id}`,
      organizationId: organization.id,
      userId: user.id,
      name: user.name,
      department: user.department,
      walletAddress: user.walletAddress,
      hourlyRate: user.hourlyRate,
      hoursThisMonth,
      totalEarned,
      status,
      streamRatePerHour: round(user.hourlyRate * 0.96),
      lockedPercentage: 85,
      accessiblePercentage: 15,
      chain: 'BSC Testnet',
      contractAddress: `0x${(1000 + index).toString(16).padStart(40, '0')}`,
      updatedAt: now(),
    };
  });

  const resources = [
    {
      id: 'res-001',
      organizationId: organization.id,
      name: 'Production Server A1',
      type: 'server',
      status: 'operational',
      utilization: 82,
      department: 'IT',
      efficiency: 97,
      lastMaintenance: '2026-05-01',
      updatedAt: now(),
    },
    {
      id: 'res-002',
      organizationId: organization.id,
      name: 'Payroll Stream Node',
      type: 'server',
      status: 'operational',
      utilization: 76,
      department: 'Finance',
      efficiency: 95,
      lastMaintenance: '2026-04-22',
      updatedAt: now(),
    },
    {
      id: 'res-003',
      organizationId: organization.id,
      name: 'Analytics Cluster',
      type: 'equipment',
      status: 'maintenance',
      utilization: 0,
      department: 'Engineering',
      efficiency: 88,
      lastMaintenance: '2026-05-12',
      updatedAt: now(),
    },
    {
      id: 'res-004',
      organizationId: organization.id,
      name: 'BSC Relay Gateway',
      type: 'server',
      status: 'operational',
      utilization: 67,
      department: 'Operations',
      efficiency: 99,
      lastMaintenance: '2026-05-10',
      updatedAt: now(),
    },
  ];

  const transactions = payrollEntries.slice(0, 24).map((entry, index) => ({
    id: `tx-${index + 1}`,
    organizationId: organization.id,
    userId: entry.userId,
    type: index % 5 === 0 ? 'yield' : 'payroll',
    amount: index % 5 === 0 ? round(45 + index * 3.2) : round(entry.hourlyRate * 6.5),
    status: index % 8 === 0 ? 'pending' : 'confirmed',
    chain: 'BSC Testnet',
    hash: `0x${(100000 + index).toString(16).padStart(60, '0')}`,
    from: index % 5 === 0 ? '0xYieldVault000000000000000000000000000000' : organization.walletAddress,
    to: entry.walletAddress,
    gasUsed: round(0.0015 + (index % 4) * 0.0003, 4),
    txHash: `0x${(200000 + index).toString(16).padStart(60, '0')}`,
    description: index % 5 === 0 ? 'Automated yield capture' : 'Payroll stream transfer',
    timestamp: new Date(Date.now() - index * 3600_000).toISOString(),
    createdAt: now(),
  }));

  const notifications = employeeUsers.slice(0, 12).map((user, index) => ({
    id: `notif-${index + 1}`,
    organizationId: organization.id,
    userId: user.id,
    title: index % 2 === 0 ? 'Payroll stream updated' : 'Wallet sync completed',
    message: index % 2 === 0
      ? `${user.name}'s payroll stream adjusted to ${user.hourlyRate}/hr.`
      : `${user.name}'s MetaMask wallet sync completed successfully.`,
    type: index % 2 === 0 ? 'payroll' : 'wallet',
    read: index % 3 === 0,
    createdAt: now(),
  }));

  const activityLogs = transactions.slice(0, 30).map((transaction) => ({
    id: `log-${transaction.id}`,
    organizationId: organization.id,
    actorId: transaction.userId,
    action: transaction.type === 'payroll' ? 'payroll.transfer' : 'yield.capture',
    entityType: 'transaction',
    entityId: transaction.id,
    details: {
      amount: transaction.amount,
      status: transaction.status,
    },
    createdAt: transaction.timestamp,
  }));

  const dashboardConfigs = [
    {
      id: 'dash-org-001',
      organizationId: organization.id,
      name: 'Executive Overview',
      prompt: 'Real-time payroll, yield generation, resource utilization, and blockchain transparency',
      widgets: [
        { id: 'w1', type: 'stat', title: 'Active Employees', config: { metric: 'users.active' } },
        { id: 'w2', type: 'chart', title: 'Payroll Trend', config: { chart: 'line' } },
        { id: 'w3', type: 'table', title: 'Recent Transactions', config: { limit: 5 } },
      ],
      createdAt: now(),
      updatedAt: now(),
    },
  ];

  const wallets = users.map((user) => ({
    id: `wallet-${user.id}`,
    organizationId: organization.id,
    userId: user.id,
    address: user.walletAddress,
    chain: 'BSC Testnet',
    balance: user.role === 'admin' ? 12.5847 : round(1.5 + (Number(user.id.replace(/\D/g, '')) % 10) * 0.21, 4),
    connected: true,
    createdAt: now(),
    updatedAt: now(),
  }));

  return {
    organizations: [organization],
    users,
    payrollEntries,
    resources,
    transactions,
    notifications,
    activityLogs,
    dashboardConfigs,
    wallets,
    aiConfigs: dashboardConfigs,
      authNonces: {},
      invites: [],
    adminSettings: {
      orgName: organization.name,
      payrollApproval: true,
      emailAlerts: true,
      riskLevel: 'medium',
      blockchainNetwork: 'BSC Testnet',
      streamingEnabled: true,
      autoYieldSweep: true,
      updatedAt: now(),
    },
    employeeSettings: Object.fromEntries(
      employeeUsers.map((user, index) => [
        user.id,
        {
          alerts: true,
          autoLock: true,
          lockedPercentage: 85,
          accessiblePercentage: 15,
          notificationChannels: ['in-app', 'email'],
          walletSync: index % 2 === 0,
          updatedAt: now(),
        },
      ])
    ),
    resourceAllocations: resources.map((resource) => ({
      id: `alloc-${resource.id}`,
      resourceId: resource.id,
      organizationId: organization.id,
      utilizationTarget: resource.utilization,
      owner: resource.department,
      updatedAt: now(),
    })),
    blockchainState: {
      chainId: 97,
      rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      contractAddress: '0x000000000000000000000000000000000000dEPr',
    },
  };
};

const defaultDatabase = createSeedData();
let cachedDatabase = null;

const normalizeDatabase = (database) => mergeDefaults(database);

const mergeDefaults = (database) => ({
  ...clone(defaultDatabase),
  ...database,
  organizations: Array.isArray(database?.organizations) ? database.organizations : clone(defaultDatabase.organizations),
  users: Array.isArray(database?.users) ? database.users : clone(defaultDatabase.users),
  payrollEntries: Array.isArray(database?.payrollEntries) ? database.payrollEntries : clone(defaultDatabase.payrollEntries),
  resources: Array.isArray(database?.resources) ? database.resources : clone(defaultDatabase.resources),
  transactions: Array.isArray(database?.transactions) ? database.transactions : clone(defaultDatabase.transactions),
  notifications: Array.isArray(database?.notifications) ? database.notifications : clone(defaultDatabase.notifications),
  activityLogs: Array.isArray(database?.activityLogs) ? database.activityLogs : clone(defaultDatabase.activityLogs),
  dashboardConfigs: Array.isArray(database?.dashboardConfigs) ? database.dashboardConfigs : clone(defaultDatabase.dashboardConfigs),
  wallets: Array.isArray(database?.wallets) ? database.wallets : clone(defaultDatabase.wallets),
  aiConfigs: Array.isArray(database?.aiConfigs) ? database.aiConfigs : clone(defaultDatabase.aiConfigs),
  authNonces: database?.authNonces || clone(defaultDatabase.authNonces),
  invites: Array.isArray(database?.invites) ? database.invites : clone(defaultDatabase.invites),
  resourceAllocations: Array.isArray(database?.resourceAllocations) ? database.resourceAllocations : clone(defaultDatabase.resourceAllocations),
  adminSettings: {
    ...clone(defaultDatabase.adminSettings),
    ...(database?.adminSettings || {}),
  },
  employeeSettings: database?.employeeSettings || clone(defaultDatabase.employeeSettings),
  blockchainState: {
    ...clone(defaultDatabase.blockchainState),
    ...(database?.blockchainState || {}),
  },
});

const ensureDirectory = async (filePath) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
};

export const loadDatabase = async () => {
  if (cachedDatabase) {
    return cachedDatabase;
  }

  if (isMongoEnabled()) {
    cachedDatabase = normalizeDatabase(await loadMongoState(defaultDatabase));
    return cachedDatabase;
  }

  try {
    const raw = await fs.readFile(dataFilePath, 'utf8');
    cachedDatabase = mergeDefaults(JSON.parse(raw));
    return cachedDatabase;
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }

    cachedDatabase = clone(defaultDatabase);
    await saveDatabase(cachedDatabase);
    return cachedDatabase;
  }
};

export const saveDatabase = async (database) => {
  cachedDatabase = mergeDefaults(database);

  if (isMongoEnabled()) {
    await connectMongo();
    await saveMongoState(cachedDatabase);
    return cachedDatabase;
  }

  await ensureDirectory(dataFilePath);
  await fs.writeFile(dataFilePath, JSON.stringify(cachedDatabase, null, 2));
  return cachedDatabase;
};

export const updateDatabase = async (mutator) => {
  const database = clone(await loadDatabase());
  const result = await mutator(database);
  await saveDatabase(database);
  return result ?? database;
};

export const findUserByWallet = async (walletAddress, role) => {
  const database = await loadDatabase();
  return database.users.find(
    (user) =>
      String(user.walletAddress).toLowerCase() === String(walletAddress).toLowerCase() &&
      (!role || user.role === role)
  ) || null;
};

export const findUserById = async (userId) => {
  const database = await loadDatabase();
  return database.users.find((user) => user.id === userId) || null;
};

const resolveRiskLevel = (riskLevel) => {
  if (riskLevel === 'low') return 'low';
  if (riskLevel === 'high') return 'high';
  return 'medium';
};

export const buildAdminDashboard = (database) => {
  const activeUsers = database.users.filter((user) => user.role !== 'admin' && user.status !== 'paused').length;
  const totalPayroll = database.payrollEntries.reduce((sum, entry) => sum + Number(entry.totalEarned || 0), 0);
  const activeStreams = database.payrollEntries.filter((entry) => entry.status === 'active').length;
  const activeResources = database.resources.filter((resource) => resource.status === 'operational').length;
  const averageUtilization = activeResources
    ? Math.round(
        database.resources
          .filter((resource) => resource.status === 'operational')
          .reduce((sum, resource) => sum + Number(resource.utilization || 0), 0) / activeResources
      )
    : 0;

  const payrollSeries = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => ({
    name: month,
    amount: 45000 + index * 3500 + (database.payrollEntries.length % 7) * 250,
    employees: 45 + index + (database.users.length % 5),
  }));

  const yieldSeries = [
    { name: 'Week 1', yield: 2.1 },
    { name: 'Week 2', yield: 3.4 },
    { name: 'Week 3', yield: 2.8 },
    { name: 'Week 4', yield: 4.2 },
  ];

  const departmentMap = new Map();
  database.payrollEntries.forEach((entry) => {
    departmentMap.set(entry.department, (departmentMap.get(entry.department) || 0) + 1);
  });

  const departmentData = Array.from(departmentMap.entries()).map(([name, value], index) => ({
    name,
    value,
    color: ['hsl(187, 100%, 42%)', 'hsl(263, 70%, 50%)', 'hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)'][index % 4],
  }));

  const recentTransactions = [...database.transactions]
    .sort((left, right) => String(right.timestamp).localeCompare(String(left.timestamp)))
    .slice(0, 8)
    .map((transaction) => ({
      id: transaction.id,
      type: transaction.type,
      employee: transaction.to,
      description: transaction.description || (transaction.type === 'yield' ? 'Trading Profit' : 'Payroll Transfer'),
      amount: transaction.amount,
      time: transaction.timestamp,
      status: transaction.status,
      hash: transaction.hash,
      txHash: transaction.txHash,
    }));

  return {
    summary: {
      totalEmployees: activeUsers,
      payrollStreaming: round(totalPayroll / Math.max(database.payrollEntries.length, 1), 2),
      yieldGenerated: round(totalPayroll * 0.163, 2),
      activeResources,
      averageUtilization,
      activeStreams,
    },
    charts: {
      payrollSeries,
      yieldSeries,
      departmentData,
    },
    recentTransactions,
    metrics: {
      avgHourlyRate: round(
        database.payrollEntries.reduce((sum, entry) => sum + Number(entry.hourlyRate || 0), 0) /
          Math.max(database.payrollEntries.length, 1),
        2
      ),
      totalPayroll: round(totalPayroll, 2),
    },
    riskLevel: resolveRiskLevel(database.adminSettings.riskLevel),
  };
};

export const buildEmployeeDashboard = (database, userId) => {
  const profile = database.users.find((user) => user.id === userId) || database.users.find((user) => user.role === 'employee');
  const payrollEntry = database.payrollEntries.find((entry) => entry.userId === profile?.id) || database.payrollEntries[0];
  const payrollSettings = database.employeeSettings[profile?.id] || defaultDatabase.employeeSettings[payrollEntry?.userId] || {
    alerts: true,
    autoLock: true,
    lockedPercentage: 85,
    accessiblePercentage: 15,
  };
  const hourlyRate = payrollEntry?.hourlyRate || profile?.hourlyRate || 25;
  const hoursWorkedToday = 6.5;
  const todayEarnings = round(hourlyRate * hoursWorkedToday, 2);
  const lockedFunds = round((payrollEntry?.totalEarned || 1250) * (Number(payrollSettings.lockedPercentage || 85) / 100), 2);
  const yieldGenerated = round((payrollEntry?.totalEarned || 1250) * 0.125, 2);
  const lockPeriodRemaining = 8;

  const weeklyEarnings = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => ({
    day,
    earnings: index < 5 ? round(hourlyRate * (5.8 + index * 0.18), 2) : round(hourlyRate * 1.2, 2),
    value: index < 5 ? round(hourlyRate * (5.8 + index * 0.18), 2) : round(hourlyRate * 1.2, 2),
  }));

  const transactions = database.transactions
    .filter((transaction) => transaction.userId === profile?.id)
    .slice(0, 20)
    .map((transaction) => ({
      id: transaction.id,
      type: transaction.type === 'payroll' ? 'salary' : transaction.type,
      amount: transaction.amount,
      time: transaction.timestamp,
      txHash: transaction.txHash || transaction.hash,
      status: transaction.status,
      chain: transaction.chain,
    }));

  return {
    profile,
    summary: {
      todayEarnings,
      hoursWorkedToday,
      hourlyRate,
      lockedFunds,
      yieldGenerated,
      lockPeriodRemaining,
      walletBalance: database.wallets.find((wallet) => wallet.userId === profile?.id)?.balance || 2.5847,
      monthTotal: round(payrollEntry?.totalEarned || hourlyRate * 113.9, 2),
    },
    charts: {
      weeklyEarnings,
    },
    transactions,
    allocation: payrollSettings,
  };
};

export const generateAiDashboardConfig = (prompt) => {
  const normalizedPrompt = String(prompt || '').toLowerCase();
  const hasPayroll = normalizedPrompt.includes('payroll');
  const hasManufacturing = normalizedPrompt.includes('machine') || normalizedPrompt.includes('manufacturing');
  const hasSales = normalizedPrompt.includes('sales');
  const hasEngineering = normalizedPrompt.includes('engineering');

  const departmentsDetected = [];
  if (hasManufacturing) departmentsDetected.push('Manufacturing');
  if (hasEngineering) departmentsDetected.push('Engineering');
  if (hasSales) departmentsDetected.push('Sales');
  if (!departmentsDetected.length) departmentsDetected.push('Operations');

  const employeeMatch = normalizedPrompt.match(/(\d+)\s+employees?/i);
  const machineMatch = normalizedPrompt.match(/(\d+)\s+machines?/i);

  const totalEmployees = employeeMatch ? Number(employeeMatch[1]) : 25;
  const activeMachines = machineMatch ? Number(machineMatch[1]) : 4;

  return {
    organization: {
      name: 'TechForge Industries',
      departments: departmentsDetected,
      totalEmployees,
    },
    resources: {
      machines: activeMachines,
      type: hasManufacturing ? 'CNC' : 'Cloud',
      utilizationTarget: hasPayroll ? 85 : 75,
    },
    widgets: [
      { id: '1', type: 'stat', title: 'Total Workforce', config: { value: totalEmployees, icon: 'users' } },
      { id: '2', type: 'stat', title: 'Active Machines', config: { value: activeMachines, icon: 'server' } },
      { id: '3', type: 'chart', title: 'Department Distribution', config: { type: 'pie' } },
      { id: '4', type: 'chart', title: 'Payroll Trend', config: { type: hasPayroll ? 'line' : 'area' } },
      { id: '5', type: 'table', title: 'Top Performers', config: { rows: 5 } },
      { id: '6', type: 'stat', title: 'Avg Utilization', config: { value: 87, suffix: '%' } },
    ],
    prompt,
  };
};

export const getChatResponse = (message) => {
  const normalizedMessage = String(message || '').trim().toLowerCase();

  const responses = {
    'optimize payroll': 'Based on your current configuration:\n\n✅ Locked allocation: 85%\n✅ Accessible allocation: 15%\n✅ Estimated yield: $2,450/month\n\nRecommendations:\n1. Increase organization scale\n2. Enable auto-yield sweeps\n3. Review high-utilization departments',
    'analyze yield performance': 'Yield Performance Analysis:\n\nThis month:\n• Total Earned: $2,450\n• Average APY: 12.5%\n• Best Day: +$95\n\nForecast:\n• Next month projection: $2,620\n• Confidence: 94%',
    'show employee stats': 'Employee Statistics:\n\n• Total employees: 100\n• Active: 91\n• Paused: 9\n\nTop departments: Engineering, Operations, Sales, Support',
    'calculate roi': 'ROI Analysis (3-Month Projection):\n\nTraditional bank: $753,125\nDERP platform: $767,875\nEstimated gain: $14,750 quarterly',
    'compare departments': 'Department comparison:\n\nEngineering has the strongest payroll efficiency. Operations is the most stable. Sales has the best revenue-to-payroll ratio.',
  };

  return {
    reply: responses[normalizedMessage] || `I understand you're asking about: ${message}\n\nI can help with payroll optimization, yield analysis, employee metrics, ROI calculations, and department comparisons.`,
    suggestions: ['Optimize payroll', 'Analyze yield performance', 'Show employee stats', 'Calculate ROI', 'Compare departments'],
  };
};

export const appendNotification = async (notification) =>
  updateDatabase((database) => {
    const entry = {
      id: `notif-${Date.now()}`,
      read: false,
      createdAt: now(),
      ...notification,
    };
    database.notifications.unshift(entry);
    return entry;
  });

export const appendActivityLog = async (log) =>
  updateDatabase((database) => {
    const entry = {
      id: `log-${Date.now()}`,
      createdAt: now(),
      ...log,
    };
    database.activityLogs.unshift(entry);
    return entry;
  });

export const createAuthNonce = async (walletAddress) => {
  const nonce = `Login to D-ERP at ${new Date().toISOString()}`;
  const nonceId = `${String(walletAddress).toLowerCase()}:${Date.now()}`;

  await updateDatabase((database) => {
    database.authNonces[nonceId] = {
      walletAddress,
      nonce,
      createdAt: now(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    };
    return database.authNonces[nonceId];
  });

  return { nonceId, nonce };
};

export const consumeAuthNonce = async (nonceId) => {
  const database = await loadDatabase();
  const entry = database.authNonces[nonceId];
  if (!entry) return null;

  await updateDatabase((current) => {
    delete current.authNonces[nonceId];
    return true;
  });

  return entry;
};

export const createOrganizationForAdmin = async ({ walletAddress, name, email, industry = 'Decentralized enterprise automation' }) =>
  updateDatabase((database) => {
    const organizationId = `ORG${String(Date.now()).slice(-6)}`;
    const createdAt = now();
    database.organizations.unshift({
      id: organizationId,
      name: name || 'New Organization',
      legalName: name || 'New Organization',
      industry,
      walletAddress,
      adminWallet: walletAddress,
      createdAt,
      updatedAt: createdAt,
    });

    const adminUser = {
      id: `user-admin-${String(Date.now()).slice(-6)}`,
      organizationId,
      walletAddress,
      role: 'admin',
      name: name || 'Organization Admin',
      email: email || 'admin@techforge.io',
      passwordHash: '',
      status: 'active',
      department: 'Operations',
      jobTitle: 'Administrator',
      hourlyRate: 0,
      avatarUrl: '',
      createdAt,
      updatedAt: createdAt,
    };

    database.users.push(adminUser);
    return { organizationId, adminUser };
  });

export const createEmployeeInvite = async ({ organizationId, name, email, department = 'Engineering', hourlyRate = 25 }) =>
  updateDatabase((database) => {
    const inviteCode = `EMP${String(Date.now()).slice(-6)}`;
    const invite = {
      id: inviteCode,
      inviteCode,
      organizationId,
      name,
      email,
      department,
      hourlyRate,
      status: 'PENDING_WALLET_LINK',
      createdAt: now(),
      updatedAt: now(),
    };

    database.invites.unshift(invite);
    return invite;
  });

export const acceptEmployeeInvite = async ({ inviteCode, walletAddress }) =>
  updateDatabase((database) => {
    const invite = database.invites.find((item) => item.inviteCode === inviteCode);
    if (!invite) {
      throw Object.assign(new Error('Invite not found'), { statusCode: 404 });
    }

    invite.walletAddress = walletAddress;
    invite.status = 'ACTIVE';
    invite.updatedAt = now();

    const userId = `user-emp-${String(Date.now()).slice(-6)}`;
    const createdAt = now();
    const user = {
      id: userId,
      organizationId: invite.organizationId,
      walletAddress,
      role: 'employee',
      name: invite.name,
      email: invite.email,
      passwordHash: '',
      status: 'active',
      department: invite.department,
      jobTitle: `${invite.department} Specialist`,
      hourlyRate: invite.hourlyRate,
      avatarUrl: '',
      createdAt,
      updatedAt: createdAt,
    };

    database.users.push(user);
    database.payrollEntries.unshift({
      id: `pay-${userId}`,
      organizationId: invite.organizationId,
      userId,
      name: user.name,
      department: user.department,
      walletAddress,
      hourlyRate: invite.hourlyRate,
      hoursThisMonth: 128,
      totalEarned: round(128 * Number(invite.hourlyRate)),
      status: 'active',
      streamRatePerHour: round(Number(invite.hourlyRate) * 0.96),
      lockedPercentage: 85,
      accessiblePercentage: 15,
      chain: 'BSC Testnet',
      contractAddress: `0x${String(Date.now()).slice(-40).padStart(40, '0')}`,
      updatedAt: createdAt,
    });

    database.wallets.unshift({
      id: `wallet-${userId}`,
      organizationId: invite.organizationId,
      userId,
      address: walletAddress,
      chain: 'BSC Testnet',
      balance: 2.0,
      connected: true,
      createdAt,
      updatedAt: createdAt,
    });

    database.employeeSettings[userId] = {
      alerts: true,
      autoLock: true,
      lockedPercentage: 85,
      accessiblePercentage: 15,
      notificationChannels: ['in-app', 'email'],
      walletSync: true,
      updatedAt: createdAt,
    };

    return { invite, user };
  });

export const seedDatabase = async () => saveDatabase(createSeedData());
