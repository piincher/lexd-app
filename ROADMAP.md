# LEXD - Feature Roadmap & Technical Debt

> **Last Updated**: April 2026  
> **Version**: 2.6.0  
> **Status**: Living Document - Updated as features are implemented

---

## 🔴 Critical Missing Features (P0 - Must Have)

### 1. Deep Linking / Universal Links
**Status**: ❌ Not Implemented  
**Priority**: P0  
**Effort**: Medium  
**Owner**: TBD

**Description**: Enable opening specific app screens from external URLs.

**Use Cases**:
- Share tracking links via WhatsApp/SMS
- Email notifications with direct links to orders
- Marketing campaigns linking to specific orders/containers
- Password reset links

**Implementation Notes**:
- Configure iOS Universal Links (`applinks:lexdservices.com`)
- Configure Android App Links
- Handle `getInitialURL()` and `Linking.addEventListener` in App.tsx
- Navigation param parsing for each route

**Files to Create/Modify**:
- `src/app/navigation/DeepLinkHandler.tsx`
- `app.json` - Add associated domains
- `android/app/src/main/AndroidManifest.xml`
- `ios/LEXD/LEXD.entitlements`

---

### 2. Biometric Authentication
**Status**: ❌ Not Implemented  
**Priority**: P0  
**Effort**: Low  
**Owner**: TBD

**Description**: Allow users to login with Face ID or Fingerprint.

**Requirements**:
- Enable/disable in Settings
- Fallback to PIN/Password
- Secure storage of biometric preference

**Dependencies**:
```bash
npx expo install expo-local-authentication
```

**Files to Create/Modify**:
- `src/features/auth/hooks/useBiometricAuth.ts`
- `src/features/profile/screens/SecuritySettingsScreen.tsx`
- `src/features/auth/components/BiometricLoginButton.tsx`

---

### 3. PDF Generation & Export
**Status**: 🚧 Partially Implemented (TODOs exist)  
**Priority**: P0  
**Effort**: High  
**Owner**: TBD

**Description**: Generate and share PDFs for invoices, packing lists, and receipts.

**Existing TODOs**:
- `src/features/admin/containers/utils/pdf.ts:12` - "Implement actual PDF generation"
- `src/features/admin/containers/utils/pdf.ts:27` - "Implement actual PDF sharing"

**Required PDFs**:
| Document | Status | Notes |
|----------|--------|-------|
| Packing List | 🚧 Stub only | Need html2canvas + jsPDF |
| Invoice | ❌ Not started | Auto-generate on payment |
| Receipt | ❌ Not started | For completed payments |
| Certificate | ❌ Not started | Verified shipper certificate |

**Dependencies**:
```bash
npm install jspdf html2canvas
# OR
npm install react-native-html-to-pdf
```

**Files to Create/Modify**:
- `src/shared/lib/pdfGenerator.ts` - Core PDF generation
- `src/shared/lib/pdfTemplates.ts` - HTML templates
- `src/features/admin/containers/utils/pdf.ts` - Update implementation
- `src/features/payments/components/InvoicePDF.tsx`

---

### 4. Push Notification Delivery (Backend)
**Status**: 🚧 TODO in Code  
**Priority**: P0  
**Effort**: Medium  
**Owner**: TBD

**Description**: Backend needs to actually send push notifications when order/container status changes.

**Current Issue**:
```javascript
// src/v2/services/orderService.js:390
// TODO: Send push notification if pushTokens exist
```

**Trigger Points**:
- Order status changes (Pending → Confirmed → Shipped → Delivered)
- Container loaded/unloaded
- Payment received
- Goods received at warehouse
- Customs clearance

**Implementation**:
- Use `expo-server-sdk` on backend
- Batch send for bulk operations
- Retry failed deliveries

**Files to Create/Modify**:
- `lexdbackend/src/v2/services/pushNotificationService.js`
- `lexdbackend/src/v2/services/notificationTriggers.js` - Add push calls

---

## 🟡 High Priority Features (P1 - Should Have)

### 5. Promo Code System (Customer Integration)
**Status**: 🚧 Components exist, not integrated  
**Priority**: P1  
**Effort**: Low  
**Owner**: TBD

**What's Done**:
- ✅ `PromoCodeInput` component
- ✅ Validation API (`useValidatePromo`)
- ✅ Admin promo management screen

**What's Missing**:
- ❌ Promo code input in Payment screen
- ❌ "Available Promos" screen for customers
- ❌ Promo code in order summary
- ❌ Discount calculation in payment flow

**Files to Create/Modify**:
- `src/features/payments/screens/PaymentScreen.tsx` - Add PromoCodeInput
- `src/features/customer/promos/screens/AvailablePromosScreen.tsx` - New
- `src/features/customer/promos/index.ts` - Export new screen

---

### 6. Referral System
**Status**: ❌ Not Implemented  
**Priority**: P1  
**Effort**: Medium  
**Owner**: TBD

**Description**: Allow users to invite friends and earn rewards.

**Requirements**:
- Unique referral code per user
- Share via WhatsApp/SMS/Copy
- Track successful referrals
- Reward both referrer and referee
- "My Referrals" screen showing stats

