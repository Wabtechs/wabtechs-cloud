import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginInputSchema, MeResponseSchema } from '../src/schemas';

describe('@wabtechs/sdk — Schemas', () => {
  describe('LoginInputSchema', () => {
    it('should accept valid login input', () => {
      const result = LoginInputSchema.safeParse({
        email: 'test@wabtechs.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = LoginInputSchema.safeParse({
        email: 'not-an-email',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject short password', () => {
      const result = LoginInputSchema.safeParse({
        email: 'test@wabtechs.com',
        password: 'short',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('MeResponseSchema', () => {
    it('should accept valid user response', () => {
      const result = MeResponseSchema.safeParse({
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'test@wabtechs.com',
        name: 'Test User',
        role: 'admin',
        createdAt: '2026-01-01T00:00:00Z',
      });
      expect(result.success).toBe(true);
    });

    it('should accept minimal user response', () => {
      const result = MeResponseSchema.safeParse({
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'test@wabtechs.com',
        createdAt: '2026-01-01T00:00:00Z',
      });
      expect(result.success).toBe(true);
    });
  });
});
