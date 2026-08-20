# Wabtechs Ecosystem — Technical & Strategic Roadmap

> Version 1.0 — August 2026
> Living document. Update as modules graduate and priorities shift.

---

## 1. Vision

Wabtechs is a modular software platform composed of three pillars:

| Pillar | Purpose |
|--------|---------|
| **Wabtechs-Core** | Backend services: identity, billing, licensing, notifications, workflows, and integrations. Shared API layer consumed by all apps. |
| **Wabtechs-UI** | Design system and component library. Tokens, themes, React components, hooks, icons, utilities. |
| **Wabtechs-Cloud** | Consumer-facing web app. Admin portal, dashboard, settings, marketplace. Built on Core + UI. |

The platform must be **multi-tenant**, **self-hostable**, and **extensible** — allowing third-party developers to build on top of it.

---

## 2. Ecosystem Architecture

```
┌───────────────────────────────────────────────────────┐
│                    Wabtechs-Cloud                     │
│         (Next.js 15 App Router frontend)              │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐   │
│  │ Dashboard │  │ Settings │  │ Marketplace/Store │   │
│  └─────┬─────┘  └─────┬────┘  └────────┬──────────┘   │
│        │              │                 │              │
│   ┌────┴──────────────┴─────────────────┴────┐        │
│   │           @wabtechs/ui (SDK + React)     │        │
│   └──────────────────┬───────────────────────┘        │
└──────────────────────┼────────────────────────────────┘
                       │ HTTP (REST + SSE)
┌──────────────────────┼────────────────────────────────┐
│               Wabtechs-Core                            │
│         (Next.js 15 App Router backend)               │
│  ┌──────────┐ ┌───────────┐ ┌────────────┐           │
│  │ Identity │ │Organizations│ │   Roles    │           │
│  └────┬─────┘ └─────┬─────┘ └─────┬──────┘           │
│  ┌────┴─────┐ ┌─────┴─────┐ ┌─────┴──────┐           │
│  │Licensing │ │Notifications│ │  Dashboard │           │
│  └────┬─────┘ └─────┬─────┘ └─────┬──────┘           │
│  ┌────┴─────┐ ┌─────┴─────┐ ┌─────┴──────┐           │
│  │ Audit    │ │Documents  │ │Integrations│           │
│  └────┬─────┘ └─────┬─────┘ └─────┬──────┘           │
│       │             │              │                   │
│  ┌────┴─────────────┴──────────────┴────────────┐     │
│  │              @wabtechs/database (Drizzle)     │     │
│  │                    PostgreSQL 16              │     │
│  └───────────────────────────────────────────────┘     │
└───────────────────────────────────────────────────────┘
```

### Data Flow

1. **Cloud** authenticates via JWT (access + refresh tokens) through Core's `/api/v1/auth/*` routes
2. **Cloud** sends `Authorization: Bearer <token>` + `x-tenant-id` header on all requests
3. **Core** validates token, resolves tenant, applies rate limiting, CSRF protection, and RBAC checks
4. **Core** uses DDD layers: `api/ → application/ → domain/ → infra/` (Drizzle)
5. **Core** returns `Result<T>` envelope: `{ data: T }` or `{ error: { code, message, requestId? } }`

---

## 3. Module Inventory

### 3.1 Complete Modules (Core)

| Module | Path | Status | Notes |
|--------|------|--------|-------|
| **Identity** | `packages/modules/identity/` | ✅ Complete | Auth, JWT, sessions, API keys |
| **Organizations** | `packages/modules/organizations/` | ✅ Complete | Multi-tenant orgs, membership |
| **Roles** | `packages/modules/roles/` | ✅ Complete | RBAC, permissions, role assignment |
| **Licensing** | `packages/modules/licensing/` | ✅ Complete | License lifecycle, validation |
| **Notifications** | `packages/modules/notifications/` | ✅ Complete | Channels, delivery, preferences |

### 3.2 Stub Modules (Core — Empty/Draft)

