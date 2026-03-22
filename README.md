# Event Management Platform

A modern event management platform built with React, TypeScript, and FSD (Feature-Sliced Design) architecture.

## 🏗️ FSD (Feature-Sliced Design) Architecture

This project follows **Feature-Sliced Design** architecture, a methodology that organizes code into logical and independent layers:

```
src/
├── app/                    # App Layer - Global configuration
│   ├── router/            # Application routing
│   └── store/             # Redux store configuration
├── entities/              # Entities Layer - Reusable business logic
│   ├── event/
│   ├── category/
│   ├── currency/
│   └── organizer/
├── features/              # Features Layer - User functionalities
│   ├── auth/              # Authentication
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
- **React 18** : UI library with modern hooks
- **TypeScript** : Static typing for code robustness
- **Vite** : Ultra-fast build tool for development

### State Management
- **Redux Toolkit** : Simplified state management with RTK Query
- **Redux Persist** : Client-side data persistence
- **RTK Query** : API calls management with built-in cache

### Routing & Navigation
- **React Router v6** : Declarative routing with nested routes
- **Private Routes** : Authentication-protected routes

### UI & Styling
- **Tailwind CSS** : Utility-first CSS framework
- **Lucide React** : Modern and consistent icons

### Validation & Forms
- **Zod** : TypeScript-first schema validation
- **React Hook Form** : Performant forms with validation

### Backend Integration
- **JSON Server** : Mock REST API for development
- **Custom Auth Endpoints** : Custom authentication

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

### 🎉 Customer
- Event navigation
- Event details
- Like system
- Responsive interface

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the project
git clone <repository-url>
cd Event-Management-Platform

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Configuration
1. Configure your `db.json`:
```json
{
  "users": [
    {
      "id": 1,
      "email": "admin@example.com",
      "password": "admin123",
      "name": "Admin User"
    }
  ]
}
```

2. Deploy the server on Render or use json-server locally

## 🏛️ Technical Architecture

### Authentication Flow
1. **LoginForm** → `useLoginMutation` → API Call
2. **API Response** → Redux Actions → State Update
3. **State Update** → PrivateRoute Validation → Navigation

### Data Management
- **RTK Query** : Automatic caching and synchronization
- **Redux Persist** : Selective persistence (whitelist: ['user'])
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

### Environment Variables
```env
VITE_API_URL=https://event-management-platform-api.onrender.com
```

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
