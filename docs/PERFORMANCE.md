# Performance Guide

## Bundle Analysis

### Quick Commands

```bash
# Analyze current bundle (Expo)
npm run analyze:expo

# Traditional bundle analyzer (requires clean project state)
npm run analyze:bundle

# Platform specific
npm run analyze:ios
npm run analyze:android

# Check bundle size limits
node scripts/check-bundle-size.js
```

### Interpreting Results

The analyzer generates:
- Bundle size report with platform breakdown
- Dependency size analysis
- Performance budget compliance status

#### Understanding Bundle Types

| Type | Extension | Description | Compression |
|------|-----------|-------------|-------------|
| JavaScript | `.jsbundle`, `.android.bundle` | Raw JS bundle | gzip ~70% |
| Hermes Bytecode | `.hbc` | Precompiled bytecode | App Store compression ~50% |

**Note:** Hermes bytecode files appear larger than raw JS but compress better in the final app package.

### Current Bundle Analysis (Phase 2)

#### Baseline Measurements

| Platform | Type | Size | Status |
|----------|------|------|--------|
| iOS | Hermes (.hbc) | 6.84 MB | ⚠️ Approaching Limit |
| Android | Hermes (.hbc) | 6.82 MB | ⚠️ Approaching Limit |
| **Total** | - | **13.66 MB** | ⚠️ Review Needed |

#### Size Limits

| Bundle Type | Limit | Warning At | Current |
|-------------|-------|------------|---------|
| JavaScript | 3 MB | 2.55 MB | N/A |
| Hermes Bytecode | 8 MB | 6.8 MB | ~6.83 MB |

### Dependency Analysis

#### Largest Dependencies

| Dependency | Version | Size | Impact | Recommendation |
|------------|---------|------|--------|----------------|
| react-native | 0.83.2 | 20.31 MB | Core | Required |
| @sentry/react-native | ~7.11.0 | 6.86 MB | High | Acceptable for monitoring |
| react-native-reanimated | 4.2.1 | 3.72 MB | Medium | Required for animations |
| react-native-paper | ^5.12.3 | 3.59 MB | Medium | UI framework |
| axios | ^1.9.0 | 2.13 MB | Medium | Consider fetch API |
| expo | ~55.0.4 | 847.93 KB | Low | Core SDK |
| moti | ^0.30.0 | 760.38 KB | Medium | Animation library |
| @tanstack/react-query | ^5.37.1 | 713.04 KB | Low | State management |
| @react-navigation/native | ^6.1.18 | 303.7 KB | Low | Navigation |
| zustand | ^4.3.7 | 319.38 KB | Low | State management |
| react-native-gifted-charts | ^1.4.64 | 335.16 KB | Medium | Lazy load if possible |
| stream-chat-react-native | ^8.5.0 | 162.97 KB | Medium | Lazy load chat |

**Note:** Sizes are uncompressed node_modules sizes. Final bundle impact varies based on tree shaking and usage.

### Performance Budgets

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| App Launch (cold) | < 2s | 2-3s | > 3s |
| App Launch (warm) | < 1s | 1-2s | > 2s |
| Screen Transition | < 200ms | 200-400ms | > 400ms |
| API Response (p50) | < 100ms | 100-200ms | > 200ms |
| API Response (p95) | < 300ms | 300-500ms | > 500ms |
| List Scroll | 60fps | 30-55fps | < 30fps |
| Bundle Size (Hermes) | < 8 MB | 6.8-8 MB | > 8 MB |
| Final App Size (compressed) | < 30 MB | 30-50 MB | > 50 MB |

## Optimization Strategies

### 1. Code Splitting & Lazy Loading

```typescript
// Lazy load heavy screens
import { lazy, Suspense } from 'react';

const AdminDashboard = lazy(() => import('@src/features/admin/screens/AdminDashboardScreen'));
const ChatScreen = lazy(() => import('@src/features/chat/screens/ChatScreen'));
const AnalyticsScreen = lazy(() => import('@src/features/analytics/screens/AnalyticsScreen'));

// Use Suspense boundary
<Suspense fallback={<LoadingSpinner />}>
  <AdminDashboard />
</Suspense>
```

### 2. Tree Shaking

```typescript
// ❌ Bad - imports entire library
import _ from 'lodash';
import * as Icons from 'react-native-paper';

// ✅ Good - import only needed functions
import debounce from 'lodash/debounce';
import { Button, TextInput } from 'react-native-paper';

// ✅ Good - named imports with tree-shaking
import { format, parseISO } from 'date-fns';
```

