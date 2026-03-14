# V2 Consolidation Migration Plan

## Current State
- v2 features are actively exported from `admin/index.ts`
- Non-v2 directories exist alongside v2
- Nested duplicate exists: `admin/goods/goods/`
- v2 is the source of truth

## Goal
Move v2 features to main locations and delete all duplicates

## Features to Migrate
1. **consignees**: v2/consignees → consignees (replace)
2. **containers**: v2/containers → containers (replace)
3. **goods**: v2/goods → goods (replace, delete nested goods/goods/)
4. **routes**: v2/routes → routes (replace)

## Dependencies
- goods → containers (useGetAllContainers)
- Some screens import from v2 directly

## Execution Order
1. First: Commit current changes
2. Parallel: Analyze each feature pair
3. Sequential by dependency: containers → goods → consignees → routes
4. Update: Main exports and navigation
5. Cleanup: Delete v2 folder
6. Verify: Type check and test
