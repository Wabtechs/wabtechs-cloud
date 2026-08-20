import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { securityApi } from '@/lib/api';
import type { SessionInfo, SecurityEvent } from '@/lib/types';

export function useSessions() {
  return useQuery({
    queryKey: ['security', 'sessions'],
    queryFn: () => securityApi.getSessions(),
  });
}

export function useRevokeSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => securityApi.revokeSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security', 'sessions'] });
    },
  });
}

export function useRevokeAllSessions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => securityApi.revokeAllSessions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security', 'sessions'] });
    },
  });
}

export function useSecurityEvents(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['security', 'events', params],
    queryFn: () => securityApi.getEvents(params),
  });
}

export function useEnableMFA() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => securityApi.enableMFA(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security'] });
    },
  });
}

export function useDisableMFA() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => securityApi.disableMFA(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security'] });
    },
  });
}

export function useVerifyMFA() {
  return useMutation({
    mutationFn: (code: string) => securityApi.verifyMFA(code),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      securityApi.changePassword(currentPassword, newPassword),
  });
}
