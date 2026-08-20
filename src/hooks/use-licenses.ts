import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { licenseApi } from '@/lib/api';
import type { License } from '@/lib/types';

export function useLicenses(organizationId: string, params?: { status?: string }) {
  return useQuery({
    queryKey: ['licenses', organizationId, params],
    queryFn: () => licenseApi.list(organizationId, params),
    enabled: !!organizationId,
  });
}

export function useLicense(id: string) {
  return useQuery({
    queryKey: ['licenses', id],
    queryFn: () => licenseApi.get(id),
    enabled: !!id,
  });
}

export function useActivateLicense(organizationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (licenseKey: string) => licenseApi.activate(organizationId, licenseKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['licenses', organizationId] });
    },
  });
}

export function useRenewLicense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => licenseApi.renew(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['licenses'] });
    },
  });
}
