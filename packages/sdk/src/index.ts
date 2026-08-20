/**
 * @wabtechs/sdk — entry point.
 *
 * Client HTTP, schemas, et stores d'authentification
 * pour communiquer avec Wabtechs Core (api.wabtechs.com).
 */

export { AuthClient, setToken, getToken } from './client';
export { useAuthStore } from './auth';
export type { AuthState } from './auth';
export {
  LoginInputSchema,
  MeResponseSchema,
  SessionResponseSchema,
  ApiResponseSchema,
} from './schemas';
export type {
  LoginInput,
  MeResponse,
  SessionResponse,
  ApiResponse,
} from './schemas';
