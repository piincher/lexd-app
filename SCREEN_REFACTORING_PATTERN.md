# Screen Refactoring Pattern (Established)

## Reference Implementation: StatsScreen

**Location**: `src/features/stats/screens/Stats.tsx`

### Before vs After

| Metric | Before | After |
|--------|--------|-------|
| Screen lines | 395 ❌ | 85 ✅ |
| Hook lines | N/A | 94 ✅ |
| Components | 0 | 4 ✅ |
| Styles inline | Yes ❌ | Separate file ✅ |
| Business logic in screen | Yes ❌ | In hook only ✅ |

---

## Refactoring Pattern

### Step 1: Create Directory Structure
```
screens/
├── Stats.tsx                 # Main screen (< 100 lines)
├── Stats.styles.ts           # All styles
├── hooks/
│   ├── index.ts              # Export hooks
│   └── useStatsScreen.ts     # Business logic (< 100 lines)
└── components/
    ├── index.ts              # Export components
    ├── UserInfoCard.tsx      # Component 1
    ├── QuickStats.tsx        # Component 2
    ├── ShipmentChart.tsx     # Component 3
    └── RecentShipments.tsx   # Component 4
```

### Step 2: Create Hook (use[ScreenName].ts)

**Responsibilities**:
- All data fetching (useQuery, useMutation)
- All state management (useState)
- All computed values (useMemo)
- All callbacks (useCallback)

**Return shape**:
```typescript
{
  // Data
  user, orders, data,
  // Loading states
  isLoading, isError, error,
  // Actions
  refetch, handlers: { ... },
  // Computed
  counts, totals, chartData
}
```

### Step 3: Extract Components

**Guidelines**:
- Each component < 150 lines
- Receive data via props
- No API calls in components
- No business logic in components

**Types of components to extract**:
1. **Header cards** - User info, summary cards
2. **Data displays** - Lists, charts, tables
3. **Empty states** - Loading, error, no data
4. **Action sections** - Buttons, filters

### Step 4: Move Styles

**File**: `ScreenName.styles.ts`

Move all StyleSheet.create styles from the original screen.

### Step 5: Refactor Main Screen

**Pattern**:
```tsx
const ScreenName = () => {
  const { data, isLoading, isError, handlers } = useScreenName();

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState onRetry={handlers.refetch} />;

  return (
    <Screen>
      <ComponentOne data={data.part1} />
      <ComponentTwo data={data.part2} />
      <ComponentThree data={data.part3} />
    </Screen>
  );
};
```

---

## Parallel Task Breakdown

For each screen, deploy these atomic tasks in parallel:

### Task 1: Create Hook (use[ScreenName].ts)
- Extract all useState
- Extract all data fetching
- Extract all computed values
- Extract all handlers

### Task 2: Create Component A (largest section)
- Extract first major UI section
- Define props interface
- Use styles from separate file

### Task 3: Create Component B (second section)
- Extract second major UI section
- Define props interface

### Task 4: Create Component C (third section)
- Extract third major UI section
- Define props interface

### Task 5: Create Additional Components
- Any remaining inline components
- Empty states
- Error states

### Task 6: Create Styles File
- Move all StyleSheet.create styles
- Export as named export

### Task 7: Create Index Files
- hooks/index.ts
- components/index.ts

### Task 8: Refactor Main Screen
- Use hook for all logic
- Compose extracted components
- Handle loading/error states

### Task 9: Verify
- Check line counts (< 100 for screen, < 150 for components, < 100 for hook)
- Verify imports work
- Ensure no functionality lost

---

## Remaining Screens to Refactor

### Priority 1: High Impact (> 800 lines)

| Screen | Lines | Estimated Components | Estimated Effort |
|--------|-------|---------------------|------------------|
| admin/containers/ContainerDetailScreen.tsx | 1,573 | 8-10 | 2-3 days |
| customer/containers/ClientPackingListScreen.tsx | 1,524 | 8-10 | 2-3 days |
| home/screens/HomeScreen.tsx | 1,358 | 6-8 | 2 days |
| admin/containers/AssignGoodsScreen.tsx | 1,126 | 6-8 | 2 days |
| admin/containers/CreateContainerScreen.tsx | 1,090 | 6-8 | 2 days |
| admin/containers/WaypointManagementScreen.tsx | 1,038 | 5-7 | 1.5 days |

