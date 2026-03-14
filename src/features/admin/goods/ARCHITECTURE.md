# Goods Feature - Enterprise Architecture

## Overview
This module follows enterprise-grade architecture patterns for a large-scale React Native application.

## Architecture Patterns

### 1. Layered Architecture
```
┌─────────────────────────────────────┐
│           Presentation Layer         │
│  (Screens, Components, Hooks)        │
├─────────────────────────────────────┤
│           Service Layer              │
│  (GoodsService - Business Logic)     │
├─────────────────────────────────────┤
│           API Layer                  │
│  (API Client, Interceptors)          │
├─────────────────────────────────────┤
│           Data Layer                 │
│  (React Query, Cache Management)     │
└─────────────────────────────────────┘
```

### 2. Key Principles

#### Single Responsibility Principle (SRP)
- `useReceiveGoodsForm` - Only handles form state
- `useReceiveGoods` - Only handles API mutation
- `GoodsService` - Only handles business logic
- `FormInput` - Only renders input UI

#### Separation of Concerns
- **API Client**: HTTP requests, error handling, retries
- **Service Layer**: Business logic, data transformation
- **Hooks**: State management, side effects
- **Components**: Pure UI rendering

#### Dependency Inversion
- Services depend on abstractions (interfaces)
- Components depend on hooks, not direct API calls
- Easy to mock for testing

## Folder Structure

```
goods/
├── api/                    # API layer
│   ├── types.ts           # Shared API types
│   └── goodsApi.ts        # API endpoints
├── components/            # Presentational components
│   ├── ClientSearchSection.tsx
│   ├── DimensionsInput.tsx
│   ├── FormInput.tsx
│   ├── GoodsPhotoUpload.tsx
│   └── CostSummary.tsx
├── hooks/                 # Custom React hooks
│   ├── useGoods.ts        # Data fetching hooks
│   └── useReceiveGoodsForm.ts  # Form management
├── screens/               # Container components
│   ├── GoodsListScreen.tsx
│   ├── ReceiveGoodsScreen.tsx
│   └── GoodsDetailScreen.tsx
├── services/              # Business logic layer
│   └── GoodsService.ts    # Service class
├── types/                 # Domain types
│   └── index.ts          # TypeScript interfaces
└── ARCHITECTURE.md        # This file
```

## Key Features

### 1. API Client (`api/client.ts`)
- **Retry Logic**: Exponential backoff for failed requests
- **Error Handling**: Custom `ApiClientError` class with user-friendly messages
- **Interceptors**: Automatic token injection and auth error handling
- **Type Safety**: Full TypeScript support with generics

```typescript
// Usage
const data = await apiRequest.get<Goods>(apiClientV2, '/goods');
```

### 2. Service Layer (`services/GoodsService.ts`)
- **Singleton Pattern**: Single instance across app
- **Method Abstraction**: Hide API complexity
- **Error Transformation**: Convert API errors to domain errors

```typescript
// Usage
const goods = await goodsService.getById(id);
```

### 3. React Query Hooks (`hooks/useGoods.ts`)
- **Query Keys**: Centralized cache management
- **Optimistic Updates**: UI updates before API response
- **Error Handling**: Type-safe error handling
- **Loading States**: Automatic loading state management

```typescript
// Usage
const { data, isLoading, error } = useGetAllGoods(filters);
```

### 4. Form Management (`hooks/useReceiveGoodsForm.ts`)
- **State Management**: Centralized form state
- **Validation**: Real-time validation with error clearing
- **Calculated Fields**: Automatic CBM calculation
- **Type Safety**: Full TypeScript support

```typescript
// Usage
const {
  formData,
  errors,
  validateForm,
  buildSubmitData,
} = useReceiveGoodsForm();
```

### 5. Presentational Components
- **Props Interface**: Clear input/output contract
- **No Business Logic**: Pure rendering only
- **Reusable**: Generic components like `FormInput`
- **Accessible**: Proper labels and hints

## Error Handling Strategy

### 1. Error Types
```typescript
// API Errors (network, server)
class ApiClientError extends Error {
  code: string;
  statusCode?: number;
  getUserMessage(): string;
}

// Validation Errors (form)
interface GoodsFormErrors {
  field?: string;
}
```

### 2. Error Boundaries
- Global error boundary for crashes
- Component-level error handling
- Form-level validation errors

### 3. User Feedback
- Toast notifications for API errors
- Inline validation for forms
- Loading states for async operations

## Testing Strategy

### 1. Unit Tests
- Services: Mock API calls
- Hooks: Mock React Query
- Components: Render with props

### 2. Integration Tests
- Screen navigation
- Form submission flow
- API error handling

### 3. E2E Tests
- Complete user flows
- Real API calls (staging)

## Performance Optimizations

### 1. React Query
- Stale time: 5 minutes
- Cache invalidation on mutations
- Background refetching

### 2. Memoization
- `useCallback` for event handlers
- `useMemo` for calculations
- `React.memo` for pure components

### 3. Lazy Loading
- Dynamic imports for heavy components
- Code splitting by route

## Security

### 1. Authentication
- Token stored in secure storage
- Automatic token injection
- 401/403 handling with logout

### 2. Input Validation
- Client-side validation
- Server-side validation
- Sanitization of user input

### 3. Data Protection
- No sensitive data in logs
- HTTPS only
- Certificate pinning (production)

## Best Practices

### 1. Naming Conventions
- `PascalCase` for components
- `camelCase` for functions/variables
- `UPPER_CASE` for constants
- `useXxx` for hooks

### 2. File Organization
- One component per file
- Co-located tests: `Component.test.tsx`
- Co-located styles: `Component.styles.ts` (optional)

### 3. Documentation
- JSDoc for public APIs
- Inline comments for complex logic
- README for complex features

### 4. Code Reviews
- Type safety check
- Performance review
- Security review
- Accessibility check

## Migration Guide

### From Old Code
```typescript
// Old: Direct API call
const response = await api.post('/goods', data);

// New: Service layer
const response = await goodsService.receive(data);
```

```typescript
// Old: Local state
const [formData, setFormData] = useState({});

// New: Custom hook
const { formData, validateForm } = useReceiveGoodsForm();
```

## Future Improvements

1. **State Management**: Consider Zustand for complex state
2. **Offline Support**: Add offline mutations with queue
3. **Real-time**: WebSocket for live updates
4. **Analytics**: Track user interactions
5. **Feature Flags**: Enable/disable features remotely