| Module | Path | Priority | Notes |
|--------|------|----------|-------|
| **Audit** | `packages/modules/audit/` | P0 | Security compliance, activity logs |
| **Documents** | `packages/modules/documents/` | P1 | File storage, metadata, access control |
| **Settings** | `packages/modules/settings/` | P0 | Profile, preferences, org settings |
| **Integrations** | `packages/modules/integrations/` | P2 | Webhook management, API connectors |
| **Marketplace** | `packages/modules/marketplace/` | P2 | App catalog, installation, billing |
| **Payments** | `packages/modules/payments/` | P1 | Stripe integration, invoices, billing |
| **Sync** | `packages/modules/sync/` | P3 | Data synchronization, export/import |
| **Workflow** | `packages/modules/workflow/` | P3 | Automation rules, triggers, actions |
| **AI** | `packages/modules/ai/` | P3 | LLM integration, prompts, context |
| **Monitoring** | `packages/modules/monitoring/` | P2 | Health checks, uptime, alerts |
| **Reporting** | `packages/modules/reporting/` | P2 | Analytics, dashboards, exports |
| **Users** | `packages/modules/users/` | P0 | User profiles, preferences, lookup |

### 3.3 UI Component Status

| Package | Components/Exports | Tests | Stories |
|---------|-------------------|-------|---------|
| `@wabtechs/ui` | 38 components | 8 | 5 |
| `@wabtechs/tokens` | CSS variables | ✅ | — |
| `@wabtechs/themes` | Light/dark themes | ✅ | — |
| `@wabtechs/hooks` | 4 hooks | — | — |
| `@wabtechs/icons` | Lucide wrapper | — | — |
| `@wabtechs/utils` | 5 utilities | — | — |
| `@wabtechs/sdk` | AuthClient + useAuthStore | — | — |
| `@wabtechs/eslint-config` | Shared config | — | — |

---

## 4. Phased Roadmap

### Phase 0 — Foundation & Parity (Weeks 1–3)

**Goal:** Core module parity with Cloud frontend; stabilize auth and multi-tenant flows.

| Task | Owner | Est. |
|------|-------|------|
| Extract `Settings` module from Identity (profile, preferences) | Backend | 3d |
| Create `Users` module (user lookup, profile, avatar) | Backend | 3d |
| Build `Audit` module (event logger, query API) | Backend | 4d |
| Wire audit logging into Identity + Organizations modules | Backend | 2d |
| Fix Cloud ↔ Core SDK alignment (ensure all API calls match Core routes) | Frontend | 3d |
| Add `@wabtechs/ui` to Cloud `pnpm-workspace.yaml` and replace local components | Frontend | 2d |
| Add Cloud `Shell`, `Sidebar`, `Header` layout components | Frontend | 3d |
| Write integration tests for auth + org + RBAC flows | QA | 4d |
| Set up CI pipeline (lint, typecheck, test, build) | DevOps | 2d |

### Phase 1 — Payments & Documents (Weeks 4–6)

**Goal:** Enable billing and file management.

| Task | Owner | Est. |
|------|-------|------|
| Create `Payments` module (Stripe webhook handler, invoice model) | Backend | 5d |
| Add subscription plans and org billing to `Organizations` | Backend | 3d |
| Create `Documents` module (S3/MinIO upload, metadata, ACL) | Backend | 5d |
| Build file upload UI component in `@wabtechs/ui` | Frontend | 3d |
| Build billing/subscription settings page in Cloud | Frontend | 4d |
| Build document manager page in Cloud | Frontend | 3d |
| Add E2E tests for payment + document flows | QA | 3d |

### Phase 2 — Marketplace & Integrations (Weeks 7–9)

**Goal:** Enable third-party app ecosystem.

| Task | Owner | Est. |
|------|-------|------|
| Create `Marketplace` module (app registry, installation, versioning) | Backend | 5d |
| Create `Integrations` module (webhook CRUD, API key management per app) | Backend | 4d |
| Add app manifest schema (name, version, permissions, webhooks) | Backend | 2d |
| Build marketplace browse/search/install UI | Frontend | 5d |
| Build integration settings page (webhooks, API keys) | Frontend | 3d |
| Add `Monitoring` module (health endpoints, uptime checks, alert rules) | Backend | 4d |
| Add `Reporting` module (activity reports, usage analytics) | Backend | 4d |
| Add monitoring dashboard in Cloud | Frontend | 3d |
| Write marketplace + integration tests | QA | 3d |