**Backend Requirements**:
- `referralCode` field on User model
- Referral tracking table
- Reward logic (points or discount)

**Files to Create**:
- `src/features/referral/screens/ReferralScreen.tsx`
- `src/features/referral/components/ReferralStats.tsx`
- `src/features/referral/hooks/useReferral.ts`
- `lexdbackend/src/v2/models/Referral.js`
- `lexdbackend/src/v2/routes/referralRoutes.js`

---

### 7. Real-Time Chat Support
**Status**: ❌ Not Implemented (Tickets only)  
**Priority**: P1  
**Effort**: High  
**Owner**: TBD

**Description**: Live chat with support agents instead of async tickets.

**Current State**: Ticket system exists but no real-time messaging.

**Requirements**:
- WebSocket connection for real-time messages
- Typing indicators
- Online/offline agent status
- File attachments (images)
- Push notifications for new messages
- Message read receipts

**Technical Options**:
1. **Socket.io** - Custom implementation
2. **Stream Chat** - Third-party service
3. **Firebase Firestore** - Real-time updates

**Files to Create**:
- `src/features/chat/screens/ChatScreen.tsx`
- `src/features/chat/components/MessageList.tsx`
- `src/features/chat/hooks/useChat.ts`
- `src/features/chat/services/chatSocket.ts`

---

### 8. Customer Insurance Options
**Status**: ❌ Not Implemented  
**Priority**: P1  
**Effort**: Medium  
**Owner**: TBD

**Description**: Allow customers to purchase shipping insurance.

**Requirements**:
- Insurance selection during order creation
- Coverage options (Basic, Premium)
- Cost calculation (% of declared value)
- Claims filing flow
- Insurance status tracking

**Backend Requirements**:
- Insurance model
- Claims model
- Integration with insurance provider (optional)

---

## 🟢 Medium Priority Features (P2 - Nice to Have)

### 9. Loyalty Points System
**Status**: 🚧 Badges exist, points don't  
**Priority**: P2  
**Effort**: High  
**Owner**: TBD

**Description**: Point-based loyalty program with tiers.

**Requirements**:
- Earn points per CBM shipped
- Tier levels (Bronze, Silver, Gold, Platinum)
- Tier benefits (discounts, priority support)
- Points redemption for discounts
- Points history

**Current State**: Badge system exists (`BadgesScreen.tsx`) but no points.

---

### 10. Multi-Currency Support
**Status**: ❌ Only FCFA supported  
**Priority**: P2  
**Effort**: Medium  
**Owner**: TBD

**Description**: Support USD, EUR alongside FCFA with conversion.

**Requirements**:
- Currency selector in settings
- Real-time exchange rates
- Store rates in backend
- Display prices in selected currency

---

### 11. Force Update Mechanism
**Status**: ❌ Not Implemented  
**Priority**: P2  
**Effort**: Low  
**Owner**: TBD

**Description**: Force users to update when critical updates are released.

**Implementation**:
- Check minimum version on app start
- Block app usage if version < minimum
- Link to App Store/Play Store

**Dependencies**:
```bash
npx expo install expo-application
npx expo install sp-react-native-in-app-updates
```

---

### 12. App Store Review Prompt
**Status**: ❌ Not Implemented  
**Priority**: P2  
**Effort**: Low  
**Owner**: TBD

**Description**: Prompt happy users to rate the app.

**Requirements**:
- Show after successful delivery
- Don't show too frequently
- Handle both App Store and Play Store

**Dependencies**:
```bash
npx expo install expo-store-review
```

---

### 13. Signature Capture (Proof of Delivery)
**Status**: ❌ Not Implemented  
**Priority**: P2  
**Effort**: Medium  
**Owner**: TBD

**Description**: Capture customer signature on delivery.

**Requirements**:
- Signature pad component
- Save signature image
- Attach to delivery confirmation

**Dependencies**:
```bash
npm install react-native-signature-canvas
# OR
npm install react-native-signature-pad
```

---

## 🛠️ Technical Debt & Architecture

### 14. Cross-Feature Import Violations
**Status**: 🚧 20 violations documented  
**Priority**: P1  
**Effort**: Medium  
**Owner**: TBD

**Problem**: Features import from other features, violating architecture rules.

**Violations List**:
| Importing File | Imported From | Item |
|----------------|---------------|------|
| `stats/screens/Stats.tsx` | `home` | `useGetOrderOfUserById` |
| `profile/screens/PastOrders.tsx` | `home` | `OrderList`, `useGetActiveOrder` |
| `orders/screens/Orders.tsx` | `home` | `ItemList` |
| `admin/tools/screens/AdminDashBoard.tsx` | `home` | `ItemList`, `RowDetails` |
| `admin/orders/screens/EditOrder.tsx` | `order-detail` | `useGetOrderDetails` |
| `order-detail/screens/*.tsx` | `chat` | `useChatClient` |

**Solution**: Move shared code to `shared/hooks/` or `shared/components/`.

**Documentation**: See `PHASE1_MIGRATION_PLAN.md`

---

