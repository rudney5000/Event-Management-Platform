# Eventra

A modern event management platform built with React, TypeScript, and FSD (Feature-Sliced Design) architecture.

## 🏗️ FSD (Feature-Sliced Design) Architecture

This project follows **Feature-Sliced Design** architecture, a methodology that organizes code into logical and independent layers:

```
src/
├── app/                    # App Layer - Global configuration
│   ├── router/            # Application routing
│   └── store/             # Redux store configuration
├── entities/              # Entities Layer - Reusable business logic
│   ├── chat/              # Chat entities, messages API (REST + types)
│   ├── event/
│   ├── registration/      # Event registration API (RTK Query)
│   ├── category/
│   ├── currency/
│   └── organizer/
├── features/              # Features Layer - User functionalities
│   ├── auth/              # Authentication
│   ├── event-chat/        # Real-time event chat (Socket.IO)
│   ├── event-side-panel/  # Admin preview: messages tab, participants
│   ├── registration/      # Customer registration form (modal)
│   └── like-event/        # Event likes
├── pages/                 # Pages Layer - Page components
│   ├── admin/             # Admin pages
│   ├── auth/              # Auth pages
│   └── customer/          # Customer pages
├── shared/                # Shared Layer - Shared code
│   ├── api/               # API configuration
│   ├── lib/               # Utilities
│   ├── ui/                # Generic UI components
│   └── config/            # Global configuration
└── widgets/               # Widgets Layer - Complex components
```

### 🎯 FSD Principles

- **Separation of Concerns** : Each layer has a well-defined role
- **Independence** : Features are independent and reusable
- **Scalability** : Architecture that evolves with complexity
- **Maintainability** : Organized and easy-to-maintain code

## 🛠️ Tech Stack

### Frontend Core
- **React 19** : UI library with modern hooks
- **TypeScript** : Static typing for code robustness
- **Vite** : Ultra-fast build tool for development
- **Ant Design** : Admin UI components (tables, forms, tabs)

### State Management
- **Redux Toolkit** : Simplified state management with RTK Query
- **Redux Persist** : Client-side data persistence
- **RTK Query** : API calls management with built-in cache

### Routing & Navigation
- **React Router 7** : Declarative routing with nested routes
- **Private routes** : Authentication-protected segments (`PrivateRoute`)

### UI & Styling
- **Tailwind CSS** : Utility-first CSS framework
- **Lucide React** : Modern and consistent icons

### Validation & Forms
- **Zod** : TypeScript-first schema validation
- **React Hook Form** : Performant forms with validation

### Backend Integration
- **JSON Server** : REST resources under `/api` (events, registrations, messages, etc.)
- **Custom Node server** : Auth routes, `POST /api/registrations` (emails + DB), Socket.IO
- **Socket.IO** : Real-time chat on the same origin as `VITE_API_URL`
- **Nodemailer** (backend) : Transactional email (Gmail or compatible SMTP)

## 📋 Features

### 🎭 Authentication
- Login/Register with validation
- JWT token management (simulated)
- Protected routes with PrivateRoute
- Session persistence with Redux Persist

### 👤 Administration
- Dashboard with statistics
- Event CRUD management
- Category management
- Currency management
- Organizer management
- Event preview
- City management

### 💬 Real-time chat (Socket.IO)
- **Per-event rooms** : Clients `join` with `eventId`; server replays **history** from `db.json`
- **Live messages** : `message` events broadcast to everyone in the room; messages persisted server-side
- **Typing indicator** : `typing` event with short-lived UI feedback for other participants
- **Read receipts** : `seen` syncs `seenBy` on messages and broadcasts updates
- **Optimistic UI** : Outgoing messages appear immediately, then reconcile when the server echoes
- **Authenticated users** : Chat hooks use the logged-in user (`userId` / display from session)
- **Admin replies** : `admin_reply` emits a highlighted message and can trigger **email** to a participant (see below)
- **Where it appears** : Floating chat on the events listing page; **Messages** tab in the admin event preview side panel

### ✉️ Email & notifications (backend)
Implemented in the **custom API** (see `api-server/server.js` in this repo as a reference to deploy next to `db.json`).

- **Event registration** (`POST /api/registrations`) : creates the registration, updates event participants and `availableSeats`, responds **immediately**, then sends emails **asynchronously** (avoids the client hanging on SMTP)
- **Participant** : confirmation email (free event); for **paid** events, confirmation plus a second email with **payment link** (`FRONTEND_URL`/payment/…)
- **Administrator** : optional **new registration** alert to `ADMIN_EMAIL` or to the **organizer** email resolved from `organizers` + `event.organizerId`
- **From admin chat** : `admin_reply` with `type` `payment` | `info` | `chat` sends the corresponding template to `userEmail`
- **Requirements** : `EMAIL_USER`, `EMAIL_PASS` (e.g. Gmail app password), `FRONTEND_URL`, and optionally `ADMIN_EMAIL`

