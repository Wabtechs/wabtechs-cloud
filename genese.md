MISSION
======

Tu es Principal Frontend Architect, SaaS Product Architect, UI/UX Engineer
et Security Engineer.

Créer un nouveau projet :

wabtechs-cloud

Domaine cible :

https://cloud.wabtechs.com


OBJECTIF
========

Créer le portail officiel Wabtechs Cloud.

Wabtechs Cloud est l'interface centrale permettant aux utilisateurs,
organisations et administrateurs de gérer leur écosystème Wabtechs.

IMPORTANT :

Wabtechs Cloud n'est PAS Wabtechs Core.

Wabtechs Cloud est un frontend/web application.

Wabtechs Core fournit les APIs.


ARCHITECTURE
============

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


STACK
=====

Utiliser :

- Next.js
- React
- TypeScript strict
- Tailwind CSS
- @wabtechs/ui
- @wabtechs/sdk
- Zod
- React Hook Form
- TanStack Query
- Zustand uniquement lorsque nécessaire
- Vitest
- Playwright
- pnpm

Ne pas créer un deuxième Design System.

Utiliser exclusivement @wabtechs/ui pour les composants communs.


AUTHENTICATION
==============

L'authentification doit passer par Wabtechs Core.

Ne pas recréer un système d'authentification indépendant.

Utiliser :

@wabtechs/sdk


Exemple conceptuel :

Auth.login()
Auth.logout()
Auth.me()
Auth.session()


ORGANISATION
============

Le Cloud doit gérer :

- profil utilisateur
- organisations
- membres
- équipes
- rôles
- permissions


DASHBOARD
=========

Créer un dashboard moderne présentant :

- applications utilisées
- licences
- abonnements
- activité récente
- notifications
- sécurité
- organisation actuelle


APPLICATIONS
============

Créer une section :

Applications

Elle doit permettre de voir :

- applications disponibles
- applications installées
- applications connectées
- statut
- version
- abonnement
- licence


LICENCES
========

Créer :

/licenses

avec :

- licences actives
- licences expirées
- renouvellement
- activation
- plan
- fonctionnalités incluses


ORGANIZATIONS
=============

Créer :

/organizations

Fonctionnalités :

- créer organisation
- modifier organisation
- membres
- invitations
- rôles
- permissions
- équipes


SECURITY
========

Créer :

/security

avec :

- sessions
- appareils
- MFA
- historique de connexion
- événements de sécurité
- changement de mot de passe


NOTIFICATIONS
=============

Créer :

/notifications

avec :

- notifications
- préférences
- événements importants
- marquer comme lu


API KEYS
========

Prévoir :

/developers/api-keys

Permettre aux utilisateurs autorisés de :

- créer une API key
- révoquer une API key
- voir date de création
- voir dernière utilisation

Ne jamais afficher une clé secrète complète après sa création.


SETTINGS
========

Prévoir :

/settings/profile
/settings/organization
/settings/security
/settings/notifications
/settings/preferences


RESPONSIVE
==========

Cloud doit fonctionner parfaitement sur :

mobile
tablet
desktop

Sur mobile :

- sidebar adaptée
- navigation bottom/drawer si pertinent
- tables transformées intelligemment
- actions accessibles
- aucune interface horizontale inutilisable


DESIGN
======

Utiliser @wabtechs/ui.

Le résultat doit être :

- premium
- SaaS moderne
- professionnel
- cohérent
- rapide
- accessible

Inspirations architecturales possibles :

Vercel
Linear
Stripe
GitHub
Raycast

Mais ne jamais copier leur design.


PERFORMANCE
===========

Optimiser :

- Server Components lorsque pertinent
- streaming lorsque pertinent
- caching
- lazy loading
- images
- bundle size

Éviter les Client Components inutiles.


SECURITY
========

Ne jamais :

- exposer secrets
- stocker des tokens sensibles dans localStorage sans justification
- contourner Core
- faire confiance aux permissions côté client

Les permissions UI sont uniquement UX.

L'autorisation réelle doit être validée par Core.


ERROR HANDLING
==============

Prévoir :

- loading states
- empty states
- error states
- offline states
- API unavailable state
- session expired
- permission denied
- rate limit


OBSERVABILITY
=============

Prévoir :

- error tracking
- structured client logging
- performance monitoring
- request correlation lorsque supporté par Core


TESTS
=====

Créer :

- unit tests
- component tests
- integration tests
- E2E

Scénarios critiques :

login
logout
session expiration
organization switching
permissions
license
notifications
security


ROADMAP
=======

PHASE 0
Créer le projet + architecture.

PHASE 1
Shell + navigation + thème.

PHASE 2
Authentication.

PHASE 3
Dashboard.

PHASE 4
Profile + organization.

PHASE 5
Applications.

PHASE 6
Licenses.

PHASE 7
Security.

PHASE 8
Notifications.

PHASE 9
API keys / developers.

PHASE 10
Tests + performance + production.


DOMAIN
======

Préparer le déploiement :

cloud.wabtechs.com


IMPORTANT
=========

Ne jamais implémenter dans Cloud une logique métier qui appartient à :

Bilengi
Dhayaro
SYRCOW
Santé Connect
Archivium

Cloud gère l'écosystème.

Les applications gèrent leur propre métier.


LIVRABLE FINAL
==============

Produire :

- architecture Next.js
- UI avec @wabtechs/ui
- intégration @wabtechs/sdk
- routes
- layouts
- authentication
- dashboard
- organizations
- applications
- licenses
- security
- notifications
- settings
- tests
- documentation
- production deployment configuration