### 3. Dependency Optimization

#### Candidates for Replacement

| Current | Alternative | Potential Savings |
|---------|-------------|-------------------|
| axios | fetch API | ~2 MB |
| formik | react-hook-form only | ~500 KB |
| moti | react-native-reanimated only | ~760 KB |

#### Implementation Priority

1. **High Priority:**
   - Audit and remove unused dependencies
   - Consolidate form libraries (Formik → React Hook Form)
   - Evaluate if both moti and reanimated are needed

2. **Medium Priority:**
   - Lazy load chat feature
   - Lazy load analytics/charts
   - Replace axios with fetch where possible

3. **Low Priority:**
   - Compress static assets
   - Optimize image loading

### 4. Asset Optimization

```typescript
// Use expo-image for optimized image loading
import { Image } from 'expo-image';

<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  contentFit="cover"
  cachePolicy="memory-disk"
  transition={200}
/>
```

Best practices:
- Use WebP format for images where possible
- Implement lazy loading for images below the fold
- Use SVG for icons instead of PNG
- Compress assets before inclusion

### 5. JavaScript Optimization

```javascript
// babel.config.js
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    'react-native-reanimated/plugin',
    // Remove console logs in production
    process.env.NODE_ENV === 'production' && 'transform-remove-console',
  ].filter(Boolean),
};
```

## Monitoring & CI Integration

### CI Checks

The CI pipeline runs bundle size checks automatically:

```yaml
- name: Check Bundle Size
  run: node scripts/check-bundle-size.js
```

### Pre-Release Checklist

- [ ] Run `npm run analyze:expo` and document sizes
- [ ] Verify no new large dependencies added
- [ ] Check bundle size against previous release
- [ ] Document any >10% size increases

### Bundle Size Tracking

Create a `BUNDLE_SIZE_HISTORY.md` to track changes:

```markdown
## Bundle Size History

| Date | iOS | Android | Notes |
|------|-----|---------|-------|
| 2026-03-12 | 6.84 MB | 6.82 MB | Phase 2 baseline |
```

## React Native Specific Optimizations

### Hermes Engine

- ✅ Already enabled for iOS and Android
- Reduces bundle size by 30-40% compared to JSC
- Improves startup time
- Precompiles JavaScript to bytecode

### Metro Bundler Configuration

See `metro.config.js` for:
- Tree shaking settings
- Module resolution
- Cache configuration

```javascript
// metro.config.js optimizations
const config = getDefaultConfig(__dirname);

// Enable tree shaking
config.transformer.minifierConfig = {
  keep_classnames: false,
  keep_fnames: false,
  mangle: {
    keep_classnames: false,
    keep_fnames: false,
  },
};
```

### Expo Updates

- OTA updates don't affect initial bundle size
- Consider using `expo-updates` for code splitting
- Enable asset optimization in `app.json`:

```json
{
  "expo": {
    "assetBundlePatterns": [
      "assets/images/*",
      "assets/fonts/*"
    ]
  }
}
```

## Current Optimization Opportunities

### Immediate Actions

1. **Remove duplicate dependencies:**
   - Consolidate Formik and React Hook Form
   - Evaluate if both Moti and Reanimated are needed

2. **Lazy load features:**
   - Admin dashboard (rarely used)
   - Analytics/charts (on-demand)
   - Chat interface (when entering chat)

3. **Replace heavy libraries:**
   - Axios → fetch API (where feasible)
   - Consider lighter alternatives for charts

### Estimated Impact

| Optimization | Estimated Savings | Priority |
|--------------|-------------------|----------|
| Remove Formik | ~500 KB | High |
| Remove Moti (if redundant) | ~760 KB | Medium |
| Replace Axios | ~2 MB | Medium |
| Lazy load chat | ~500 KB | High |
| Lazy load analytics | ~400 KB | Medium |
| **Total Potential** | **~4.2 MB** | - |

## Resources

- [React Native Performance Documentation](https://reactnative.dev/docs/performance)
- [Expo Performance Guide](https://docs.expo.dev/build-reference/migrating/)
- [Hermes Documentation](https://hermesengine.dev/)
- [Bundle Analyzer GitHub](https://github.com/IjzerenHein/react-native-bundle-visualizer)

---

*Last Updated: Phase 2 - Bundle Analysis Setup*
*Bundle Baseline: iOS 6.84 MB | Android 6.82 MB*
