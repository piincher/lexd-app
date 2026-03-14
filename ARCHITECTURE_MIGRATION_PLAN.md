# Architecture Migration Plan
## Single Responsibility Principle (SRP) & Feature-Based Architecture

> **Goal**: Production-ready codebase following AGENTS.md rules  
> **Approach**: Incremental refactoring - no rewrites, preserve functionality  
> **Priority**: Fix worst violators first, maintain app stability

---

## Executive Summary

### Current State (Violations Found)

| Category | Rule | Violations Found | Worst Offenders |
|----------|------|------------------|-----------------|
| **Screens** | < 100 lines | 30+ files | ContainerDetailScreen (1,573 lines) |
| **Components** | < 150 lines | 30+ files | ContainerWaypointTracker (1,120 lines) |
| **Hooks** | < 100 lines | 15+ files | useWaypoints (500 lines) |
| **Cross-feature imports** | Prohibited | 20+ instances | stats → home, orders → home, order-detail → chat |
| **shared/ui purity** | No business logic | ✅ Clean | - |

### Migration Strategy

**Phase 1**: Quick Wins (Week 1) - Fix cross-feature imports  
**Phase 2**: Screen Extraction (Week 2-3) - Top 10 oversized screens  
**Phase 3**: Component Cleanup (Week 4-5) - Top 10 oversized components  
**Phase 4**: Hook Refactoring (Week 6) - Top 5 oversized hooks  
**Phase 5**: Shared Types (Week 7) - Establish shared/types for cross-feature data  

---

## Phase 1: Fix Cross-Feature Imports (Week 1)

### Problem
Features are importing directly from other features, violating the architecture rule:
> "Feature A cannot import from Feature B. Share via props, shared/ui, or widgets"

### Current Violations

```
stats/screens/Stats.tsx              → home (useGetOrderOfUserById)
stats/screens/Stats.tsx              → profile (useGetCurrentUser)
orders/screens/Orders.tsx            → home (ItemList)
order-detail/screens/SeaShipping...  → chat (useChatClient)
order-detail/screens/SeaShipping...  → profile/hooks/useProfile (useBalance)
order-detail/screens/OrderDetails.tsx → chat (useChatClient)
admin/users/screens/ClientDetail.tsx → home (useGetOrderOfUserById)
admin/users/screens/AddUser.tsx      → auth (useSignupStore)
admin/tools/screens/AdminDashBoard   → home (ItemList, RowDetails, useViewSmsBalance)
admin/orders/screens/UserActive...   → home/components/UserHeaderInfo
admin/orders/screens/UserActive...   → home/hooks/useGetActiveOrders
admin/orders/screens/EditOrder.tsx   → order-detail (useGetOrderDetails)
admin/orders/screens/BatchUpdate...  → order-detail (useGetSeaRoutes)
admin/orders/screens/AddOrder.tsx    → home (sendPushNotification)
admin/orders/screens/ActiveOrder...  → orders/hooks/useOrderDetail (useGetOrderDetail)
admin/goods/screens/GoodsDetail...   → goods/components (StatusBadge)
profile/screens/PastOrders.tsx       → home (OrderList, useGetActiveOrder)
```

### Solution

**Option A**: Move shared hooks/components to `shared/` (Recommended for simple cases)
**Option B**: Pass data via props (Recommended when data flow is clear)
**Option C**: Create `widgets/` for complex reusable UI (Recommended for composite components)

### Action Items

