import { sdk } from '@/lib/sdk';
import { getSession } from '@/lib/auth';
import type {
  User,
  Organization,
  Member,
  Team,
  Role,
  Permission,
  Application,
  Subscription,
  License,
  SessionInfo,
  SecurityEvent,
  Notification,
  NotificationPreferences,
  ApiKey,
  PaginatedResponse,
} from '@/lib/types';

export const authApi = {
  async login(email: string, password: string) {
    const response = await sdk.post('/api/v1/identity/auth/login', { email, password });
    return response.data;
  },

  async logout() {
    const session = await getSession();
    if (session) {
      await sdk.post('/api/v1/identity/auth/logout');
    }
  },

  async me() {
    const response = await sdk.get('/api/v1/identity/auth/me');
    return response.data as User;
  },

  async refresh(refreshToken: string) {
    const response = await sdk.post('/api/v1/identity/auth/refresh', { refreshToken });
    return response.data;
  },
};

export const organizationApi = {
  async list() {
    const response = await sdk.get('/api/v1/organizations');
    return response.data as Organization[];
  },

  async get(id: string) {
    const response = await sdk.get(`/api/v1/organizations/${id}`);
    return response.data as Organization;
  },

  async create(data: { name: string; slug: string; description?: string }) {
    const response = await sdk.post('/api/v1/organizations', data);
    return response.data as Organization;
  },

  async update(id: string, data: Partial<Organization>) {
    const response = await sdk.patch(`/api/v1/organizations/${id}`, data);
    return response.data as Organization;
  },

  async delete(id: string) {
    await sdk.delete(`/api/v1/organizations/${id}`);
  },

  async getMembers(orgId: string) {
    const response = await sdk.get(`/api/v1/organizations/${orgId}/members`);
    return response.data as Member[];
  },

  async inviteMember(orgId: string, email: string, roleId: string) {
    const response = await sdk.post(`/api/v1/organizations/${orgId}/members/invite`, { email, roleId });
    return response.data as Member;
  },

  async updateMemberRole(orgId: string, memberId: string, roleId: string) {
    const response = await sdk.patch(`/api/v1/organizations/${orgId}/members/${memberId}`, { roleId });
    return response.data as Member;
  },

  async removeMember(orgId: string, memberId: string) {
    await sdk.delete(`/api/v1/organizations/${orgId}/members/${memberId}`);
  },

  async getTeams(orgId: string) {
    const response = await sdk.get(`/api/v1/organizations/${orgId}/teams`);
    return response.data as Team[];
  },

  async createTeam(orgId: string, data: { name: string; description?: string; memberIds?: string[] }) {
    const response = await sdk.post(`/api/v1/organizations/${orgId}/teams`, data);
    return response.data as Team;
  },

  async getRoles(orgId: string) {
    const response = await sdk.get(`/api/v1/organizations/${orgId}/roles`);
    return response.data as Role[];
  },

  async getPermissions() {
    const response = await sdk.get('/api/v1/permissions');
    return response.data as Permission[];
  },
};

export const applicationApi = {
  async list(params?: { status?: string; category?: string }) {
    const response = await sdk.get('/api/v1/applications', params);
    return response.data as Application[];
  },

  async get(id: string) {
    const response = await sdk.get(`/api/v1/applications/${id}`);
    return response.data as Application;
  },

  async install(applicationId: string, organizationId: string) {
    const response = await sdk.post(`/api/v1/applications/${applicationId}/install`, { organizationId });
    return response.data;
  },

  async uninstall(applicationId: string, organizationId: string) {
    await sdk.delete(`/api/v1/applications/${applicationId}/install`);
  },

  async getSubscriptions(organizationId: string) {
    const response = await sdk.get(`/api/v1/organizations/${organizationId}/subscriptions`);
    return response.data as Subscription[];
  },
};

export const licenseApi = {
  async list(organizationId: string, params?: { status?: string }) {
    const response = await sdk.get(`/api/v1/organizations/${organizationId}/licenses`, params);
    return response.data as License[];
  },

  async get(id: string) {
    const response = await sdk.get(`/api/v1/licenses/${id}`);
    return response.data as License;
  },

  async activate(organizationId: string, licenseKey: string) {
    const response = await sdk.post(`/api/v1/organizations/${organizationId}/licenses/activate`, { licenseKey });
    return response.data as License;
  },

  async renew(id: string) {
    const response = await sdk.post(`/api/v1/licenses/${id}/renew`);
    return response.data as License;
  },
};

export const securityApi = {
  async getSessions() {
    const response = await sdk.get('/api/v1/security/sessions');
    return response.data as SessionInfo[];
  },

  async revokeSession(sessionId: string) {
    await sdk.delete(`/api/v1/security/sessions/${sessionId}`);
  },

  async revokeAllSessions() {
    await sdk.delete('/api/v1/security/sessions');
  },

  async getEvents(params?: { page?: number; limit?: number }) {
    const response = await sdk.get('/api/v1/security/events', params);
    return response.data as PaginatedResponse<SecurityEvent>;
  },

  async enableMFA() {
    const response = await sdk.post('/api/v1/security/mfa/enable');
    return response.data;
  },

  async disableMFA(code: string) {
    await sdk.post('/api/v1/security/mfa/disable', { code });
  },

  async verifyMFA(code: string) {
    const response = await sdk.post('/api/v1/security/mfa/verify', { code });
    return response.data;
  },

  async changePassword(currentPassword: string, newPassword: string) {
    await sdk.post('/api/v1/security/password', { currentPassword, newPassword });
  },
};

export const notificationApi = {
  async list(params?: { unreadOnly?: boolean; page?: number; limit?: number }) {
    const response = await sdk.get('/api/v1/notifications', params);
    return response.data as PaginatedResponse<Notification>;
  },

  async markAsRead(id: string) {
    await sdk.patch(`/api/v1/notifications/${id}/read`);
  },

  async markAllAsRead() {
    await sdk.patch('/api/v1/notifications/read-all');
  },

  async getPreferences() {
    const response = await sdk.get('/api/v1/notifications/preferences');
    return response.data as NotificationPreferences;
  },

  async updatePreferences(preferences: Partial<NotificationPreferences>) {
    const response = await sdk.patch('/api/v1/notifications/preferences', preferences);
    return response.data as NotificationPreferences;
  },
};

export const apiKeyApi = {
  async list() {
    const response = await sdk.get('/api/v1/identity/api-keys');
    return response.data as ApiKey[];
  },

  async create(data: { name: string; scopes: string[]; expiresAt?: string }) {
    const response = await sdk.post('/api/v1/identity/api-keys', data);
    return response.data as ApiKey & { secret: string };
  },

  async revoke(id: string) {
    await sdk.delete(`/api/v1/identity/api-keys/${id}`);
  },
};

export const dashboardApi = {
  async getStats() {
    const response = await sdk.get('/api/v1/dashboard/stats');
    return response.data;
  },

  async getRecentActivity() {
    const response = await sdk.get('/api/v1/dashboard/activity');
    return response.data;
  },

  async getNotifications() {
    const response = await sdk.get('/api/v1/dashboard/notifications');
    return response.data;
  },
};
