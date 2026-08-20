export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  avatar?: string;
  ownerId: string;
  plan: 'free' | 'pro' | 'enterprise';
  settings: OrganizationSettings;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationSettings {
  allowPublicSignup: boolean;
  requireMFA: boolean;
  sessionDuration: number;
  allowedDomains: string[];
}

export interface Member {
  id: string;
  userId: string;
  organizationId: string;
  role: string;
  status: 'active' | 'invited' | 'suspended';
  joinedAt?: string;
  invitedAt: string;
  user: User;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  organizationId: string;
  memberIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description?: string;
}

export interface Application {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  category: string;
  version: string;
  status: 'available' | 'installed' | 'connected' | 'deprecated';
  subscription?: Subscription;
  license?: License;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  applicationId: string;
  organizationId: string;
  plan: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface License {
  id: string;
  applicationId: string;
  organizationId: string;
  key: string;
  type: 'trial' | 'standard' | 'premium' | 'enterprise';
  status: 'active' | 'expired' | 'revoked' | 'pending';
  seats: number;
  usedSeats: number;
  features: string[];
  expiresAt?: string;
  activatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionInfo {
  id: string;
  userId: string;
  device: string;
  browser: string;
  os: string;
  ip: string;
  location?: string;
  isCurrent: boolean;
  lastActive: string;
  createdAt: string;
}

export interface SecurityEvent {
  id: string;
  userId: string;
  type: 'login' | 'logout' | 'password_change' | 'mfa_enabled' | 'mfa_disabled' | 'api_key_created' | 'api_key_revoked' | 'session_revoked';
  description: string;
  ip: string;
  location?: string;
  device: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  createdAt: string;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  categories: {
    security: boolean;
    billing: boolean;
    updates: boolean;
    marketing: boolean;
  };
}

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  hashedKey: string;
  lastUsedAt?: string;
  expiresAt?: string;
  scopes: string[];
  createdAt: string;
  createdBy: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}