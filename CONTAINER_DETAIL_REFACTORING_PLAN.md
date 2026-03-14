# ContainerDetailScreen Refactoring Plan

## Current State
- **Lines**: 1,573 (violation: screens must be < 100 lines)
- **Styles**: ~600 lines inline
- **Components**: 1 inline sub-component (ContainerWaypointTrackerSection)
- **State**: 9 useState calls
- **Handlers**: 15+ handler functions

## Target Structure

```
screens/
├── ContainerDetailScreen.tsx          # < 100 lines (composition only)
├── ContainerDetailScreen.styles.ts    # All ~600 lines of styles
├── hooks/
│   ├── index.ts
│   └── useContainerDetailScreen.ts    # All logic (< 100 lines)
└── components/
    ├── index.ts
    ├── ContainerDetailHeader.tsx      # Header with gradient, back button, status
    ├── ContainerTimeline.tsx          # Status timeline section
    ├── ContainerCapacityCard.tsx      # CBM capacity indicator
    ├── ContainerGoodsList.tsx         # Assigned goods list
    ├── ContainerWaypointSection.tsx   # Waypoint tracker wrapper
    ├── ContainerActionButtons.tsx     # FAB action buttons
    ├── ContainerDialogs.tsx           # All dialogs (delete, remove, pickup)
    ├── LoadingState.tsx               # Loading skeleton
    └── ErrorState.tsx                 # Error state
```

## Atomic Tasks for Parallel Agents

### Task 1: Create useContainerDetailScreen Hook
**Agent**: Hook Specialist
**Output**: `hooks/useContainerDetailScreen.ts`
**Requirements**:
- Extract all useState (9 states)
- Extract all data fetching hooks
- Extract all mutations
- Extract all handler functions (15+)
- Calculate derived values (fillPercentage, goodsList, etc.)
- Return comprehensive state object
**Max Lines**: 100

### Task 2: Create ContainerDetailHeader Component
**Agent**: Component Specialist A
**Output**: `components/ContainerDetailHeader.tsx`
**Requirements**:
- LinearGradient header
- Back button
- Status badge with Menu dropdown
- Container number display
- Shipping mode info
**Max Lines**: 150

### Task 3: Create ContainerTimeline Component
**Agent**: Component Specialist B
**Output**: `components/ContainerTimeline.tsx`
**Requirements**:
- Timeline steps visualization
- Current status indicator
- Step icons and labels
- Progress styling
**Max Lines**: 150

### Task 4: Create ContainerCapacityCard Component
**Agent**: Component Specialist C
**Output**: `components/ContainerCapacityCard.tsx`
**Requirements**:
- CBM usage display
- Progress bar with color coding
- Fill percentage calculation
- Visual capacity indicator
**Max Lines**: 150

### Task 5: Create ContainerGoodsList Component
**Agent**: Component Specialist D
**Output**: `components/ContainerGoodsList.tsx`
**Requirements**:
- List of assigned goods
- Individual goods cards
- Remove button per item
- Delivered status toggle
- Empty state
**Max Lines**: 150

### Task 6: Create ContainerWaypointSection Component
**Agent**: Component Specialist E
**Output**: `components/ContainerWaypointSection.tsx`
**Requirements**:
- Waypoint tracker wrapper
- Loading state for waypoints
- Integration with ContainerWaypointTracker
**Max Lines**: 100

### Task 7: Create ContainerActionButtons Component
**Agent**: Component Specialist F
**Output**: `components/ContainerActionButtons.tsx`
**Requirements**:
- FAB buttons layout
- Assign Goods button
- Generate Packing List button
- Loading List button
- Mark Ready for Pickup button
- Status-based button visibility
**Max Lines**: 150

### Task 8: Create ContainerDialogs Component
**Agent**: Component Specialist G
**Output**: `components/ContainerDialogs.tsx`
**Requirements**:
- Delete confirmation dialog
- Remove goods confirmation dialog
- Ready for pickup confirmation dialog
- All dialog content and actions
**Max Lines**: 150

### Task 9: Create LoadingState Component
**Agent**: Component Specialist H
**Output**: `components/LoadingState.tsx`
**Requirements**:
- Loading skeleton/indicator
- "Chargement..." text
- Centered layout
**Max Lines**: 50

### Task 10: Create ErrorState Component
**Agent**: Component Specialist I
**Output**: `components/ErrorState.tsx`
**Requirements**:
- Error icon (alert-circle)
- "Container non trouvé" message
- Back button
**Max Lines**: 50

### Task 11: Create Styles File
**Agent**: Styles Specialist
**Output**: `ContainerDetailScreen.styles.ts`
**Requirements**:
- Move all ~600 lines of StyleSheet.create
- Organize by section (header, timeline, capacity, goods, etc.)
- Export styles object
**Max Lines**: N/A (all styles)

### Task 12: Create Index Files
**Agent**: Index Specialist
**Output**: 
- `hooks/index.ts`
- `components/index.ts`
**Requirements**:
- Export all hooks
- Export all components

### Task 13: Refactor Main Screen
**Agent**: Screen Specialist
**Output**: `ContainerDetailScreen.tsx` (refactored)
**Requirements**:
- Use useContainerDetailScreen hook
- Compose all extracted components
- Handle loading state
- Handle error state
- Main render with all sections
- < 100 lines

### Task 14: Verify and Test
**Agent**: Verification Specialist
**Output**: Verification report
**Requirements**:
- Check all file sizes
- Verify imports work
- Ensure no functionality lost
- TypeScript check

## Dependencies Between Tasks

```
Task 11 (Styles) → All component tasks
Task 12 (Index)  → After all component/hook tasks
Task 13 (Screen) → After Task 1, Task 12
Task 14 (Verify) → After Task 13
```

**Can run in parallel**: Tasks 1-11 (except dependencies)
**Must run sequential**: Task 12 → Task 13 → Task 14

## Estimated Lines After Refactoring

| File | Estimated Lines |
|------|----------------|
| ContainerDetailScreen.tsx | ~80 |
| useContainerDetailScreen.ts | ~95 |
| ContainerDetailHeader.tsx | ~120 |
| ContainerTimeline.tsx | ~80 |
| ContainerCapacityCard.tsx | ~70 |
| ContainerGoodsList.tsx | ~130 |
| ContainerWaypointSection.tsx | ~60 |
| ContainerActionButtons.tsx | ~110 |
| ContainerDialogs.tsx | ~120 |
| LoadingState.tsx | ~30 |
| ErrorState.tsx | ~40 |
| Styles | ~600 (unchanged) |
| **Total** | **~1,535** (was 1,573) |

## Success Criteria

- [ ] Main screen < 100 lines
- [ ] Hook < 100 lines
- [ ] All components < 150 lines
- [ ] No useState in main screen
- [ ] No StyleSheet.create in main screen
- [ ] All functionality preserved
- [ ] TypeScript compiles