| Priority | File | Import From | Solution |
|----------|------|-------------|----------|
| 1 | admin/orders/screens/EditOrder.tsx | order-detail | Move useGetOrderDetails to shared/hooks/orders.ts |
| 2 | admin/orders/screens/ActiveOrderDetails.tsx | orders | Move useGetOrderDetail to shared/hooks/orders.ts |
| 3 | order-detail/screens/*.tsx | chat | Move useChatClient to shared/hooks/chat.ts |
| 4 | admin/tools/screens/AdminDashBoard.tsx | home | Move ItemList, RowDetails to shared/ui/ or widgets/ |
| 5 | stats/screens/Stats.tsx | home, profile | Pass user data via props from parent screen |

---

## Phase 2: Screen Refactoring (Week 2-3)

### Target Screens (> 500 lines)

| File | Lines | Target Structure |
|------|-------|------------------|
| admin/containers/screens/ContainerDetailScreen.tsx | 1,573 | Screen + 8-10 components |
| customer/containers/screens/ClientPackingListScreen.tsx | 1,524 | Screen + 8-10 components |
| home/screens/HomeScreen.tsx | 1,358 | Screen + 6-8 components |
| admin/containers/screens/AssignGoodsScreen.tsx | 1,126 | Screen + 6-8 components |
| admin/containers/screens/CreateContainerScreen.tsx | 1,090 | Screen + 6-8 components |
| admin/containers/screens/WaypointManagementScreen.tsx | 1,038 | Screen + 5-7 components |
| admin/goods/screens/GoodsDetailScreen.tsx | 914 | Screen + 5-6 components |
| admin/containers/screens/LoadingListScreen.tsx | 903 | Screen + 5-6 components |
| admin/containers/screens/PackingListScreen.tsx | 897 | Screen + 5-6 components |
| public/screens/PublicHomeScreen.tsx | 893 | Screen + 5-6 components |

### Refactoring Pattern

**Before** (1,573 lines):
```tsx
// ContainerDetailScreen.tsx - Everything in one file
export const ContainerDetailScreen = () => {
  const [state1, setState1] = useState()
  const [state2, setState2] = useState()
  // ... 20 more state declarations
  
  const handleAction1 = () => { /* 50 lines */ }
  const handleAction2 = () => { /* 50 lines */ }
  // ... 15 more handlers
  
  return (
    <Screen>
      {/* 200+ lines of JSX */}
    </Screen>
  )
}
```

**After** (~80 lines):
```tsx
// ContainerDetailScreen.tsx - Composition only
export const ContainerDetailScreen = () => {
  const { container, isLoading } = useContainerDetail()
  
  if (isLoading) return <ContainerDetailSkeleton />
  
  return (
    <Screen header={{ title: container.name }}>
      <ContainerHeader container={container} />
      <ContainerStats container={container} />
      <ContainerGoodsList containerId={container.id} />
      <ContainerActions container={container} />
    </Screen>
  )
}
```

### Extraction Priority for ContainerDetailScreen

1. **ContainerHeader** - Header section with actions
2. **ContainerStats** - Stats cards section
3. **ContainerGoodsList** - List of assigned goods
4. **ContainerTimeline** - Status timeline
5. **ContainerDocuments** - Documents section
6. **ContainerActions** - Action buttons (edit, delete, etc.)
7. **useContainerDetail** - Hook to fetch container data

---

## Phase 3: Component Cleanup (Week 4-5)

### Target Components (> 300 lines)

| File | Lines | Action |
|------|-------|--------|
| admin/containers/components/ContainerWaypointTracker.tsx | 1,120 | Split into 6-8 sub-components |
| customer/containers/components/TransitTimeline.tsx | 940 | Split into 5-6 sub-components |
| admin/containers/components/WaypointUpdateModal.tsx | 767 | Extract form logic to hook |
| order-detail/screens/SeaShippingOrderDetails.tsx | 713 | Split into 5-6 components |
| admin/orders/screens/PastOrder.tsx | 699 | Split into 4-5 components |
| payments/components/CardPaymentForm.tsx | 654 | Extract validation to utils |
| admin/search/components/SearchResults.tsx | 652 | Split list item to separate component |
| admin/analytics/components/PaymentMetrics.tsx | 631 | Split chart components |

### Refactoring Pattern

Components should:
1. Receive data via props
2. NOT make API calls directly
3. NOT contain business logic (use hooks)
4. NOT exceed 150 lines

---

## Phase 4: Hook Refactoring (Week 6)

### Target Hooks (> 150 lines)

| File | Lines | Action |
|------|-------|--------|
| admin/containers/hooks/useWaypoints.ts | 500 | Split into 3-4 focused hooks |
| admin/search/hooks/useSearch.ts | 442 | Split filters vs search logic |
| admin/export/hooks/useExport.ts | 433 | Split by export type |
| payments/hooks/usePayments.ts | 347 | Split by payment method |
| customer/containers/hooks/useCustomerTracking.ts | 337 | Split tracking vs timeline |
| admin/goods/hooks/useGoods.ts | 293 | Already good structure, trim to < 200 |
| admin/containers/hooks/useContainers.ts | 283 | Split CRUD operations |

### Hook Principles

1. **One purpose per hook**
2. **Name must start with 'use'**
3. **Return consistent shape**
4. **NO JSX rendering logic**

**Example**:
```typescript
// BAD: One hook doing everything (500 lines)
export const useWaypoints = () => {
  // fetch, create, update, delete, validate, transform, etc.
}

