# WABTECHS CLOUD — FRONTEND ROADMAP

> Portail officiel Wabtechs Cloud
> Domaine : https://cloud.wabtechs.com
> Stack : Next.js 14 · React 18 · TypeScript · Tailwind CSS · @wabtechs/ui · @wabtechs/sdk

---

## VISION

Wabtechs Cloud est l'interface centrale permettant aux utilisateurs, organisations
et administrateurs de gérer leur écosystème Wabtechs.

Cloud n'est PAS un backend. Cloud gère l'écosystème.
Les applications (Bilengi, Dhayaro, SYRCOW, Santé Connect, Archivium) gèrent leur propre métier.

```
Utilisateur
    │
    ▼
cloud.wabtechs.com
    │
    ▼
@wabtechs/sdk
    │
    ▼
api.wabtechs.com
    │
    ▼
Wabtechs Core
    │
    ▼
Core Database
```

---

## PHASE 0 — ARCHITECTURE & FOUNDATION

**Objectif** : Corriger les fondations, aligner le SDK avec Core, supprimer les doublons.

### 0.1 — Audit & Correction du SDK (@wabtechs/sdk)

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 0.1.1 | Corriger `BASE_URL` → `/api/v1` prefix | CRITIQUE | ⬜ |
| 0.1.2 | Corriger envelope de réponse pour matcher Core (`{ data }` / `{ error: { code, message } }`) | CRITIQUE | ⬜ |
| 0.1.3 | Injecter le token d'auth dans les requêtes via interceptor | CRITIQUE | ⬜ |
| 0.1.4 | Ajouter `X-Request-Id` pour la corrélation | HAUTE | ⬜ |
| 0.1.5 | Gérer le refresh token automatique (401 → refresh → retry) | CRITIQUE | ⬜ |
| 0.1.6 | Persister les tokens dans des cookies httpOnly (via API route) | CRITIQUE | ⬜ |
| 0.1.7 | Corriger `safeApiData` pour parser le format réel de Core | CRITIQUE | ⬜ |
| 0.1.8 | Corriger `auth.store.ts` — import de `safeApiData` (n'est pas sur `Auth`) | CRITIQUE | ⬜ |
| 0.1.9 | Aligner les routes API du SDK avec Core (`/identity/auth/login`, etc.) | CRITIQUE | ⬜ |
| 0.1.10 | Ajouter gestion CSRF (token depuis `/api/v1/csrf`) | HAUTE | ⬜ |

**Livrable** : SDK fonctionnel, aligné avec Core, avec gestion d'erreurs correcte.

### 0.2 — Suppression des Composants UI Doublons

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 0.2.1 | Supprimer `src/components/ui/button.tsx` | CRITIQUE | ⬜ |
| 0.2.2 | Supprimer `src/components/ui/card.tsx` | CRITIQUE | ⬜ |
| 0.2.3 | Supprimer `src/components/ui/input.tsx` | CRITIQUE | ⬜ |
| 0.2.4 | Supprimer `src/components/ui/label.tsx` | CRITIQUE | ⬜ |
| 0.2.5 | Supprimer `src/components/ui/badge.tsx` | CRITIQUE | ⬜ |
| 0.2.6 | Supprimer `src/components/ui/skeleton.tsx` | CRITIQUE | ⬜ |
| 0.2.7 | Supprimer `src/components/ui/separator.tsx` | CRITIQUE | ⬜ |
| 0.2.8 | Supprimer `src/components/ui/avatar.tsx` | CRITIQUE | ⬜ |

**Garder localement** (pas encore dans @wabtechs/ui) :
- `dialog.tsx`, `dropdown-menu.tsx`, `table.tsx`, `tabs.tsx`
- `toast.tsx`, `select.tsx`, `switch.tsx`, `checkbox.tsx`

### 0.3 — Migration des Imports (~35 fichiers)

| # | Fichier | Imports à migrer |
|---|---|---|
| 0.3.1 | `src/components/auth/login-form.tsx` | Button, Input, Label |
| 0.3.2 | `src/components/layout/header.tsx` | Avatar, Badge, Button, Separator |
| 0.3.3 | `src/components/layout/sidebar.tsx` | Button, Separator |
| 0.3.4 | `src/app/dashboard/page.tsx` | Card, Badge |
| 0.3.5 | `src/app/dashboard/components/dashboard-stats.tsx` | Card, Badge, Skeleton |
| 0.3.6 | `src/app/dashboard/components/recent-activity.tsx` | Card, Badge, Avatar |
| 0.3.7 | `src/app/dashboard/components/notifications-panel.tsx` | Card, Badge, Button |
| 0.3.8 | `src/app/dashboard/components/security-overview.tsx` | Card, Badge, Button |
| 0.3.9 | `src/app/dashboard/components/license-overview.tsx` | Card, Badge, Button |
| 0.3.10 | `src/app/dashboard/components/applications-overview.tsx` | Card, Badge, Button |
| 0.3.11 | `src/app/applications/page.tsx` | Card |
| 0.3.12 | `src/app/applications/components/applications-table.tsx` | Badge, Button, Input |
| 0.3.13 | `src/app/licenses/page.tsx` | Card |
| 0.3.14 | `src/app/licenses/components/licenses-table.tsx` | Badge, Button |
| 0.3.15 | `src/app/organizations/page.tsx` | Card |
| 0.3.16 | `src/app/organizations/components/organizations-list.tsx` | Card, Badge, Button, Avatar |
| 0.3.17 | `src/app/organizations/components/create-organization-dialog.tsx` | Button, Input, Label |
| 0.3.18 | `src/app/security/page.tsx` | Card |
| 0.3.19 | `src/app/security/components/sessions-list.tsx` | Card, Badge, Button |
| 0.3.20 | `src/app/security/components/security-events.tsx` | Card, Badge |
| 0.3.21 | `src/app/security/components/password-section.tsx` | Button, Input, Label |
| 0.3.22 | `src/app/security/components/mfa-section.tsx` | Card, Badge, Button |
| 0.3.23 | `src/app/notifications/page.tsx` | Card |
| 0.3.24 | `src/app/notifications/components/notifications-list.tsx` | Card, Badge, Button |
| 0.3.25 | `src/app/notifications/components/notification-preferences.tsx` | Card, Button |
| 0.3.26 | `src/app/developers/api-keys/page.tsx` | Card |
| 0.3.27 | `src/app/developers/api-keys/components/api-keys-list.tsx` | Card, Badge, Button |
| 0.3.28 | `src/app/developers/api-keys/components/create-api-key-dialog.tsx` | Button, Input, Label |
| 0.3.29 | `src/app/settings/page.tsx` | Card |
| 0.3.30 | `src/app/settings/components/profile-settings.tsx` | Button, Input, Label |
| 0.3.31 | `src/app/settings/components/security-settings.tsx` | Button |
| 0.3.32 | `src/app/settings/components/preferences-settings.tsx` | Card, Button |
| 0.3.33 | `src/app/settings/components/organization-settings.tsx` | Card, Button, Input, Label |
| 0.3.34 | `src/app/settings/components/notifications-settings.tsx` | Card |
| 0.3.35 | `src/lib/utils.ts` | Re-export depuis `@wabtechs/ui` |

**Livrable** : Tous les imports pointent vers `@wabtechs/ui`, zéro doublon.

### 0.4 — Infrastructure de Test

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 0.4.1 | Créer `vitest.config.ts` | HAUTE | ⬜ |
| 0.4.2 | Créer `tests/setup.ts` | HAUTE | ⬜ |
| 0.4.3 | Créer `playwright.config.ts` | HAUTE | ⬜ |
| 0.4.4 | Ajouter dépendances (vitest, @vitejs/plugin-react, @playwright/test) | HAUTE | ⬜ |
| 0.4.5 | Créer `e2e/` directory | MOYENNE | ⬜ |

**Livrable** : Tests unitaires et E2E exécutables.

### 0.5 — Providers & Configuration

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 0.5.1 | Fix `src/components/providers.tsx` — ajouter WabtechsProvider | CRITIQUE | ⬜ |
| 0.5.2 | Ajouter ThemeProvider (light/dark/system) | CRITIQUE | ⬜ |
| 0.5.3 | Ajouter TooltipProvider | HAUTE | ⬜ |
| 0.5.4 | Fix `src/app/globals.css` — variables CSS pour dark mode | HAUTE | ⬜ |
| 0.5.5 | Vérifier `next.config.mjs` — rewrites vers Core | MOYENNE | ⬜ |
| 0.5.6 | Vérifier `tailwind.config.ts` — alignment avec @wabtechs/tokens | MOYENNE | ⬜ |

**Livrable** : Providers configurés, thème fonctionnel.

---

## PHASE 1 — SHELL, NAVIGATION & THÈME

**Objectif** : Shell responsive, navigation complète, thème premium.

### 1.1 — Root Layout

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 1.1.1 | Fix `src/app/layout.tsx` — fonts Inter/Geist | HAUTE | ⬜ |
| 1.1.2 | Mettre à jour metadata (title, description, icons, openGraph) | HAUTE | ⬜ |
| 1.1.3 | Importer styles `@wabtechs/ui` | HAUTE | ⬜ |
| 1.1.4 | Ajouter `suppressHydrationWarning` pour thème | MOYENNE | ⬜ |
| 1.1.5 | Rediriger `/` → `/dashboard` | HAUTE | ⬜ |

### 1.2 — Sidebar Responsive

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 1.2.1 | Refonte `sidebar.tsx` — layout desktop fixe | HAUTE | ⬜ |
| 1.2.2 | Créer `mobile-sidebar.tsx` — drawer slide-out | HAUTE | ⬜ |
| 1.2.3 | Overlay + fermeture au tapextérieur (mobile) | HAUTE | ⬜ |
| 1.2.4 | Navigation avec sections pliables (Applications, Settings) | MOYENNE | ⬜ |
| 1.2.5 | Indicateur de route active | HAUTE | ⬜ |
| 1.2.6 | Organization switcher en bas de sidebar | MOYENNE | ⬜ |
| 1.2.7 | User info en bas (avatar + nom + email) | MOYENNE | ⬜ |
| 1.2.8 | Store Zustand pour état open/close (mobile) | HAUTE | ⬜ |

**Composants @wabtechs/ui utilisés** : Button, Avatar, Badge, Separator

### 1.3 — Header

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 1.3.1 | Hamburger button (mobile only) | HAUTE | ⬜ |
| 1.3.2 | Breadcrumbs dynamiques | MOYENNE | ⬜ |
| 1.3.3 | Search command (Cmd+K) — placeholder | BASSE | ⬜ |
| 1.3.4 | Notification bell avec count badge | HAUTE | ⬜ |
| 1.3.5 | User avatar dropdown (profil, settings, logout) | HAUTE | ⬜ |
| 1.3.6 | Organization name display | MOYENNE | ⬜ |

### 1.4 — Dashboard Layout

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 1.4.1 | Layout CSS Grid : sidebar + header + content | HAUTE | ⬜ |
| 1.4.2 | Mobile : pas de sidebar, header fixe | HAUTE | ⬜ |
| 1.4.3 | Desktop : sidebar fixe 280px + content fluid | HAUTE | ⬜ |
| 1.4.4 | Scroll behavior (sidebar fixe, content scrollable) | HAUTE | ⬜ |
| 1.4.5 | Transition smooth pour mobile sidebar | MOYENNE | ⬜ |

**Livrable** : Shell responsive fonctionnel mobile/tablet/desktop.

---

## PHASE 2 — AUTHENTICATION

**Objectif** : Login, logout, session, refresh, middleware.

### 2.1 — SDK Auth Flow

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 2.1.1 | `Auth.login()` → POST `/identity/auth/login` | CRITIQUE | ⬜ |
| 2.1.2 | `Auth.me()` → GET `/identity/auth/me` | CRITIQUE | ⬜ |
| 2.1.3 | `Auth.session()` → GET `/identity/auth/session` | CRITIQUE | ⬜ |
| 2.1.4 | `Auth.logout()` → POST `/identity/auth/logout` | CRITIQUE | ⬜ |
| 2.1.5 | `Auth.refresh()` → POST `/identity/auth/refresh` | CRITIQUE | ⬜ |
| 2.1.6 | Persister tokens dans cookies httpOnly | CRITIQUE | ⬜ |
| 2.1.7 | Refresh automatique sur 401 | CRITIQUE | ⬜ |
| 2.1.8 | Clear session (cookies + zustand) | CRITIQUE | ⬜ |

### 2.2 — Auth Store (Zustand)

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 2.2.1 | `useAuthStore` — user, isAuthenticated, isLoading, error | CRITIQUE | ⬜ |
| 2.2.2 | Action `login(email, password)` | CRITIQUE | ⬜ |
| 2.2.3 | Action `logout()` | CRITIQUE | ⬜ |
| 2.2.4 | Action `initialize()` — vérifier session existante au chargement | CRITIQUE | ⬜ |
| 2.2.5 | Action `clearError()` | HAUTE | ⬜ |
| 2.2.6 | Selector `isAuthenticated` | HAUTE | ⬜ |
| 2.2.7 | Selector `user` | HAUTE | ⬜ |

### 2.3 — Middleware

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 2.3.1 | Lire token depuis cookie `wabtechs_access_token` | CRITIQUE | ⬜ |
| 2.3.2 | Routes publiques : `/auth/login`, `/auth/register`, `/auth/forgot-password` | CRITIQUE | ⬜ |
| 2.3.3 | Rediriger non-authentifiés vers `/auth/login` | CRITIQUE | ⬜ |
| 2.3.4 | Rediriger authentifiés depuis `/auth/login` vers `/dashboard` | CRITIQUE | ⬜ |
| 2.3.5 | Préserver query param `redirect` pour retour post-login | HAUTE | ⬜ |
| 2.3.6 | Matcher : exclure `api/`, `_next/`, fichiers statiques | HAUTE | ⬜ |

### 2.4 — Login Page & Form

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 2.4.1 | Fix `login-form.tsx` — imports @wabtechs/ui | CRITIQUE | ⬜ |
| 2.4.2 | Schéma Zod : email (email) + password (min 8) | CRITIQUE | ⬜ |
| 2.4.3 | React Hook Form + @hookform/resolvers/zod | CRITIQUE | ⬜ |
| 2.4.4 | Gestion erreurs 401 (identifiants incorrects) | CRITIQUE | ⬜ |
| 2.4.5 | Gestion rate limiting 429 | HAUTE | ⬜ |
| 2.4.6 | Message "session expired" depuis query param | HAUTE | ⬜ |
| 2.4.7 | Loading state avec Spinner | HAUTE | ⬜ |
| 2.4.8 | Layout centré avec branding Wabtechs | HAUTE | ⬜ |
| 2.4.9 | Lien "Mot de passe oublié" | MOYENNE | ⬜ |
| 2.4.10 | Lien "Créer un compte" | MOYENNE | ⬜ |

### 2.5 — Session Management

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 2.5.1 | Initialiser la session au chargement de l'app (`Providers` → `initialize()`) | CRITIQUE | ⬜ |
| 2.5.2 | Afficher skeleton pendant la vérification de session | HAUTE | ⬜ |
| 2.5.3 | Rediriger vers login si session expirée | CRITIQUE | ⬜ |
| 2.5.4 | Timer de refresh proactif (5 min avant expiration) | MOYENNE | ⬜ |

### 2.6 — API Routes (BFF)

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 2.6.1 | Fix ou supprimer `src/app/api/auth/login/route.ts` | HAUTE | ⬜ |
| 2.6.2 | Fix ou supprimer `src/app/api/auth/logout/route.ts` | HAUTE | ⬜ |
| 2.6.3 | Créer `src/app/api/auth/refresh/route.ts` (si BFF) | MOYENNE | ⬜ |
| 2.6.4 | Créer `src/app/api/auth/csrf/route.ts` (si BFF) | MOYENNE | ⬜ |

**Livrable** : Auth complète fonctionnelle — login, logout, session, refresh, middleware.

---

## PHASE 3 — DASHBOARD

**Objectif** : Vue d'ensemble moderne avec stats, activités, notifications.

### 3.1 — Dashboard Page

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 3.1.1 | Fix `src/app/dashboard/page.tsx` — Server Component si possible | HAUTE | ⬜ |
| 3.1.2 | Layout grille responsive (stats en haut, contenu en dessous) | HAUTE | ⬜ |
| 3.1.3 | Loading state avec `DashboardSkeleton` depuis @wabtechs/ui | HAUTE | ⬜ |
| 3.1.4 | Error boundary avec retry | HAUTE | ⬜ |
| 3.1.5 | Empty state si nouvelle organisation | MOYENNE | ⬜ |

### 3.2 — Stats Cards

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 3.2.1 | Fix `dashboard-stats.tsx` — Card depuis @wabtechs/ui | HAUTE | ⬜ |
| 3.2.2 | Afficher : Applications actives, Licences, Membres, Notifications | HAUTE | ⬜ |
| 3.2.3 | Icônes Lucide pour chaque stat | HAUTE | ⬜ |
| 3.2.4 | Trend indicator (+/- % par rapport à hier) | BASSE | ⬜ |
| 3.2.5 | Responsive : grille 2 colonnes mobile, 4 colonnes desktop | HAUTE | ⬜ |

### 3.3 — Applications Overview

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 3.3.1 | Fix `applications-overview.tsx` | HAUTE | ⬜ |
| 3.3.2 | Lister les 5 applications les plus utilisées | HAUTE | ⬜ |
| 3.3.3 | Badge statut (active, expiring, expired) | HAUTE | ⬜ |
| 3.3.4 | Lien "Voir toutes les applications" | HAUTE | ⬜ |
| 3.3.5 | Empty state si aucune application | MOYENNE | ⬜ |

### 3.4 — License Overview

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 3.4.1 | Fix `license-overview.tsx` | HAUTE | ⬜ |
| 3.4.2 | Afficher licences actives avec date d'expiration | HAUTE | ⬜ |
| 3.4.3 | Warning si expiration proche (< 30 jours) | HAUTE | ⬜ |
| 3.4.4 | Lien "Gérer les licences" | HAUTE | ⬜ |

### 3.5 — Recent Activity

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 3.5.1 | Fix `recent-activity.tsx` | HAUTE | ⬜ |
| 3.5.2 | Lister les 10 dernières activités | HAUTE | ⬜ |
| 3.5.3 | Icônes par type d'activité (login, update, invite, etc.) | MOYENNE | ⬜ |
| 3.5.4 | Timestamp relatif (il y a 5 min, hier, etc.) | HAUTE | ⬜ |
| 3.5.5 | Lien "Voir tout l'historique" | MOYENNE | ⬜ |

### 3.6 — Notifications Panel

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 3.6.1 | Fix `notifications-panel.tsx` | HAUTE | ⬜ |
| 3.6.2 | Afficher 5 dernières notifications | HAUTE | ⬜ |
| 3.6.3 | Badge non-lues | HAUTE | ⬜ |
| 3.6.4 | Action "Marquer comme lu" | HAUTE | ⬜ |
| 3.6.5 | Lien "Voir toutes les notifications" | HAUTE | ⬜ |

### 3.7 — Security Overview

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 3.7.1 | Fix `security-overview.tsx` | HAUTE | ⬜ |
| 3.7.2 | Afficher sessions actives | HAUTE | ⬜ |
| 3.7.3 | Afficher statut MFA | HAUTE | ⬜ |
| 3.7.4 | Lien "Gérer la sécurité" | HAUTE | ⬜ |

**Livrable** : Dashboard moderne, responsive, avec toutes les overview cards.

---

## PHASE 4 — PROFIL & ORGANISATIONS

**Objectif** : Gestion du profil utilisateur et des organisations.

### 4.1 — Profil Utilisateur

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 4.1.1 | Page `/settings/profile` — afficher profil | HAUTE | ⬜ |
| 4.1.2 | Formulaire nom, email, avatar | HAUTE | ⬜ |
| 4.1.3 | Upload avatar (si supporté par Core) | BASSE | ⬜ |
| 4.1.4 | Modifier le profil (PUT via SDK) | HAUTE | ⬜ |
| 4.1.5 | Schéma Zod validation | HAUTE | ⬜ |
| 4.1.6 | Success/error feedback (toast) | HAUTE | ⬜ |
| 4.1.7 | Supprimer compte (danger zone) | BASSE | ⬜ |

### 4.2 — Organizations — Liste

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 4.2.1 | Page `/organizations` | HAUTE | ⬜ |
| 4.2.2 | Lister les organisations de l'utilisateur | HAUTE | ⬜ |
| 4.2.3 | Card par organisation (nom, plan, membres, statut) | HAUTE | ⬜ |
| 4.2.4 | Organization actuelle highlight | HAUTE | ⬜ |
| 4.2.5 | Empty state si aucune organisation | HAUTE | ⬜ |
| 4.2.6 | Loading skeleton | HAUTE | ⬜ |

### 4.3 — Organizations — Création

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 4.3.1 | Dialog création (`create-organization-dialog.tsx`) | HAUTE | ⬜ |
| 4.3.2 | Formulaire : nom, plan (free/pro/enterprise) | HAUTE | ⬜ |
| 4.3.3 | Schéma Zod | HAUTE | ⬜ |
| 4.3.4 | POST via `organizationApi.create()` | HAUTE | ⬜ |
| 4.3.5 | Rafraîchir la liste après création | HAUTE | ⬜ |
| 4.3.6 | Sélectionner automatiquement la nouvelle org | MOYENNE | ⬜ |

### 4.4 — Organizations — Détail

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 4.4.1 | Page `/organizations/[id]` | HAUTE | ⬜ |
| 4.4.2 | Informations générales (nom, plan, date création) | HAUTE | ⬜ |
| 4.4.3 | Modifier l'organisation | HAUTE | ⬜ |
| 4.4.4 | Supprimer l'organisation (danger zone) | MOYENNE | ⬜ |

### 4.5 — Membres

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 4.5.1 | Section membres dans `/organizations/[id]` | HAUTE | ⬜ |
| 4.5.2 | Lister les membres avec rôles | HAUTE | ⬜ |
| 4.5.3 | Inviter un membre (email + rôle) | HAUTE | ⬜ |
| 4.5.4 | Modifier le rôle d'un membre | HAUTE | ⬜ |
| 4.5.5 | Retirer un membre | MOYENNE | ⬜ |
| 4.5.6 | Table responsive (cards sur mobile) | HAUTE | ⬜ |

### 4.6 — Invitations

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 4.6.1 | Section invitations en attente | HAUTE | ⬜ |
| 4.6.2 | Annuler une invitation | MOYENNE | ⬜ |
| 4.6.3 | Renvoyer une invitation | MOYENNE | ⬜ |

### 4.7 — Rôles & Permissions

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 4.7.1 | Afficher les rôles disponibles (owner, admin, member, viewer) | HAUTE | ⬜ |
| 4.7.2 | Afficher les permissions par rôle | MOYENNE | ⬜ |
| 4.7.3 | Sélecteur de rôle dans invitation | HAUTE | ⬜ |

### 4.8 — Équipes

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 4.8.1 | Section équipes (si supporté par Core) | MOYENNE | ⬜ |
| 4.8.2 | Créer une équipe | MOYENNE | ⬜ |
| 4.8.3 | Assigner des membres à une équipe | MOYENNE | ⬜ |

### 4.9 — Organization Switcher

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 4.9.1 | Switcher dans le sidebar/header | HAUTE | ⬜ |
| 4.9.2 | Changer d'organisation → recharger les données | HAUTE | ⬜ |
| 4.9.3 | Stocker l'org active dans un cookie + zustand | HAUTE | ⬜ |
| 4.9.4 | Afficher l'org active partout dans l'UI | HAUTE | ⬜ |

**Livrable** : Profil complet, organisations CRUD, membres, invitations, switcher.

---

## PHASE 5 — APPLICATIONS

**Objectif** : Voir, installer, gérer les applications de l'écosystème.

### 5.1 — Applications Page

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 5.1.1 | Page `/applications` | HAUTE | ⬜ |
| 5.1.2 | Onglets : Disponibles / Installées / Connectées | HAUTE | ⬜ |
| 5.1.3 | Loading skeleton | HAUTE | ⬜ |
| 5.1.4 | Empty state par onglet | HAUTE | ⬜ |
| 5.1.5 | Error boundary | HAUTE | ⬜ |

### 5.2 — Applications Disponibles

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 5.2.1 | Grille/cards des applications disponibles | HAUTE | ⬜ |
| 5.2.2 | Icône, nom, description, développeur | HAUTE | ⬜ |
| 5.2.3 | Badge catégorie | MOYENNE | ⬜ |
| 5.2.4 | Bouton "Installer" | HAUTE | ⬜ |
| 5.2.5 | Lien vers la page détail | HAUTE | ⬜ |

### 5.3 — Applications Installées

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 5.3.1 | Table/cards des applications installées | HAUTE | ⬜ |
| 5.3.2 | Statut (active, inactive, error) | HAUTE | ⬜ |
| 5.3.3 | Version installée | HAUTE | ⬜ |
| 5.3.4 | Dernière utilisation | MOYENNE | ⬜ |
| 5.3.5 | Bouton "Désinstaller" | HAUTE | ⬜ |
| 5.3.6 | Bouton "Ouvrir" (lien vers l'app) | HAUTE | ⬜ |

### 5.4 — Applications Connectées

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 5.4.1 | Liste des apps connectées via API keys | HAUTE | ⬜ |
| 5.4.2 | Dernière synchronisation | MOYENNE | ⬜ |
| 5.4.3 | Bouton "Déconnecter" | HAUTE | ⬜ |

### 5.5 — Application Detail

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 5.5.1 | Page `/applications/[id]` | HAUTE | ⬜ |
| 5.5.2 | Informations complètes | HAUTE | ⬜ |
| 5.5.3 | Statut, version, licence associée | HAUTE | ⬜ |
| 5.5.4 | Actions (installer, désinstaller, ouvrir) | HAUTE | ⬜ |
| 5.5.5 | Historique d'activité de l'app | BASSE | ⬜ |

### 5.6 — Applications Table (Desktop)

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 5.6.1 | Fix `applications-table.tsx` — table responsive | HAUTE | ⬜ |
| 5.6.2 | Colonnes : Nom, Statut, Version, Abonnement, Licence, Actions | HAUTE | ⬜ |
| 5.6.3 | Tri par colonnes | MOYENNE | ⬜ |
| 5.6.4 | Recherche/filtre | MOYENNE | ⬜ |
| 5.6.5 | Mobile : transformer en cards | HAUTE | ⬜ |

**Livrable** : Section applications complète avec install/uninstall, statut, détails.

---

## PHASE 6 — LICENCES

**Objectif** : Gestion des licences, abonnements, renouvellement.

### 6.1 — Licenses Page

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 6.1.1 | Page `/licenses` | HAUTE | ⬜ |
| 6.1.2 | Onglets : Actives / Expirées / Toutes | HAUTE | ⬜ |
| 6.1.3 | Loading skeleton | HAUTE | ⬜ |
| 6.1.4 | Empty state | HAUTE | ⬜ |

### 6.2 — Licenses Table

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 6.2.1 | Fix `licenses-table.tsx` | HAUTE | ⬜ |
| 6.2.2 | Colonnes : Application, Plan, Statut, Expiration, Actions | HAUTE | ⬜ |
| 6.2.3 | Badge statut (active, expiring, expired, suspended) | HAUTE | ⬜ |
| 6.2.4 | Warning expiration proche | HAUTE | ⬜ |
| 6.2.5 | Mobile : cards | HAUTE | ⬜ |

### 6.3 — License Actions

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 6.3.1 | Activer une licence | HAUTE | ⬜ |
| 6.3.2 | Renouveler une licence | HAUTE | ⬜ |
| 6.3.3 | Voir les fonctionnalités incluses | MOYENNE | ⬜ |
| 6.3.4 | Changer de plan | MOYENNE | ⬜ |

### 6.4 — License Detail

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 6.4.1 | Page `/licenses/[id]` | HAUTE | ⬜ |
| 6.4.2 | Informations complètes (plan, dates, features) | HAUTE | ⬜ |
| 6.4.3 | Historique de facturation | BASSE | ⬜ |
| 6.4.4 | Actions (renouveler, annuler) | HAUTE | ⬜ |

**Livrable** : Gestion complète des licences avec activation, renouvellement, statuts.

---

## PHASE 7 — SÉCURITÉ

**Objectif** : Sessions, appareils, MFA, historique, événements.

### 7.1 — Security Page

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 7.1.1 | Page `/security` | HAUTE | ⬜ |
| 7.1.2 | Layout avec sections (sessions, MFA, password, events) | HAUTE | ⬜ |
| 7.1.3 | Loading states | HAUTE | ⬜ |

### 7.2 — Sessions

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 7.2.1 | Fix `sessions-list.tsx` | HAUTE | ⬜ |
| 7.2.2 | Lister les sessions actives | HAUTE | ⬜ |
| 7.2.3 | Afficher : appareil, navigateur, IP, dernière activité | HAUTE | ⬜ |
| 7.2.4 | Session actuelle highlight | HAUTE | ⬜ |
| 7.2.5 | Révoquer une session | HAUTE | ⬜ |
| 7.2.6 | Révoquer toutes les sessions sauf courante | MOYENNE | ⬜ |

### 7.3 — Appareils

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 7.3.1 | Lister les appareils enregistrés | HAUTE | ⬜ |
| 7.3.2 | Afficher : nom, OS, dernier accès | HAUTE | ⬜ |
| 7.3.3 | Révoquer un appareil | HAUTE | ⬜ |

### 7.4 — MFA (Multi-Factor Authentication)

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 7.4.1 | Fix `mfa-section.tsx` | HAUTE | ⬜ |
| 7.4.2 | Afficher statut MFA (activé/désactivé) | HAUTE | ⬜ |
| 7.4.3 | Activer MFA (QR code + code de vérification) | HAUTE | ⬜ |
| 7.4.4 | Désactiver MFA | MOYENNE | ⬜ |
| 7.4.5 | Codes de récupération | MOYENNE | ⬜ |

### 7.5 — Changement de Mot de Passe

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 7.5.1 | Fix `password-section.tsx` | HAUTE | ⬜ |
| 7.5.2 | Formulaire : mot de passe actuel + nouveau + confirmation | HAUTE | ⬜ |
| 7.5.3 | Schéma Zod (min 8, majuscule, chiffre, spécial) | HAUTE | ⬜ |
| 7.5.4 | POST via `securityApi.changePassword()` | HAUTE | ⬜ |
| 7.5.5 | Déconnexion des autres sessions après changement | MOYENNE | ⬜ |

### 7.6 — Historique de Connexion

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 7.6.1 | Fix `security-events.tsx` | HAUTE | ⬜ |
| 7.6.2 | Lister les événements de sécurité | HAUTE | ⬜ |
| 7.6.3 | Types : login, logout, password_change, mfa_enable, session_revoke | HAUTE | ⬜ |
| 7.6.4 | Timestamp + IP + appareil | HAUTE | ⬜ |
| 7.6.5 | Pagination | MOYENNE | ⬜ |

### 7.7 — Événements de Sécurité

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 7.7.1 | Alertes (tentatives de connexion échouées) | MOYENNE | ⬜ |
| 7.7.2 | Notifications d'activité suspecte | BASSE | ⬜ |

**Livrable** : Section sécurité complète avec sessions, MFA, password, historique.

---

## PHASE 8 — NOTIFICATIONS

**Objectif** : Système de notifications in-app avec préférences.

### 8.1 — Notifications Page

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 8.1.1 | Page `/notifications` | HAUTE | ⬜ |
| 8.1.2 | Onglets : Toutes / Non lues / Importantes | HAUTE | ⬜ |
| 8.1.3 | Loading skeleton | HAUTE | ⬜ |
| 8.1.4 | Empty state | HAUTE | ⬜ |

### 8.2 — Notifications List

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 8.2.1 | Fix `notifications-list.tsx` | HAUTE | ⬜ |
| 8.2.2 | Lister les notifications | HAUTE | ⬜ |
| 8.2.3 | Badge non-lues | HAUTE | ⬜ |
| 8.2.4 | Icône par type (info, warning, success, error) | HAUTE | ⬜ |
| 8.2.5 | Timestamp relatif | HAUTE | ⬜ |
| 8.2.6 | Action "Marquer comme lu" | HAUTE | ⬜ |
| 8.2.7 | Action "Marquer toutes comme lues" | HAUTE | ⬜ |
| 8.2.8 | Supprimer une notification | MOYENNE | ⬜ |
| 8.2.9 | Infinite scroll ou pagination | MOYENNE | ⬜ |

### 8.3 — Notification Preferences

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 8.3.1 | Fix `notification-preferences.tsx` | HAUTE | ⬜ |
| 8.3.2 | Toggle email notifications | HAUTE | ⬜ |
| 8.3.3 | Toggle push notifications | HAUTE | ⬜ |
| 8.3.4 | Toggle SMS notifications | MOYENNE | ⬜ |
| 8.3.5 | Préférences par type d'événement | MOYENNE | ⬜ |
| 8.3.6 | Sauvegarder via `notificationApi.updatePreferences()` | HAUTE | ⬜ |

### 8.4 — Notification Bell (Header)

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 8.4.1 | Badge count sur l'icône | HAUTE | ⬜ |
| 8.4.2 | Dropdown avec 5 dernières notifications | HAUTE | ⬜ |
| 8.4.3 | Lien "Voir toutes les notifications" | HAUTE | ⬜ |
| 8.4.4 | Real-time polling (30s) ou WebSocket (si Core supporte) | BASSE | ⬜ |

**Livrable** : Système de notifications complet avec préférences.

---

## PHASE 9 — API KEYS / DEVELOPERS

**Objectif** : Gestion des clés API pour les développeurs.

### 9.1 — API Keys Page

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 9.1.1 | Page `/developers/api-keys` | HAUTE | ⬜ |
| 9.1.2 | Description de la section | HAUTE | ⬜ |
| 9.1.3 | Bouton "Créer une clé API" | HAUTE | ⬜ |

### 9.2 — API Keys List

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 9.2.1 | Fix `api-keys-list.tsx` | HAUTE | ⬜ |
| 9.2.2 | Lister les clés API | HAUTE | ⬜ |
| 9.2.3 | Afficher : nom, créée le, dernière utilisation, statut | HAUTE | ⬜ |
| 9.2.4 | Masquer la clé secrète (afficher seulement `wt_...****`) | CRITIQUE | ⬜ |
| 9.2.5 | Bouton "Révoquer" | HAUTE | ⬜ |
| 9.2.6 | Confirmation avant révocation | HAUTE | ⬜ |
| 9.2.7 | Empty state si aucune clé | HAUTE | ⬜ |

### 9.3 — Create API Key Dialog

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 9.3.1 | Fix `create-api-key-dialog.tsx` | HAUTE | ⬜ |
| 9.3.2 | Formulaire : nom de la clé | HAUTE | ⬜ |
| 9.3.3 | POST via `apiKeyApi.create()` | HAUTE | ⬜ |
| 9.3.4 | Afficher la clé secrète UNE SEULE FOIS à la création | CRITIQUE | ⬜ |
| 9.3.5 | Bouton "Copier" pour la clé | HAUTE | ⬜ |
| 9.3.6 | Avertissement : "Vous ne pourrez plus voir cette clé" | HAUTE | ⬜ |
| 9.3.7 | Fermer le dialog → la clé disparaît | CRITIQUE | ⬜ |

### 9.4 — Sécurité des Clés

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 9.4.1 | Jamais afficher la clé complète après création | CRITIQUE | ⬜ |
| 9.4.2 | Afficher seulement les 4 derniers caractères | CRITIQUE | ⬜ |
| 9.4.3 | Copier dans le presse-papier | HAUTE | ⬜ |
| 9.4.4 | Rate limit sur la création de clés | MOYENNE | ⬜ |

**Livrable** : Gestion sécurisée des clés API.

---

## PHASE 10 — SETTINGS

**Objectif** : Page de paramètres complète avec sections.

### 10.1 — Settings Layout

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 10.1.1 | Page `/settings` avec sous-routes | HAUTE | ⬜ |
| 10.1.2 | Navigation latérale (profil, org, sécurité, notifications, préférences) | HAUTE | ⬜ |
| 10.1.3 | Mobile : tabs ou accordion | HAUTE | ⬜ |

### 10.2 — Profile Settings

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 10.2.1 | Fix `profile-settings.tsx` | HAUTE | ⬜ |
| 10.2.2 | Formulaire profil (nom, email, avatar) | HAUTE | ⬜ |
| 10.2.3 | Sauvegarder via SDK | HAUTE | ⬜ |

### 10.3 — Organization Settings

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 10.3.1 | Fix `organization-settings.tsx` | HAUTE | ⬜ |
| 10.3.2 | Informations organisation (nom, plan) | HAUTE | ⬜ |
| 10.3.3 | Modifier l'organisation | HAUTE | ⬜ |
| 10.3.4 | Danger zone : supprimer | MOYENNE | ⬜ |

### 10.4 — Security Settings

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 10.4.1 | Fix `security-settings.tsx` | HAUTE | ⬜ |
| 10.4.2 | Résumé sécurité (MFA, sessions, dernières activités) | HAUTE | ⬜ |
| 10.4.3 | Lien vers `/security` pour détails | HAUTE | ⬜ |

### 10.5 — Notifications Settings

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 10.5.1 | Fix `notifications-settings.tsx` | HAUTE | ⬜ |
| 10.5.2 | Préférences de notification | HAUTE | ⬜ |

### 10.6 — Preferences Settings

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 10.6.1 | Fix `preferences-settings.tsx` | HAUTE | ⬜ |
| 10.6.2 | Thème (light/dark/system) | HAUTE | ⬜ |
| 10.6.3 | Langue (fr/en/sw/ln) | MOYENNE | ⬜ |
| 10.6.4 | Fuseau horaire | BASSE | ⬜ |
| 10.6.5 | Density (compact/comfortable) | BASSE | ⬜ |

**Livrable** : Settings complet avec toutes les sections.

---

## PHASE 11 — ERROR HANDLING & STATES

**Objectif** : Gestion robuste de tous les états d'erreur.

### 11.1 — Error States

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 11.1.1 | Composant `ErrorState` réutilisable | HAUTE | ⬜ |
| 11.1.2 | Composant `LoadingState` réutilisable | HAUTE | ⬜ |
| 11.1.3 | Composant `EmptyState` (utiliser @wabtechs/ui) | HAUTE | ⬜ |
| 11.1.4 | Composant `OfflineState` | MOYENNE | ⬜ |
| 11.1.5 | Composant `ApiUnavailableState` | MOYENNE | ⬜ |
| 11.1.6 | Composant `SessionExpiredState` | HAUTE | ⬜ |
| 11.1.7 | Composant `PermissionDeniedState` | HAUTE | ⬜ |
| 11.1.8 | Composant `RateLimitState` | MOYENNE | ⬜ |

### 11.2 — Error Boundaries

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 11.2.1 | Root error boundary (`src/app/error.tsx`) | HAUTE | ⬜ |
| 11.2.2 | Dashboard error boundary | HAUTE | ⬜ |
| 11.2.3 | Chaque section a son error boundary | MOYENNE | ⬜ |
| 11.2.4 | Retry automatique (1 fois) | MOYENNE | ⬜ |
| 11.2.5 | Bouton retry manuel | HAUTE | ⬜ |

### 11.3 — Loading States

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 11.3.1 | Skeleton pages (utiliser @wabtechs/ui Skeleton variants) | HAUTE | ⬜ |
| 11.3.2 | Suspense boundaries pour Server Components | HAUTE | ⬜ |
| 11.3.3 | Streaming avec loading.tsx par route | MOYENNE | ⬜ |

### 11.4 — Offline Detection

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 11.4.1 | Détecter `navigator.onLine` | MOYENNE | ⬜ |
| 11.4.2 | Afficher bannière offline | MOYENNE | ⬜ |
| 11.4.3 | Queue des actions pendant offline | BASSE | ⬜ |

**Livrable** : Tous les états gérés, aucune interface cassée.

---

## PHASE 12 — RESPONSIVE & MOBILE

**Objectif** : Expérience mobile parfaite.

### 12.1 — Mobile Navigation

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 12.1.1 | Sidebar → drawer mobile | HAUTE | ⬜ |
| 12.1.2 | Bottom navigation bar (si pertinent) | BASSE | ⬜ |
| 12.1.3 | Swipe pour ouvrir/fermer sidebar | BASSE | ⬜ |

### 12.2 — Tables Responsive

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 12.2.1 | Applications table → cards sur mobile | HAUTE | ⬜ |
| 12.2.2 | Licenses table → cards sur mobile | HAUTE | ⬜ |
| 12.2.3 | Members table → cards sur mobile | HAUTE | ⬜ |
| 12.2.4 | Sessions table → cards sur mobile | HAUTE | ⬜ |
| 12.2.5 | API Keys table → cards sur mobile | HAUTE | ⬜ |

### 12.3 — Forms Mobile

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 12.3.1 | Inputs pleine largeur sur mobile | HAUTE | ⬜ |
| 12.3.2 | Buttons pleine largeur sur mobile | HAUTE | ⬜ |
| 12.3.3 | Dialogs → sheets sur mobile | MOYENNE | ⬜ |

### 12.4 — Touch Interactions

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 12.4.1 | Tap targets minimum 44px | HAUTE | ⬜ |
| 12.4.2 | Pas de hover-dependent interactions | HAUTE | ⬜ |
| 12.4.3 | Scroll smooth | MOYENNE | ⬜ |

**Livrable** : Application 100% responsive mobile/tablet/desktop.

---

## PHASE 13 — PERFORMANCE

**Objectif** : Application rapide et optimisée.

### 13.1 — Server Components

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 13.1.1 | Pages statiques en Server Components | HAUTE | ⬜ |
| 13.1.2 | Client Components uniquement quand nécessaire | HAUTE | ⬜ |
| 13.1.3 | `'use client'` uniquement sur les composants interactifs | HAUTE | ⬜ |

### 13.2 — Streaming

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 13.2.1 | `loading.tsx` par route | MOYENNE | ⬜ |
| 13.2.2 | Suspense boundaries | MOYENNE | ⬜ |
| 13.2.3 | Progressive rendering | BASSE | ⬜ |

### 13.3 — Caching

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 13.3.1 | TanStack Query cache config | HAUTE | ⬜ |
| 13.3.2 | Stale-while-revalidate | HAUTE | ⬜ |
| 13.3.3 | Cache invalidation sur mutation | HAUTE | ⬜ |

### 13.4 — Bundle Size

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 13.4.1 | Dynamic imports pour lourdes dependencies | MOYENNE | ⬜ |
| 13.4.2 | Tree shaking @wabtechs/ui | MOYENNE | ⬜ |
| 13.4.3 | Analyzer bundle (@next/bundle-analyzer) | BASSE | ⬜ |

### 13.5 — Images

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 13.5.1 | `next/image` pour toutes les images | HAUTE | ⬜ |
| 13.5.2 | Lazy loading par défaut | HAUTE | ⬜ |
| 13.5.3 | WebP/AVIF formats | MOYENNE | ⬜ |

### 13.6 — Core Web Vitals

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 13.6.1 | LCP < 2.5s | HAUTE | ⬜ |
| 13.6.2 | FID < 100ms | HAUTE | ⬜ |
| 13.6.3 | CLS < 0.1 | HAUTE | ⬜ |
| 13.6.4 | TTFB < 600ms | MOYENNE | ⬜ |

**Livrable** : Application performante, scores Lighthouse > 90.

---

## PHASE 14 — OBSERVABILITY

**Objectif** : Tracking, logging, monitoring.

### 14.1 — Error Tracking

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 14.1.1 | Intégrer Sentry (ou alternatif) | MOYENNE | ⬜ |
| 14.1.2 | Capturer les erreurs non gérées | MOYENNE | ⬜ |
| 14.1.3 | Contexte utilisateur dans les erreurs | BASSE | ⬜ |

### 14.2 — Structured Logging

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 14.2.1 | Client logger structuré | MOYENNE | ⬜ |
| 14.2.2 | Logs d'erreurs API | HAUTE | ⬜ |
| 14.2.3 | Logs d'actions utilisateur | BASSE | ⬜ |

### 14.3 — Performance Monitoring

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 14.3.1 | Web Vitals reporting | MOYENNE | ⬜ |
| 14.3.2 | API response time tracking | MOYENNE | ⬜ |

### 14.4 — Request Correlation

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 14.4.1 | X-Request-Id dans chaque requête | HAUTE | ⬜ |
| 14.4.2 | Corréler les erreurs côté client avec Core | MOYENNE | ⬜ |

**Livrable** : Observabilité complète, debugging facilité.

---

## PHASE 15 — TESTS

**Objectif** : Couverture de test complète.

### 15.1 — Unit Tests (Vitest)

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 15.1.1 | SDK : Auth.login, Auth.me, Auth.logout, Auth.refresh | HAUTE | ⬜ |
| 15.1.2 | SDK : safeApiData, getApiClient | HAUTE | ⬜ |
| 15.1.3 | Utils : formatDate, formatDuration, formatNumber, cn | HAUTE | ⬜ |
| 15.1.4 | Schemas Zod : login, profile, organization, apiKey | HAUTE | ⬜ |
| 15.1.5 | Store : useAuthStore actions | HAUTE | ⬜ |

### 15.2 — Component Tests (Vitest + Testing Library)

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 15.2.1 | LoginForm — rendu, validation, soumission | HAUTE | ⬜ |
| 15.2.2 | DashboardStats — affichage des stats | HAUTE | ⬜ |
| 15.2.3 | Sidebar — navigation, état actif | HAUTE | ⬜ |
| 15.2.4 | Header — user menu, notifications | HAUTE | ⬜ |
| 15.2.5 | ApplicationsTable — rendu, filtres | HAUTE | ⬜ |
| 15.2.6 | LicensesTable — rendu, statuts | HAUTE | ⬜ |
| 15.2.7 | CreateOrganizationDialog — formulaire, soumission | HAUTE | ⬜ |
| 15.2.8 | CreateApiKeyDialog — formulaire, affichage clé | HAUTE | ⬜ |
| 15.2.9 | SessionsList — rendu, révocation | HAUTE | ⬜ |
| 15.2.10 | NotificationsList — rendu, marquer lu | HAUTE | ⬜ |

### 15.3 — Integration Tests (Vitest)

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 15.3.1 | Login flow complet (form → SDK → store → redirect) | HAUTE | ⬜ |
| 15.3.2 | Organization switcher (select → reload → update UI) | HAUTE | ⬜ |
| 15.3.3 | API key creation (form → SDK → display key → close) | HAUTE | ⬜ |
| 15.3.4 | Session management (init → expire → refresh → redirect) | HAUTE | ⬜ |

### 15.4 — E2E Tests (Playwright)

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 15.4.1 | Login → Dashboard (happy path) | HAUTE | ⬜ |
| 15.4.2 | Login → mauvais mot de passe → erreur | HAUTE | ⬜ |
| 15.4.3 | Session expired → redirect login | HAUTE | ⬜ |
| 15.4.4 | Organization switcher → données changent | HAUTE | ⬜ |
| 15.4.5 | Créer une organisation | HAUTE | ⬜ |
| 15.4.6 | Installer une application | HAUTE | ⬜ |
| 15.4.7 | Activer une licence | HAUTE | ⬜ |
| 15.4.8 | Activer MFA | HAUTE | ⬜ |
| 15.4.9 | Créer une API key → copier → révoquer | HAUTE | ⬜ |
| 15.4.10 | Navigation complète (sidebar → toutes les pages) | HAUTE | ⬜ |
| 15.4.11 | Responsive mobile (viewport 375px) | MOYENNE | ⬜ |
| 15.4.12 | Responsive tablet (viewport 768px) | MOYENNE | ⬜ |

### 15.5 — Accessibilité Tests

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 15.5.1 | axe-core sur toutes les pages | MOYENNE | ⬜ |
| 15.5.2 | Navigation au clavier | HAUTE | ⬜ |
| 15.5.3 | Screen reader testing | BASSE | ⬜ |
| 15.5.4 | Color contrast WCAG AA | HAUTE | ⬜ |

**Livrable** : Tests unitaires, composants, intégration, E2E, accessibilité.

---

## PHASE 16 — PRODUCTION & DÉPLOIEMENT

**Objectif** : Préparer le déploiement sur cloud.wabtechs.com.

### 16.1 — Configuration Production

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 16.1.1 | `next.config.mjs` — security headers complets | HAUTE | ⬜ |
| 16.1.2 | Variables d'environnement validées | HAUTE | ⬜ |
| 16.1.3 | `.env.production` configuré | HAUTE | ⬜ |
| 16.1.4 | CSP (Content Security Policy) | MOYENNE | ⬜ |
| 16.1.5 | HSTS | MOYENNE | ⬜ |

### 16.2 — Docker

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 16.2.1 | `Dockerfile` multi-stage | MOYENNE | ⬜ |
| 16.2.2 | `.dockerignore` | MOYENNE | ⬜ |
| 16.2.3 | `docker-compose.yml` (dev) | BASSE | ⬜ |

### 16.3 — Vercel / Deployment

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 16.3.1 | `vercel.json` configuré | HAUTE | ⬜ |
| 16.3.2 | Domaine cloud.wabtechs.com configuré | HAUTE | ⬜ |
| 16.3.3 | Environment variables dans Vercel | HAUTE | ⬜ |
| 16.3.4 | Preview deployments pour PRs | MOYENNE | ⬜ |

### 16.4 — CI/CD

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 16.4.1 | GitHub Actions workflow | HAUTE | ⬜ |
| 16.4.2 | Lint + typecheck + test au CI | HAUTE | ⬜ |
| 16.4.3 | Build verification | HAUTE | ⬜ |
| 16.4.4 | Auto-deploy sur main | HAUTE | ⬜ |

### 16.5 — Monitoring Post-Déploiement

| # | Tâche | Priorité | Statut |
|---|---|---|---|
| 16.5.1 | Uptime monitoring | MOYENNE | ⬜ |
| 16.5.2 | Error rate alerting | MOYENNE | ⬜ |
| 16.5.3 | Performance monitoring | MOYENNE | ⬜ |

**Livrable** : Application déployée, monitorée, production-ready.

---

## MATRICE DE DÉPENDANCES

```
Phase 0 (Foundation)
    │
    ├──► Phase 1 (Shell + Navigation)
    │        │
    │        └──► Phase 2 (Authentication)
    │                 │
    │                 ├──► Phase 3 (Dashboard)
    │                 │
    │                 ├──► Phase 4 (Profile + Organizations)
    │                 │
    │                 ├──► Phase 5 (Applications)
    │                 │
    │                 ├──► Phase 6 (Licenses)
    │                 │
    │                 ├──► Phase 7 (Security)
    │                 │
    │                 ├──► Phase 8 (Notifications)
    │                 │
    │                 ├──► Phase 9 (API Keys)
    │                 │
    │                 └──► Phase 10 (Settings)
    │
    ├──► Phase 11 (Error Handling) — peut démarrer après Phase 2
    │
    ├──► Phase 12 (Responsive) — peut démarrer après Phase 1
    │
    ├──► Phase 13 (Performance) — peut démarrer après Phase 3
    │
    ├──► Phase 14 (Observability) — peut démarrer après Phase 2
    │
    ├──► Phase 15 (Tests) — peut démarrer après Phase 2
    │
    └──► Phase 16 (Production) — dernière phase
```

---

## ESTIMATION D'EFFORT

| Phase | Complexité | Fichiers | Effort estimé |
|---|---|---|---|
| Phase 0 — Foundation | Élevée | ~45 | 2-3 jours |
| Phase 1 — Shell | Moyenne | ~6 | 1-2 jours |
| Phase 2 — Auth | Élevée | ~10 | 2-3 jours |
| Phase 3 — Dashboard | Moyenne | ~8 | 1-2 jours |
| Phase 4 — Profile + Org | Élevée | ~12 | 2-3 jours |
| Phase 5 — Applications | Moyenne | ~8 | 1-2 jours |
| Phase 6 — Licenses | Moyenne | ~6 | 1 jour |
| Phase 7 — Security | Élevée | ~8 | 2 jours |
| Phase 8 — Notifications | Moyenne | ~6 | 1 jour |
| Phase 9 — API Keys | Faible | ~4 | 0.5 jour |
| Phase 10 — Settings | Moyenne | ~8 | 1 jour |
| Phase 11 — Error Handling | Moyenne | ~10 | 1-2 jours |
| Phase 12 — Responsive | Moyenne | ~15 | 1-2 jours |
| Phase 13 — Performance | Moyenne | ~10 | 1-2 jours |
| Phase 14 — Observability | Faible | ~5 | 0.5 jour |
| Phase 15 — Tests | Élevée | ~30 | 3-4 jours |
| Phase 16 — Production | Moyenne | ~8 | 1-2 jours |
| **TOTAL** | | **~200** | **20-30 jours** |

---

## RÈGLES ABSOLUES

1. **Cloud ≠ Core** — Cloud ne jamais implémenter de logique métier backend
2. **Cloud ≠ Apps** — Bilengi, Dhayaro, SYRCOW, Santé Connect, Archivium gèrent leur propre métier
3. **@wabtechs/ui exclusivement** — Pas de deuxième Design System
4. **@wabtechs/sdk exclusivement** — Pas d'appels HTTP directs depuis les composants
5. **Permissions = UX** — Les permissions UI sont indicatives, Core valide l'autorisation réelle
6. **Pas de secrets côté client** — Tokens en httpOnly cookies, jamais dans localStorage
7. **Core = source de vérité** — Session, auth, données = toujours via Core
8. **Responsive d'abord** — Mobile first, pas de desktop-only
9. **TypeScript strict** — Zéro `any`, zéro type assertions inutiles
10. **Tests obligatoires** — Chaque feature critique a ses tests