### Phase 3 — Automation & Sync (Weeks 10–12)

**Goal:** Workflow automation and data synchronization.

| Task | Owner | Est. |
|------|-------|------|
| Create `Workflow` module (rules engine, triggers, actions) | Backend | 6d |
| Create `Sync` module (data export/import, CSV/JSON) | Backend | 4d |
| Build workflow builder UI (visual rule editor) | Frontend | 6d |
| Build data import/export UI | Frontend | 3d |
| Add workflow execution audit logging | Backend | 2d |
| Add workflow + sync integration tests | QA | 3d |

### Phase 4 — AI & Advanced Analytics (Weeks 13–15)

**Goal:** AI-powered features and advanced reporting.

| Task | Owner | Est. |
|------|-------|------|
| Create `AI` module (LLM proxy, prompt templates, context management) | Backend | 6d |
| Add AI features to relevant modules (smart suggestions, auto-categorization) | Backend | 4d |
| Build AI assistant UI component | Frontend | 4d |
| Build advanced reporting dashboard | Frontend | 5d |
| Add AI module tests + reporting tests | QA | 3d |

### Phase 5 — Polish & Scale (Weeks 16–18)

**Goal:** Performance, security hardening, documentation.

| Task | Owner | Est. |
|------|-------|------|
| Load testing (1000 concurrent users, multi-tenant isolation) | QA | 4d |
| Security audit (OWASP Top 10, penetration testing) | Security | 5d |
| API documentation (OpenAPI/Swagger generation) | Backend | 3d |
| Component documentation (Storybook for all 38+ components) | Frontend | 4d |
| Performance profiling and optimization | Backend + Frontend | 4d |
| Disaster recovery and backup procedures | DevOps | 3d |

### Phase 6 — Self-Hosting & Deployment (Weeks 19–21)

**Goal:** Docker/Kubernetes deployment, self-hosting guide.

| Task | Owner | Est. |
|------|-------|------|
| Dockerize Core + Cloud | DevOps | 3d |
| Docker Compose setup (PostgreSQL + Core + Cloud + Redis) | DevOps | 2d |
| Kubernetes manifests (Deployment, Service, Ingress) | DevOps | 4d |
| Self-hosting documentation | DevOps | 3d |
| CI/CD pipeline (GitHub Actions → Docker Hub → K8s) | DevOps | 4d |
| Add health check and readiness probe endpoints to all modules | Backend | 2d |

### Phase 7 — SDK & Developer Experience (Weeks 22–24)

**Goal:** Public SDK, developer portal, plugin system.

| Task | Owner | Est. |
|------|-------|------|
| Build `@wabtechs/sdk` client library (REST client for all Core APIs) | Backend | 5d |
| Create developer portal (docs, API explorer, sandbox) | Frontend | 6d |
| Build plugin/extension system (manifest, lifecycle, hooks) | Backend | 5d |
| Plugin SDK for third-party developers | Backend | 4d |
| Submit to npm + create publish workflow | DevOps | 2d |

---

## 5. Module Development Standards

### 5.1 DDD Structure (Required for All Modules)

```
packages/modules/<module-name>/
├── src/
│   ├── domain/          # Entities, value objects, repository ports
│   │   ├── entities/
│   │   ├── events/
│   │   └── repositories/
│   ├── application/     # Use cases (one file per use case)
│   │   └── use-cases/
│   ├── infra/           # Drizzle implementations, external adapters
│   │   └── db/
│   ├── api/             # Zod request/response schemas
│   │   └── schemas/
│   └── events/          # Domain event definitions
├── package.json
└── tsconfig.json
```

### 5.2 API Route Convention

```typescript
// apps/core/src/app/api/v1/<module>/<route>/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { withTenant } from '@/lib/tenant';
import { withAuth } from '@/lib/auth';
import { success, failure } from '@wabtechs/core';

export async function GET(req: NextRequest) {
  return withAuth(req, async (session) => {
    return withTenant(req, async (tenantId) => {
      // ... use case logic
      return NextResponse.json(success(data));
    });
  });
}
```

