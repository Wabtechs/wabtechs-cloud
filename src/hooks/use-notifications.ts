import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationApi } from '@/lib/api';
import { useNotificationStore } from '@/lib/store';
import type { Notification, NotificationPreferences } from '@/lib/types';

export function useNotifications(params?: { unreadOnly?: boolean; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['notifications', params],
    queryFn: () => notificationApi.list(params),
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  const decrementUnread = useNotificationStore((s) => s.decrementUnread);

  return useMutation({
    mutationFn: (id: string) => notificationApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      decrementUnread();
    },
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount);

  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      setUnreadCount(0);
    },
  });
}

export function useNotificationPreferences() {
  return useQuery({
    queryKey: ['notifications', 'preferences'],
    queryFn: () => notificationApi.getPreferences(),
  });
}

export function useUpdateNotificationPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (preferences: Partial<NotificationPreferences>) =>
      notificationApi.updatePreferences(preferences),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'preferences'] });
    },
  });
}
