# Screen Refactoring Guide

## Based on MyGoodsScreen Proof of Concept

This guide documents the established pattern for refactoring screens from monolithic components to feature-based architecture with separated concerns.

---

## Before/After Comparison

### Before (Typical 130-150 lines):
```typescript
const ScreenName = ({ navigation }) => {
  // ❌ State management inline
  const [state, setState] = useState(initialValue);
  
  // ❌ Data fetching inline
  const { data, isLoading } = useQuery(...);
  
  // ❌ Handlers inline
  const handleAction = useCallback(() => {
    // logic
  }, [deps]);
  
  // ❌ Derived state inline
  const derived = useMemo(() => compute(data), [data]);
  
  // ❌ Styles inline with StyleSheet.create
  const styles = StyleSheet.create({...});
  
  return (
    // JSX with logic mixed in
  );
};
```

### After (Target < 80 lines):
```typescript
const ScreenName = ({ navigation }) => {
  // ✅ All logic extracted to hook
  const { state, data, isLoading, handlers } = useScreenName(navigation);
  
  // ✅ Styles imported from separate file
  
  // ✅ Screen only composes UI
  return (
    <Screen>
      <Components data={data} handlers={handlers} />
    </Screen>
  );
};
```

---

## File Structure Template

```
screens/
├── ScreenName.tsx                 # < 100 lines, composition only
├── ScreenName.styles.ts           # All styles
├── hooks/
│   ├── index.ts                   # Export all screen hooks
│   └── useScreenName.ts           # < 100 lines, all logic
└── components/                    # Screen-specific components
    ├── index.ts                   # Export all components
    ├── ScreenNameHeader.tsx       # Header component
    ├── ScreenNameList.tsx         # List component
    ├── ScreenNameEmptyState.tsx   # Empty/loading state
    └── ScreenNameFilter.tsx       # Filter component
```

---

## Step-by-Step Refactoring Process

### Step 1: Create Hook File

**File:** `screens/hooks/useScreenName.ts`

**What to extract:**
1. All `useState` calls → hook state
2. All data fetching (`useQuery`, `useMutation`) → hook queries
3. All handlers (`useCallback`) → hook handlers
4. All derived state (`useMemo`) → hook computed values

**Pattern:**
```typescript
export type ScreenFilter = 'ALL' | 'OTHER';

type UseScreenNameReturn = {
  // State
  filter: ScreenFilter;
  // Data
  data: DataType[];
  // Loading states
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  // Handlers (grouped object)
  handlers: {
    handleRefresh: () => void;
    handleItemPress: (id: string) => void;
    handleFilterChange: (filter: ScreenFilter) => void;
  };
};

export const useScreenName = (navigation: NavigationProp): UseScreenNameReturn => {
  // State
  const [filter, setFilter] = useState<ScreenFilter>('ALL');
  
  // Data fetching with filters
  const filters = useMemo(() => 
    filter === 'ALL' ? undefined : { status: filter },
    [filter]
  );
  
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery(...);
  
  // Handlers wrapped in useCallback
  const handleRefresh = useCallback(() => refetch(), [refetch]);
  
  const handleItemPress = useCallback((id: string) => {
    navigation.navigate('Detail', { id });
  }, [navigation]);
  
  const handleFilterChange = useCallback((newFilter: ScreenFilter) => {
    setFilter(newFilter);
  }, []);
  
  // Derived data
  const items = data?.items || [];
  
  return {
    filter,
    data: items,
    isLoading,
    isError,
    error,
    isFetching,
    handlers: {
      handleRefresh,
      handleItemPress,
      handleFilterChange,
    },
  };
};
```

---

### Step 2: Create Styles File

**File:** `screens/ScreenName.styles.ts`

**Pattern:**
```typescript
import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    fontFamily: Fonts.medium,
    color: COLORS.DimGray,
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    marginTop: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.DimGray,
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 24,
  },
});
```

---

### Step 3: Refactor Screen

**File:** `screens/ScreenName.tsx`

