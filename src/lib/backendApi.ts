const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';

type RequestOptions = RequestInit & {
  body?: unknown;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('derp_token') : null;
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.message || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export type BackendUser = {
  id: string;
  walletAddress: string;
  role: 'admin' | 'employee';
  name: string;
  email: string;
  organizationName?: string;
  department?: string | null;
  hourlyRate?: number | null;
  jobTitle?: string | null;
  status?: string | null;
  organizationId?: string | null;
  avatarUrl?: string | null;
};

export type BackendResource = {
  id: string;
  name: string;
  type: 'machine' | 'server' | 'equipment';
  status: 'operational' | 'maintenance' | 'offline';
  utilization: number;
  department: string;
  lastMaintenance?: string;
  efficiency?: number;
};

export type AuthVerifyPayload = {
  walletAddress: string;
  signature: string;
  nonceId: string;
  role: 'admin' | 'employee';
  inviteCode?: string;
  name?: string;
  email?: string;
  organizationName?: string;
};

export const backendApi = {
  login: (walletAddress: string, role: 'admin' | 'employee') =>
    request<{ user: BackendUser; token: string; role: 'admin' | 'employee' }>('/auth/login', {
      method: 'POST',
      body: { walletAddress, role },
    }),
  requestNonce: (walletAddress: string) =>
    request<{ nonceId: string; nonce: string }>('/auth/request-nonce', {
      method: 'POST',
      body: { walletAddress },
    }),
  registerAdmin: (payload: AuthVerifyPayload & { organizationName?: string }) =>
    request<{ user: BackendUser; token: string; role: 'admin' }>('/auth/register-admin', {
      method: 'POST',
      body: payload,
    }),
  verifySignature: (payload: AuthVerifyPayload) =>
    request<{ user: BackendUser; token: string; role: 'admin' | 'employee'; organizationId?: string }>('/auth/verify-signature', {
      method: 'POST',
      body: payload,
    }),
  getCurrentUser: () => request<{ user: BackendUser }>('/auth/me'),
  chatRespond: (message: string) =>
    request<{ reply: string; suggestions: string[]; timestamp: string }>('/chat/respond', {
      method: 'POST',
      body: { message },
    }),
  getAdminSettings: () => request('/admin/settings'),
  updateAdminSettings: (payload: unknown) => request('/admin/settings', { method: 'PATCH', body: payload }),
  getAdminDashboard: () => request('/admin/dashboard'),
  getPayrollEntries: () => request('/admin/payroll'),
  updatePayrollStatus: (id: string, status: string) =>
    request(`/admin/payroll/${id}/status`, { method: 'PATCH', body: { status } }),
  updatePayrollEntry: (id: string, payload: unknown) =>
    request(`/admin/payroll/${id}`, { method: 'PATCH', body: payload }),
  getResources: () => request<{ resources: BackendResource[] }>('/admin/resources'),
  updateResource: (id: string, payload: unknown) =>
    request(`/admin/resources/${id}`, { method: 'PATCH', body: payload }),
  getTransactions: () => request('/admin/transactions'),
  generateAiConfig: (prompt: string) =>
    request('/admin/ai-config/generate', { method: 'POST', body: { prompt } }),
  saveAiConfig: (payload: unknown) => request('/admin/ai-configs', { method: 'POST', body: payload }),
  getEmployeeDashboard: (userId: string) => request(`/employee/dashboard/${userId}`),
  getEmployeeEarnings: (userId: string) => request(`/employee/earnings/${userId}`),
  getEmployeeTransactions: (userId: string) => request(`/employee/transactions/${userId}`),
  getEmployeeSettings: (userId: string) => request(`/employee/settings/${userId}`),
  updateEmployeeSettings: (userId: string, payload: unknown) =>
    request(`/employee/settings/${userId}`, { method: 'PATCH', body: payload }),
  getBootstrap: () => request('/bootstrap'),
};
