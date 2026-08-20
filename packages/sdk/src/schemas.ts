/**
 * @wabtechs/sdk — Schemas Zod pour les requêtes/réponses API.
 */

import { z } from 'zod';

export const LoginInputSchema = z.object({
  email: z.string().email('Adresse email invalide.'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
});

export type LoginInput = z.infer<typeof LoginInputSchema>;

export const MeResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().optional(),
  role: z.enum(['admin', 'user', 'viewer']).optional(),
  organizationId: z.string().uuid().optional(),
  createdAt: z.string().datetime(),
});

export type MeResponse = z.infer<typeof MeResponseSchema>;

export const SessionResponseSchema = z.object({
  expiresAt: z.string().datetime(),
  refreshToken: z.string(),
});

export type SessionResponse = z.infer<typeof SessionResponseSchema>;

export const ApiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    error: z.string().optional(),
    meta: z
      .object({
        timestamp: z.string(),
        requestId: z.string().uuid(),
      })
      .optional(),
  });

export type ApiResponse<T = unknown> = {
  success: boolean;
  data: T;
  error?: string;
  meta?: { timestamp: string; requestId: string };
};