**Changes:**
1. Import hook: `import { useScreenName } from './hooks'`
2. Import styles: `import { styles } from './ScreenName.styles'`
3. Remove all `useState`, `useCallback`, `useMemo` from screen
4. Remove `StyleSheet` import and creation
5. Use hook return values
6. Screen should only have JSX composition

**Pattern:**
```typescript
// ScreenName.tsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useScreenName } from './hooks';
import { styles } from './ScreenName.styles';
import { 
  ScreenNameHeader,
  ScreenNameFilter,
  ScreenNameList,
  ScreenNameEmptyState,
} from './components';

export const ScreenName: React.FC<ScreenProps> = ({ navigation }) => {
  const { 
    filter,
    data,
    isLoading,
    isError,
    error,
    isFetching,
    handlers 
  } = useScreenName(navigation);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenNameHeader onAction={handlers.handleAction} />
        <ScreenNameEmptyState loading />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenNameHeader onAction={handlers.handleAction} />
        <ScreenNameEmptyState error={error?.message} onRetry={handlers.handleRefresh} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenNameHeader onAction={handlers.handleAction} />
      <ScreenNameFilter activeFilter={filter} onFilterChange={handlers.handleFilterChange} />
      <ScreenNameList
        data={data}
        refreshing={isFetching}
        onRefresh={handlers.handleRefresh}
        onItemPress={handlers.handleItemPress}
      />
    </SafeAreaView>
  );
};
```

---

### Step 4: Create Components Index

**File:** `screens/components/index.ts`

```typescript
// Screen Components Exports
export { ScreenNameHeader } from './ScreenNameHeader';
export { ScreenNameFilter } from './ScreenNameFilter';
export { ScreenNameList } from './ScreenNameList';
export { ScreenNameEmptyState } from './ScreenNameEmptyState';
```

---

### Step 5: Create Hooks Index

**File:** `screens/hooks/index.ts`

```typescript
// Screen Hooks Exports
export { useScreenName } from './useScreenName';
```

---

## Code Templates

### Hook Template (`useScreenName.ts`)

```typescript
// FeatureName Feature - ScreenName Hook
// Handles all business logic for the ScreenName

import { useState, useCallback, useMemo } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@src/navigations/type';
import { useGetData } from '../../hooks';
import { DataType, FilterType } from '../../api';

export type ScreenFilter = 'ALL' | FilterType;

type UseScreenNameReturn = {
  // State
  filter: ScreenFilter;
  // Data
  data: DataType[];
  // Loading states
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  // Handlers
  handlers: {
    handleRefresh: () => void;
    handleItemPress: (id: string) => void;
    handleActionPress: () => void;
    handleFilterChange: (filter: ScreenFilter) => void;
  };
};

export const useScreenName = (
  navigation: NavigationProp<RootStackParamList>
): UseScreenNameReturn => {
  // State
  const [filter, setFilter] = useState<ScreenFilter>('ALL');

  // Data fetching
  const filters = useMemo(
    () => (filter === 'ALL' ? undefined : { status: filter }),
    [filter]
  );

  const { data, isLoading, isError, error, refetch, isFetching } = useGetData(filters);

  // Handlers
  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleItemPress = useCallback(
    (id: string) => {
      navigation.navigate('Detail', { id });
    },
    [navigation]
  );

  const handleActionPress = useCallback(() => {
    navigation.navigate('OtherScreen');
  }, [navigation]);

  const handleFilterChange = useCallback((newFilter: ScreenFilter) => {
    setFilter(newFilter);
  }, []);

  // Derived data
  const items = data?.items || [];

  return {
    filter,
    data: items,
    isLoading,
    isError,
    error,
    isFetching,
    handlers: {
      handleRefresh,
      handleItemPress,
      handleActionPress,
      handleFilterChange,
    },
  };
};
```

---

### Screen Template (`ScreenName.tsx`)