### 🎫 Event registration (customer)
- **Modal form** : name, email, phone; supports **free** and **paid** events
- **API** : `POST /api/registrations` with `numberOfTickets` (client sends `1` by default)
- **Client timeout** : registration requests abort after **45s** so the UI does not spin forever if the API stalls
- **After success** : cache refresh via `getEventById.initiate` so seats and participants stay in sync (no duplicate PATCH when the backend already updates the event)

### 🎉 Customer experience
- Event listing with filters (category, price, city, sort, search)
- Event detail page with ticket card and **registration**
- Favorites / likes (persisted)
- Responsive layout

### 🧑‍💼 Administration (extra)
- Dashboard, CRUD for events, categories, currencies, organizers, cities
- **Event preview** : side panel with **Messages** (same chat stack as customers, plus admin reply) and **Participants**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the project
git clone https://github.com/rudney5000/Event-Management-Platform.git
cd Event-Management-Platform

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend configuration
1. **Data** : maintain `db.json` (`users`, `events`, `registrations`, `messages`, `organizers`, …). Add an `email` field on organizers if you rely on organizer-based admin notifications.

2. **Run the full stack** (recommended) : use the custom `server.js` (reference copy in `api-server/server.js`) so you get:
   - `POST /auth/login`, `POST /auth/register` (**user signup** — not event registration)
   - `POST /api/registrations` (**event** registration + emails)
   - `POST /auth/refresh`
   - JSON Server under `/api`
   - Socket.IO on the same HTTP server

3. **Deploy** (e.g. Render) : start command must run **this** Node app, not the `json-server` CLI alone, otherwise chat and mail logic will not run.

4. **Environment variables (API)** :
```env
PORT=3001
FRONTEND_URL=https://your-frontend.example.com
EMAIL_USER=your@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=you@example.com
```

5. **Frontend** :
```env
VITE_API_URL=https://your-api.example.com
```
The Socket.IO client connects to the same `VITE_API_URL` (websocket transport).

## 🏛️ Technical Architecture

### Authentication Flow
1. **LoginForm** → `useLoginMutation` → API Call
2. **API Response** → Redux Actions → State Update
3. **State Update** → PrivateRoute Validation → Navigation

### Data Management
- **RTK Query** : Automatic caching and synchronization
- **Redux Persist** : Auth slice whitelist (`user`, `accessToken`, `refreshToken`, `isAuthenticated`); likes slice persisted separately
- **Zod Validation** : API response validation

### Feature Structure
Each feature follows the FSD structure:
```
feature/
├── api/           # API calls (RTK Query)
├── model/         # Types, schemas, constants
├── slice/         # Redux slices
├── ui/            # Feature UI components
└── hooks/         # Custom hooks
```

## 🔧 Configuration

### Environment variables (frontend)
```env
VITE_API_URL=https://event-management-platform-api.onrender.com
```
Used for REST (RTK Query) and for the Socket.IO client (`VITE_API_URL`).

### Redux Configuration
- **SerializableCheck** : Disabled for redux-persist
- **Middleware** : RTK Query + persistence
- **DevTools** : Enabled in development

## 📦 Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # ESLint
```

## 🎯 Best Practices

### Code Organization
- **FSD Layers** : Strict layer adherence
- **Feature Independence** : Self-sufficient features
- **Type Safety** : TypeScript strict mode
- **Error Boundaries** : Error handling

### Performance
- **Code Splitting** : Lazy loading of routes
- **Memoization** : React.memo, useMemo, useCallback
- **Optimistic Updates** : Optimistic updates with RTK Query

### Security
- **Input Validation** : Zod for all inputs
- **Route Protection** : PrivateRoute with validation
- **Token Management** : Secure token storage

## 🔄 Development Workflow

1. **Create Feature** : `src/features/new-feature/`
2. **Define Types** : `model/types.ts`
3. **Implement API** : `api/newFeatureApi.ts`
4. **Create Slice** : `slice/newFeatureSlice.ts`
5. **Develop UI** : `ui/components/`
6. **Add Pages** : `pages/feature-page/`
7. **Configure Routes** : `app/router/router.tsx`

## 📚 Resources

- [FSD Documentation](https://feature-sliced.design/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)

---

**FSD Architecture • TypeScript • Modern React**
