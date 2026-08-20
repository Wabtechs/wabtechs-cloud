import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationApi } from '@/lib/api';
import type { Application } from '@/lib/types';

export function useApplications(params?: { status?: string; category?: string }) {
  return useQuery({
    queryKey: ['applications', params],
    queryFn: () => applicationApi.list(params),
  });
}

export function useApplication(id: string) {
  return useQuery({
    queryKey: ['applications', id],
    queryFn: () => applicationApi.get(id),
    enabled: !!id,
  });
}

export function useInstallApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationId, organizationId }: { applicationId: string; organizationId: string }) =>
      applicationApi.install(applicationId, organizationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
}

export function useUninstallApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationId, organizationId }: { applicationId: string; organizationId: string }) =>
      applicationApi.uninstall(applicationId, organizationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
}

export function useSubscriptions(organizationId: string) {
  return useQuery({
    queryKey: ['subscriptions', organizationId],
    queryFn: () => applicationApi.getSubscriptions(organizationId),
    enabled: !!organizationId,
  });
}