```typescript
// FeatureName Feature - ScreenName
// Main screen that composes components and handles navigation
// No business logic - only composition and navigation

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthenticatedStackScreenProps } from '@src/navigations/type';
import { useScreenName } from './hooks';
import { styles } from './ScreenName.styles';
import {
  ScreenNameHeader,
  ScreenNameFilter,
  ScreenNameList,
  ScreenNameEmptyState,
} from './components';

export const ScreenName: React.FC<AuthenticatedStackScreenProps<'ScreenName'>> = ({
  navigation,
}) => {
  const {
    filter,
    data,
    isLoading,
    isError,
    error,
    isFetching,
    handlers,
  } = useScreenName(navigation);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenNameHeader onActionPress={handlers.handleActionPress} />
        <ScreenNameEmptyState loading />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenNameHeader onActionPress={handlers.handleActionPress} />
        <ScreenNameEmptyState error={error?.message} onRetry={handlers.handleRefresh} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenNameHeader onActionPress={handlers.handleActionPress} />
      <ScreenNameFilter
        activeFilter={filter}
        onFilterChange={handlers.handleFilterChange}
      />
      <ScreenNameList
        data={data}
        refreshing={isFetching}
        onRefresh={handlers.handleRefresh}
        onItemPress={handlers.handleItemPress}
      />
    </SafeAreaView>
  );
};

export default ScreenName;
```

---

### Styles Template (`ScreenName.styles.ts`)

```typescript
import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    fontFamily: Fonts.medium,
    color: COLORS.DimGray,
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    marginTop: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.DimGray,
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 24,
  },
});
```

---

## Verification Checklist

After refactoring, verify:

### Screen File
- [ ] Screen < 100 lines
- [ ] No `useState` in screen
- [ ] No `useCallback` in screen
- [ ] No `useMemo` in screen
- [ ] No `StyleSheet.create` in screen
- [ ] No business logic in screen
- [ ] Only imports: React, navigation types, hook, styles, components
- [ ] Returns early for loading/error states
- [ ] Main return only composes components

### Hook File
- [ ] Hook < 100 lines
- [ ] All state in `useState`
- [ ] All data fetching via query hooks
- [ ] All handlers wrapped in `useCallback`
- [ ] Derived values wrapped in `useMemo`
- [ ] Returns grouped object: `{ state, data, loadingStates, handlers }`
- [ ] Navigation passed as parameter for navigation handlers

### Styles File
- [ ] All styles extracted from screen
- [ ] Uses theme colors from constants
- [ ] Uses font families from constants

### Build Verification
- [ ] TypeScript compiles (`npx tsc --noEmit`)
- [ ] ESLint passes (`npm run lint`)
- [ ] App runs correctly
- [ ] All functionality preserved

---

## Common Patterns

### Pattern 1: List Screen with Filter

```typescript
// Hook
const [filter, setFilter] = useState('ALL');
const filters = useMemo(() => filter === 'ALL' ? undefined : { status: filter }, [filter]);
const { data } = useGetItems(filters);

// Screen
<Header onAction={handlers.handleAction} />
<FilterTabs active={filter} onChange={handlers.handleFilterChange} />
<List data={data} onItemPress={handlers.handleItemPress} />
```

### Pattern 2: Detail Screen

```typescript
// Hook
const { id } = route.params;
const { data, isLoading } = useGetItem(id);
const deleteMutation = useDeleteItem();

const handleDelete = useCallback(() => {
  deleteMutation.mutate(id, {
    onSuccess: () => navigation.goBack(),
  });
}, [id, deleteMutation, navigation]);

// Screen
<DetailHeader onBack={navigation.goBack} onDelete={handlers.handleDelete} />
<DetailContent data={data} />
```

### Pattern 3: Form Screen

```typescript
// Hook
const [formData, setFormData] = useState(initialValues);
const createMutation = useCreateItem();

const handleSubmit = useCallback(() => {
  createMutation.mutate(formData, {
    onSuccess: () => navigation.navigate('List'),
  });
}, [formData, createMutation, navigation]);

const handleFieldChange = useCallback((field: string, value: any) => {
  setFormData(prev => ({ ...prev, [field]: value }));
}, []);

// Screen
<FormHeader onCancel={navigation.goBack} onSubmit={handlers.handleSubmit} />
<FormFields data={formData} onChange={handlers.handleFieldChange} />
```