### Priority 2: Medium Impact (500-800 lines)

| Screen | Lines | Estimated Components | Estimated Effort |
|--------|-------|---------------------|------------------|
| admin/goods/GoodsDetailScreen.tsx | 914 | 5-6 | 1.5 days |
| admin/containers/LoadingListScreen.tsx | 903 | 5-6 | 1.5 days |
| admin/containers/PackingListScreen.tsx | 897 | 5-6 | 1.5 days |
| public/screens/PublicHomeScreen.tsx | 893 | 5-6 | 1.5 days |
| admin/whatsapp-requests/WhatsAppRequestListScreen.tsx | 866 | 5-6 | 1.5 days |
| admin/routes/RouteFormScreen.tsx | 862 | 5-6 | 1.5 days |
| goods/GoodsDetailScreen.tsx | 809 | 5-6 | 1.5 days |
| customer/containers/ContainerTrackingScreen.tsx | 715 | 4-5 | 1 day |
| admin/routes/RouteListScreen.tsx | 706 | 4-5 | 1 day |
| admin/containers/ContainerListScreen.tsx | 574 | 4-5 | 1 day |

### Priority 3: Lower Impact (300-500 lines)

| Screen | Lines | Estimated Components | Estimated Effort |
|--------|-------|---------------------|------------------|
| admin/analytics/AnalyticsDashboardScreen.tsx | 570 | 4 | 1 day |
| customer/dashboard/CustomerDashboardScreen.tsx | 554 | 4 | 1 day |
| customer/support/TicketDetailScreen.tsx | 550 | 3-4 | 1 day |
| admin/goods/GoodsListScreen.tsx | 543 | 3-4 | 0.5 day |
| profile/NotificationSettingsScreen.tsx | 527 | 3-4 | 0.5 day |
| admin/export/DataExportScreen.tsx | 524 | 3-4 | 0.5 day |
| payments/PaymentHistoryScreen.tsx | 492 | 3-4 | 0.5 day |
| notifications/NotificationsScreen.tsx | 491 | 3-4 | 0.5 day |

---

## Batching Strategy

### Week 1: Priority 1 (6 screens)
- Day 1-2: ContainerDetailScreen
- Day 2-3: ClientPackingListScreen  
- Day 3-4: HomeScreen
- Day 4-5: AssignGoodsScreen
- Day 5-6: CreateContainerScreen
- Day 6-7: WaypointManagementScreen

### Week 2: Priority 2 (10 screens)
- Batch by feature area:
  - Day 1-2: Goods screens (GoodsDetailScreen x2)
  - Day 2-3: Container screens (LoadingList, PackingList)
  - Day 3-4: Public/Routes screens
  - Day 4-5: Remaining medium screens

### Week 3: Priority 3 (9 screens)
- Batch 3 screens per day
- Focus on completing the backlog

---

## Total Effort Estimate

| Phase | Screens | Days | Parallel Agents |
|-------|---------|------|-----------------|
| Priority 1 | 6 | 7 days | 6 screens × 9 tasks = 54 tasks |
| Priority 2 | 10 | 5 days | 10 screens × 7 tasks = 70 tasks |
| Priority 3 | 9 | 3 days | 9 screens × 6 tasks = 54 tasks |
| **Total** | **25** | **15 days** | **178 atomic tasks** |

With 100 agents working in parallel, each batch of screens can be completed in 1-2 days.

---

## Verification Checklist Per Screen

- [ ] Screen < 100 lines
- [ ] Hook < 100 lines
- [ ] All components < 150 lines
- [ ] No useState in screen
- [ ] No useEffect in screen (except for navigation listeners)
- [ ] No StyleSheet.create in screen
- [ ] No business logic in screen
- [ ] All data from hook
- [ ] All components extracted
- [ ] Styles in separate file
- [ ] Index files created
- [ ] TypeScript compiles
- [ ] App runs correctly
- [ ] All functionality preserved

---

## Next Action

Ready to batch refactor remaining screens. 

**Recommend starting with**: ContainerDetailScreen (highest impact)
**Or start with**: CustomerDashboardScreen (simpler pattern)

Deploy 100 agents to handle all atomic tasks in parallel for the first batch of screens.
