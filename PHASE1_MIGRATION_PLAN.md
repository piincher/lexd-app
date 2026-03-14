# Phase 1: Cross-Feature Import Migration Plan

## Overview
Migrate cross-feature imports to follow architecture rules:
- Features should NOT import from other features
- Shared code goes to `shared/hooks/` or `shared/components/`

## Import Violations Found (20 total)

### Group A: home feature exports (8 violations)
| # | Importing File | Imported From | Item |
|---|----------------|---------------|------|
| 1 | stats/screens/Stats.tsx | home | useGetOrderOfUserById |
| 2 | profile/screens/PastOrders.tsx | home | OrderList, useGetActiveOrder |
| 3 | orders/screens/Orders.tsx | home | ItemList |
| 4 | admin/tools/screens/AdminDashBoard.tsx | home | ItemList |
| 5 | admin/tools/screens/AdminDashBoard.tsx | home | RowDetails |
| 6 | admin/tools/screens/AdminDashBoard.tsx | home | useViewSmsBalance |
| 7 | admin/users/screens/ClientDetail.tsx | home | useGetOrderOfUserById |
| 8 | admin/orders/screens/UserActiveOrders.tsx | home | UserHeaderInfo, useGetActiveOrders |
| 9 | admin/orders/screens/AddOrder.tsx | home | sendPushNotification |

### Group B: profile feature exports (2 violations)
| # | Importing File | Imported From | Item |
|---|----------------|---------------|------|
| 10 | stats/screens/Stats.tsx | profile | useGetCurrentUser |
| 11 | order-detail/screens/SeaShippingOrderDetails.tsx | profile | useBalance |

### Group C: chat feature exports (2 violations)
| # | Importing File | Imported From | Item |
|---|----------------|---------------|------|
| 12 | order-detail/screens/SeaShippingOrderDetails.tsx | chat | useChatClient |
| 13 | order-detail/screens/OrderDetails.tsx | chat | useChatClient |

### Group D: order-detail feature exports (2 violations)
| # | Importing File | Imported From | Item |
|---|----------------|---------------|------|
| 14 | admin/orders/screens/EditOrder.tsx | order-detail | useGetOrderDetails |
| 15 | admin/orders/screens/BatchUpdateDetail.tsx | order-detail | useGetSeaRoutes |

### Group E: routes feature exports (3 violations)
| # | Importing File | Imported From | Item |
|---|----------------|---------------|------|
| 16 | order-detail/screens/OrderDetails.tsx | routes | useGetRoutes |
| 17 | admin/orders/screens/ActiveOrders.tsx | routes | useGetRoutes |
| 18 | admin/orders/screens/ActiveOrderDetails.tsx | routes | useGetRoutes |

### Group F: goods feature exports (1 violation)
| # | Importing File | Imported From | Item |
|---|----------------|---------------|------|
| 19 | admin/goods/screens/GoodsDetailScreen.tsx | goods | StatusBadge |

### Group G: orders feature exports (1 violation)
| # | Importing File | Imported From | Item |
|---|----------------|---------------|------|
| 20 | admin/orders/screens/ActiveOrderDetails.tsx | orders | useGetOrderDetail |

## Migration Strategy

### Step 1: Create Shared Hooks
Create `shared/hooks/` for hooks used across features:
- useGetOrderOfUserById
- useGetActiveOrder
- useViewSmsBalance
- useGetCurrentUser
- useBalance
- useChatClient
- useGetOrderDetails
- useGetSeaRoutes
- useGetRoutes
- useGetOrderDetail
- sendPushNotification

### Step 2: Create Shared Components
Create `shared/components/` for UI components used across features:
- ItemList
- RowDetails
- OrderList
- UserHeaderInfo
- StatusBadge

### Step 3: Update Source Features
Update original features to export from shared locations

### Step 4: Update Importing Files
Update all 20 importing files to use shared locations

### Step 5: Clean Up
Remove exports from original locations (maintain backward compat via re-exports)