### 5.3 Response Envelope

```typescript
// Success
{ "data": T }

// Error
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {} // optional
    "requestId": "string"
  }
}
```

### 5.4 Required Headers

| Header | Purpose | Required |
|--------|---------|----------|
| `Authorization: Bearer <token>` | JWT auth | Yes (except public routes) |
| `x-tenant-id` | Multi-tenant context | Yes (except auth routes) |
| `x-csrf-token` | CSRF protection | Yes (mutations) |
| `Content-Type: application/json` | Request body format | Yes (POST/PUT/PATCH) |

---

## 6. Security Checklist

- [x] JWT access + refresh token auth
- [x] CSRF protection via `x-csrf-token` header
- [x] Rate limiting (token bucket algorithm)
- [x] Multi-tenant isolation (`tenantId` scoping)
- [x] RBAC permission checks
- [ ] Input validation on all endpoints (Zod schemas)
- [ ] SQL injection prevention (Drizzle parameterized queries)
- [x] Session storage in DB (revocable)
- [ ] Audit logging for all mutations
- [ ] CORS configuration for production
- [ ] CSP headers
- [ ] HTTPS enforcement
- [ ] Secrets management (env vars, not hardcoded)
- [ ] Dependency vulnerability scanning

---

## 7. Testing Strategy

| Level | Tool | Coverage Target |
|-------|------|-----------------|
| Unit (use cases) | Vitest | 80%+ per module |
| Integration (API routes) | Vitest + Supertest | All routes |
| Component | Vitest + Testing Library | All UI components |
| E2E | Playwright | Critical user flows |
| Visual regression | Chromatic / Storybook | All UI components |

### Test Files Convention

```
__tests__/
├── unit/
│   └── use-cases/
├── integration/
│   └── api/
└── fixtures/
```

---

## 8. Performance Targets

| Metric | Target |
|--------|--------|
| API response time (p95) | < 200ms |
| Page load (LCP) | < 2.5s |
| First Input Delay (FID) | < 100ms |
| Time to Interactive (TTI) | < 3.5s |
| Bundle size (initial) | < 150KB gzipped |
| Database query time (p95) | < 50ms |
| Concurrent users per instance | 500+ |
| Multi-tenant query isolation | 100% (no cross-tenant leaks) |

---

## 9. Technology Stack Summary

| Layer | Technology |
|-------|------------|
| Frontend framework | Next.js 15 (App Router) |
| UI components | React + Radix UI + Tailwind CSS v4 |
| State management | Zustand |
| Backend framework | Next.js 15 (App Router, route handlers) |
| ORM | Drizzle ORM |
| Database | PostgreSQL 16 |
| Authentication | JWT (custom), sessions in DB |
| Multi-tenancy | Header-based (`x-tenant-id`) |
| Validation | Zod |
| Monorepo | pnpm workspaces + Turborepo |
| Testing | Vitest, Testing Library, Playwright |
| CI/CD | GitHub Actions |
| Containerization | Docker, Kubernetes |
| Package registry | npm |

---

## 10. Open Decisions

| Decision | Options | Status |
|----------|---------|--------|
| File storage backend | S3 / MinIO / local filesystem | Open — default to MinIO for self-hosting |
| Redis for rate limiting / caching | Redis / in-memory | Open — in-memory for MVP, Redis for prod |
| Email delivery (notifications) | SendGrid / Mailgun / SMTP | Open — SMTP for self-hosting, provider for cloud |
| Search engine | PostgreSQL FTS / Meilisearch / Elasticsearch | Open — PostgreSQL FTS for MVP |
| Real-time (SSE vs WebSocket) | SSE for simplicity / WebSocket for bidirectional | Open — SSE for dashboard, WebSocket for workflows |
| Payment provider | Stripe / Paddle / LemonSqueezy | Open — Stripe preferred |

---

*This document should be reviewed and updated at the end of each phase.*
