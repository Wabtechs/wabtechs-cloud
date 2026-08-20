import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationApi } from '@/lib/api';
import type { Organization, Member } from '@/lib/types';

export function useOrganizations() {
  return useQuery({
    queryKey: ['organizations'],
    queryFn: () => organizationApi.list(),
  });
}

export function useOrganization(id: string) {
  return useQuery({
    queryKey: ['organizations', id],
    queryFn: () => organizationApi.get(id),
    enabled: !!id,
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; slug: string; description?: string }) =>
      organizationApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Organization> }) =>
      organizationApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      queryClient.invalidateQueries({ queryKey: ['organizations', id] });
    },
  });
}

export function useDeleteOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => organizationApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
}

export function useOrganizationMembers(orgId: string) {
  return useQuery({
    queryKey: ['organizations', orgId, 'members'],
    queryFn: () => organizationApi.getMembers(orgId),
    enabled: !!orgId,
  });
}

export function useInviteMember(orgId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, roleId }: { email: string; roleId: string }) =>
      organizationApi.inviteMember(orgId, email, roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations', orgId, 'members'] });
    },
  });
}

export function useRemoveMember(orgId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: string) => organizationApi.removeMember(orgId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations', orgId, 'members'] });
    },
  });
}

export function useOrganizationTeams(orgId: string) {
  return useQuery({
    queryKey: ['organizations', orgId, 'teams'],
    queryFn: () => organizationApi.getTeams(orgId),
    enabled: !!orgId,
  });
}

export function useCreateTeam(orgId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; description?: string; memberIds?: string[] }) =>
      organizationApi.createTeam(orgId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations', orgId, 'teams'] });
    },
  });
}