// GOOD: Focused hooks
export const useWaypoints = (containerId: string) => { /* fetch only */ }
export const useCreateWaypoint = () => { /* create only */ }
export const useUpdateWaypoint = () => { /* update only */ }
export const useWaypointValidation = () => { /* validation only */ }
```

---

## Phase 5: Shared Types (Week 7)

### Problem
Types are duplicated across features or features import types from other features.

### Solution
Establish `shared/types/` as the source of truth for cross-feature types:

```
shared/types/
├── index.ts          # Re-export all types
├── order.ts          # Order, OrderStatus, OrderItem
├── user.ts           # User, UserRole, UserProfile
├── goods.ts          # Goods, GoodsStatus, GoodsType
├── container.ts      # Container, ContainerStatus
├── payment.ts        # Payment, PaymentMethod, PaymentStatus
├── notification.ts   # Notification, NotificationType
└── route.ts          # Route, RouteStatus, Waypoint
```

### Migration Steps

1. Identify duplicated types across features
2. Move to shared/types/
3. Update imports in all features
4. Delete duplicate type definitions

---

## Recommended Tooling

### ESLint Rules to Add

```javascript
// .eslintrc.js additions
rules: {
  // File size limits (warnings)
  'max-lines': ['warn', { max: 150, skipBlankLines: true, skipComments: true }],
  
  // Cross-feature import detection
  'no-restricted-imports': ['error', {
    patterns: [
      // Prevent features from importing from other features
      // (except shared/ and widgets/)
    ]
  }]
}
```

### Scripts to Add

```json
// package.json
{
  "scripts": {
    "check:architecture": "node scripts/check-architecture.js",
    "check:file-sizes": "node scripts/check-file-sizes.js",
    "check:imports": "node scripts/check-cross-feature-imports.js"
  }
}
```

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Screens > 100 lines | 30+ | 0 |
| Components > 150 lines | 30+ | 5 (legacy only) |
| Hooks > 100 lines | 15+ | 3 (legacy only) |
| Cross-feature imports | 20+ | 0 |
| TypeScript errors | ? | 0 |

---

## Appendix: Quick Reference

### Screen Template (Target: < 100 lines)
```tsx
export const ScreenName: React.FC = () => {
  const { data, isLoading } = useData()  // Hook for data
  
  if (isLoading) return <ScreenSkeleton />
  
  return (
    <Screen header={{ title: 'Title' }}>
      <SectionOne data={data.part1} />
      <SectionTwo data={data.part2} />
      <SectionThree data={data.part3} />
    </Screen>
  )
}
```

### Component Template (Target: < 150 lines)
```tsx
interface Props {
  data: DataType
  onAction: () => void
}

export const ComponentName: React.FC<Props> = ({ data, onAction }) => {
  // Minimal logic, mostly presentational
  return (
    <Card>
      <Text>{data.title}</Text>
      <Button onPress={onAction} />
    </Card>
  )
}
```

### Hook Template (Target: < 100 lines)
```tsx
export const useHookName = (param: string) => {
  const query = useQuery({
    queryKey: ['key', param],
    queryFn: () => api.fetch(param)
  })
  
  const mutation = useMutation({
    mutationFn: api.update
  })
  
  return {
    data: query.data,
    isLoading: query.isLoading,
    update: mutation.mutate
  }
}
```

---

## Next Steps

1. **Review this plan** - Confirm priorities align with business needs
2. **Set up tooling** - Add ESLint rules and check scripts
3. **Start Phase 1** - Fix cross-feature imports (low risk, high impact)
4. **Schedule weekly refactoring** - 1-2 screens per week
5. **Code review checklist** - Enforce new architecture in PRs

**Estimated Timeline**: 7 weeks (1 week per phase)  
**Team Size**: 1-2 developers for refactoring  
**Risk Level**: Low (incremental changes, no rewrites)