### 15. Oversized Screens Refactoring
**Status**: 🚧 Multiple screens exceed limits  
**Priority**: P1  
**Effort**: High  
**Owner**: TBD

**Problem**: Screens exceed 100 lines, components exceed 150 lines.

| File | Lines | Target |
|------|-------|--------|
| `ContainerDetailScreen.tsx` | 1,573 | < 100 |
| `ClientPackingListScreen.tsx` | 1,524 | < 100 |
| `HomeScreen.tsx` | 1,358 | < 100 |
| `AssignGoodsScreen.tsx` | 1,126 | < 100 |
| `ContainerWaypointTracker` | 1,120 | < 150 |

**Documentation**: See `ARCHITECTURE_MIGRATION_PLAN.md`

---

### 16. Dark Mode Enablement
**Status**: 🚧 Theme system exists but disabled  
**Priority**: P2  
**Effort**: Low  
**Owner**: TBD

**Current State**: `app.json` has `userInterfaceStyle: "light"`

**Fix**: Change to `"automatic"` and test all screens.

---

### 17. Offline Mode Integration
**Status**: 🚧 Infrastructure exists, underutilized  
**Priority**: P2  
**Effort**: Medium  
**Owner**: TBD

**What's Done**:
- ✅ OfflineProvider
- ✅ Sync queue
- ✅ Background sync
- ✅ `useOfflineMutation` hook

**What's Missing**:
- ❌ Most features don't use offline mutations
- ❌ No offline indicators in most screens
- ❌ No conflict resolution UI

---

## 🔵 Backend Enhancements

### 18. Driver/Warehouse Management
**Status**: ❌ Not Implemented  
**Priority**: P2  
**Effort**: High  
**Owner**: TBD

**Description**: Manage drivers and warehouse locations.

**Requirements**:
- Driver model (name, phone, vehicle info)
- Assign drivers to containers
- Driver tracking (GPS)
- Warehouse location management
- Pickup scheduling

---

### 19. Customs Documentation Module
**Status**: ❌ Not Implemented  
**Priority**: P2  
**Effort**: Medium  
**Owner**: TBD

**Description**: Track and manage customs documentation.

**Requirements**:
- Customs declaration forms
- Document upload (PDF, images)
- Customs status tracking
- Duty calculation
- Hold/release notifications

---

### 20. ETA Change Notifications
**Status**: ❌ Not Implemented  
**Priority**: P2  
**Effort**: Low  
**Owner**: TBD

**Description**: Automatic notifications when container ETA changes.

**Trigger**: When waypoint dates are updated.

---

## 📊 Implementation Priority Matrix

```
Impact
  ▲
  │
  │  ┌─────────────┐  ┌─────────────┐
  │  │  Deep Link  │  │  Push Notif │
  │  │     ing     │  │    (P0)     │
  │  └─────────────┘  └─────────────┘
  │
  │  ┌─────────────┐  ┌─────────────┐
  │  │  Referral   │  │    Chat     │
  │  │    (P1)     │  │    (P1)     │
  │  └─────────────┘  └─────────────┘
  │
  │  ┌─────────────┐  ┌─────────────┐
  │  │   Loyalty   │  │   Multi-    │
  │  │   (P2)      │  │  currency   │
  │  └─────────────┘  └─────────────┘
  │
  │  ┌─────────────┐  ┌─────────────┐
  │  │  Signature  │  │   Force     │
  │  │   (P2)      │  │   Update    │
  │  └─────────────┘  └─────────────┘
  │
  └──────────────────────────────────────► Effort
     Low           Medium           High
```

---

## ✅ Recently Completed

| Feature | Version | Date |
|---------|---------|------|
| ClientCard loading skeleton | 2.6.0 | Apr 2026 |
| Push notification registration fix | 2.6.0 | Apr 2026 |
| Order validation bypass | 2.6.0 | Apr 2026 |
| Container status "DELIVERED" | 2.6.0 | Apr 2026 |
| Route data migration | 2.6.0 | Apr 2026 |
| Offline mode infrastructure | 2.5.0 | - |
| Promo code system (admin) | 2.5.0 | - |
| Campaign management | 2.5.0 | - |
| Customer dashboard | 2.5.0 | - |

---

## 📝 Notes

### Adding New Features
1. Create feature branch: `feature/FEATURE-NAME`
2. Update this document with status
3. Follow architecture rules in `AGENTS.md`
4. Use templates in `templates/`
5. Run `npm run check:architecture` before commit

### Definitions
- **P0**: Critical - Blocks major functionality
- **P1**: High - Important for business
- **P2**: Medium - Nice to have
- **P3**: Low - Would be good eventually

### Related Documentation
- `AGENTS.md` - Architecture rules
- `ARCHITECTURE_MIGRATION_PLAN.md` - Refactoring plan
- `PHASE1_MIGRATION_PLAN.md` - Cross-feature import fixes
- `OFFLINE_MODE_IMPLEMENTATION.md` - Offline features
- `MIGRATION_PLAN.md` - V2 consolidation

---

*This document is maintained by the development team. Update as features are implemented or priorities change.*