---

## State Patterns in Hook

### Loading State
```typescript
if (isLoading) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <EmptyState loading />
    </SafeAreaView>
  );
}
```

### Error State
```typescript
if (isError) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <EmptyState error={error?.message} onRetry={handlers.handleRefresh} />
    </SafeAreaView>
  );
}
```

### Success State
```typescript
return (
  <SafeAreaView style={styles.container}>
    <Header />
    <Filter />
    <List data={data} />
  </SafeAreaView>
);
```

---

## Migration Examples

### Before → After: useState Extraction

**Before:**
```typescript
const Screen = () => {
  const [count, setCount] = useState(0);  // ❌ In screen
  // ...
};
```

**After:**
```typescript
// Hook
export const useScreen = () => {
  const [count, setCount] = useState(0);  // ✅ In hook
  const increment = useCallback(() => setCount(c => c + 1), []);
  return { count, handlers: { increment } };
};

// Screen
const Screen = () => {
  const { count, handlers } = useScreen();  // ✅ Clean
};
```

---

### Before → After: Data Fetching

**Before:**
```typescript
const Screen = () => {
  const { data, isLoading } = useGetItems({ status: 'active' });  // ❌ Direct query
  // ...
};
```

**After:**
```typescript
// Hook
export const useScreen = () => {
  const [filter, setFilter] = useState('active');
  const filters = useMemo(() => ({ status: filter }), [filter]);  // ✅ Computed filters
  const { data, isLoading } = useGetItems(filters);
  return { data, isLoading, handlers: { setFilter } };
};

// Screen
const Screen = () => {
  const { data, isLoading, handlers } = useScreen();  // ✅ Hook abstraction
};
```

---

## Architecture Compliance

This refactoring pattern ensures compliance with:

| Rule | Before | After |
|------|--------|-------|
| Screen < 100 lines | ❌ 130-150 lines | ✅ 60-80 lines |
| Hook < 100 lines | N/A | ✅ 60-90 lines |
| No cross-feature imports | ❌ Often violated | ✅ Enforced |
| No business logic in screen | ❌ Mixed | ✅ Separated |
| No inline styles | ❌ StyleSheet.create | ✅ Imported |

---

## Quick Reference

### File Creation Order
1. `hooks/useScreenName.ts` - Extract logic
2. `ScreenName.styles.ts` - Extract styles
3. `components/ScreenName*.tsx` - Extract components
4. `hooks/index.ts` - Export hook
5. `components/index.ts` - Export components
6. `ScreenName.tsx` - Refactor screen

### Import Pattern
```typescript
// Screen imports
import React from 'react';
import { useScreenName } from './hooks';           // Hook
import { styles } from './ScreenName.styles';      // Styles
import { ComponentName } from './components';       // Components
```

### Hook Return Shape
```typescript
return {
  // State
  filter, activeTab, searchQuery,
  // Data
  data, items, processedData,
  // Loading states
  isLoading, isError, error, isFetching,
  // Handlers (grouped)
  handlers: {
    handleRefresh,
    handleItemPress,
    handleFilterChange,
    handleAction,
  },
};
```

---

## Troubleshooting

### "Cannot find module './hooks'"
→ Create `hooks/index.ts` and export the hook

### "Property 'X' does not exist on type..."
→ Add the property to the hook's return type definition

### "Too many re-renders"
→ Ensure handlers use `useCallback` with correct dependencies

### "Infinite loop"
→ Check that `useMemo` dependencies are stable

---

## Related Documentation

- [Architecture Guide](../ARCHITECTURE_GUIDE.md)
- [Feature-Based Architecture](../docs/adr/001-feature-based-architecture.md)
- [AGENTS.md](../AGENTS.md)
