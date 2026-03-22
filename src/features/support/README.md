# Support Feature

A production-ready FAQ and customer support feature for the ChinaLink Express mobile app.

## Structure

```
support/
├── api/              # API calls and mock data
├── components/       # Reusable UI components
├── hooks/            # Data fetching hooks
├── screens/          # Screen components
├── types/            # TypeScript types
└── README.md         # Documentation
```

## Features

- **Search**: Real-time search through FAQ items
- **Categories**: Filter by category (Shipping, Payment, Account, etc.)
- **Accordion**: Expand/collapse FAQ items with smooth animation
- **Empty State**: Show when no results found
- **Loading State**: Skeleton while loading
- **Contact Support**: Button to open support chat

## Architecture Compliance

- ✅ Screen file < 100 lines (composition only)
- ✅ Components < 150 lines each
- ✅ Hooks < 100 lines each
- ✅ No cross-feature imports (only shared/, entities/)
- ✅ SRP - Single Responsibility Principle

## Usage

```tsx
import { FAQScreen, useFAQ } from '@src/features/support';

// Use the screen
<FAQScreen />

// Use the hook
const { filteredData, isLoading, setSearchQuery, setCategory } = useFAQ();
```

## Integration

The FAQ screen is integrated into:
- PublicNavigator: Accessible without authentication
- Profile Screen: "FAQ" menu item in Support section
