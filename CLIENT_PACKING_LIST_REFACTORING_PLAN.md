# ClientPackingListScreen Refactoring Plan

## Current State
- **Lines**: 1,524 (major violation)
- **State**: 4 useState
- **Handlers**: 10+ functions
- **Styles**: ~500 lines inline

## Target Structure

```
screens/ClientPackingList/
├── ClientPackingListScreen.tsx          # < 100 lines
├── ClientPackingListScreen.styles.ts    # All styles
├── hooks/
│   ├── index.ts
│   └── useClientPackingListScreen.ts    # All logic < 100 lines
└── components/
    ├── index.ts
    ├── PackingListHeader.tsx            # App bar with actions
    ├── PackingListSummary.tsx           # Container summary card
    ├── PackingListConsignee.tsx         # Consignee info section
    ├── PackingListGoods.tsx             # Goods list table
    ├── PackingListFooter.tsx            # Download/share actions
    ├── ContactDialog.tsx                # Contact consignee dialog
    ├── LoadingState.tsx                 # Loading skeleton
    └── ErrorState.tsx                   # Error state
```

## Atomic Tasks for 100 Agents

### Group 1: Hook & Styles (2 tasks)
1. Create useClientPackingListScreen hook
2. Create ClientPackingListScreen.styles.ts

### Group 2: Main Components (6 tasks)
3. Create PackingListHeader component
4. Create PackingListSummary component
5. Create PackingListConsignee component
6. Create PackingListGoods component
7. Create PackingListFooter component
8. Create ContactDialog component

### Group 3: State Components (2 tasks)
9. Create LoadingState component
10. Create ErrorState component

### Group 4: Integration (4 tasks)
11. Create hooks/index.ts
12. Create components/index.ts
13. Refactor main screen
14. Verify and test
