# Bundle Analysis Report

**Date:** 2026-03-12  
**Phase:** Phase 2 - Bundle Analysis Setup  
**Reporter:** Automated Bundle Analysis

---

## Executive Summary

| Metric | Value | Status |
|--------|-------|--------|
| iOS Bundle Size | 6.84 MB | ⚠️ Approaching Limit |
| Android Bundle Size | 6.82 MB | ⚠️ Approaching Limit |
| Total Bundle Size | 13.66 MB | ⚠️ Review Recommended |
| Bundle Limit | 8 MB (Hermes) | 85% utilized |

**Status:** Bundles are within acceptable limits but approaching the 8MB threshold. Recommend monitoring and optimization.

---

## Detailed Analysis

### Platform Breakdown

#### iOS Bundle
- **Size:** 6.84 MB
- **Type:** Hermes Bytecode (.hbc)
- **Path:** `_expo/static/js/ios/AppEntry-*.hbc`
- **Status:** ⚠️ Warning (85.5% of limit)

#### Android Bundle
- **Size:** 6.82 MB
- **Type:** Hermes Bytecode (.hbc)
- **Path:** `_expo/static/js/android/AppEntry-*.hbc`
- **Status:** ⚠️ Warning (85.3% of limit)

### Understanding the Numbers

**Hermes Bytecode vs Raw JavaScript:**
- Hermes bytecode files appear larger than raw JavaScript bundles
- However, they compress significantly better in the app store
- Typical compression: 50-70% reduction in final app size
- Startup performance is improved with Hermes

**Estimated Final App Sizes:**
- iOS: ~6.84 MB → ~2.0-3.4 MB (compressed)
- Android: ~6.82 MB → ~2.0-3.4 MB (compressed)

---

## Dependency Analysis

### Top Dependencies by Size

| Dependency | Version | Disk Size | Bundle Impact | Priority |
|------------|---------|-----------|---------------|----------|
| react-native | 0.83.2 | 20.31 MB | Core | Required |
| @sentry/react-native | ~7.11.0 | 6.86 MB | High | Monitoring |
| react-native-reanimated | 4.2.1 | 3.72 MB | Medium | Required |
| react-native-paper | ^5.12.3 | 3.59 MB | Medium | UI Framework |
| axios | ^1.9.0 | 2.13 MB | Medium | Replaceable |
| expo | ~55.0.4 | 847.93 KB | Low | Core SDK |
| moti | ^0.30.0 | 760.38 KB | Medium | Evaluate |
| @tanstack/react-query | ^5.37.1 | 713.04 KB | Low | State Mgmt |
| zustand | ^4.3.7 | 319.38 KB | Low | State Mgmt |
| react-native-gifted-charts | ^1.4.64 | 335.16 KB | Low | Lazy Load |
| stream-chat-react-native | ^8.5.0 | 162.97 KB | Medium | Lazy Load |

**Note:** Disk size ≠ Bundle impact. Tree shaking and actual usage affect final bundle size.

### Dependency Concerns

#### 1. Duplicate/Overlapping Libraries
- **Formik + React Hook Form:** Both form libraries present
  - Formik: Used in some legacy screens
  - React Hook Form: Used in new screens
  - **Recommendation:** Migrate all to React Hook Form, remove Formik

#### 2. Animation Libraries
- **Reanimated + Moti:** Potential overlap
  - Reanimated: Core animation library
  - Moti: Animation wrapper around Reanimated
  - **Recommendation:** Evaluate if Moti features can be replaced with Reanimated directly

#### 3. HTTP Client
- **Axios (2.13 MB):** Large HTTP client
  - **Recommendation:** Replace with fetch API for simple requests
  - **Potential savings:** ~1.5-2 MB

---

## Optimization Opportunities

### High Priority

| Opportunity | Estimated Savings | Effort | Impact |
|-------------|-------------------|--------|--------|
| Remove Formik | ~500 KB | Medium | High |
| Lazy load chat feature | ~500 KB | Low | High |
| Replace Axios with fetch | ~1.5-2 MB | Medium | Medium |
| **Total High Priority** | **~2.5-3 MB** | - | - |

### Medium Priority

| Opportunity | Estimated Savings | Effort | Impact |
|-------------|-------------------|--------|--------|
| Evaluate Moti usage | ~760 KB | Medium | Medium |
| Lazy load analytics/charts | ~400 KB | Low | Medium |
| Optimize image assets | ~200-500 KB | Low | Low |
| **Total Medium Priority** | **~1.4-1.7 MB** | - | - |

### Combined Potential
- **Total estimated savings:** ~4-5 MB
- **Resulting bundle size:** ~2-3 MB
- **Status improvement:** ⚠️ → ✅

---

## Recommendations

### Immediate Actions (This Sprint)

1. **Add Bundle Size Monitoring**
   - ✅ Completed: Scripts created
   - ✅ Completed: CI integration
   - ✅ Completed: Documentation

2. **Remove Formik**
   - Identify all screens using Formik
   - Migrate to React Hook Form
   - Remove Formik dependency
   - **Expected savings:** ~500 KB

3. **Lazy Load Chat**
   - Chat is not used on app startup
   - Implement dynamic import for chat screens
   - **Expected savings:** ~500 KB from initial bundle

### Short Term (Next 2 Sprints)

1. **Replace Axios**
   - Audit all API calls
   - Create fetch-based API client
   - Gradually migrate endpoints
   - **Expected savings:** ~1.5-2 MB

2. **Evaluate Moti**
   - Review Moti usage across the app
   - Determine if Reanimated can replace it
   - **Potential savings:** ~760 KB

### Long Term (Ongoing)

1. **Asset Optimization**
   - Implement WebP for all images
   - Use expo-image with proper caching
   - Compress fonts if applicable

2. **Code Splitting**
   - Implement route-based code splitting
   - Lazy load admin features
   - Lazy load analytics

---

## Monitoring Plan

### CI Integration
- Bundle size check runs on every PR
- Warnings at 85% of limit (6.8 MB)
- Errors at 100% of limit (8 MB)

### Release Checklist
- [ ] Run `npm run analyze:expo` before release
- [ ] Document bundle sizes in release notes
- [ ] Compare with previous release
- [ ] Investigate any >10% increases

### Alerts
- Bundle size increases >500 KB in single PR
- New dependency >1 MB added
- Total bundle approaching 8 MB limit

---

## Appendix

### Tools Used

1. **react-native-bundle-visualizer**
   - Generates interactive treemap
   - Shows module-level breakdown
   - Platform-specific analysis

2. **Custom Expo Analysis Script**
   - `scripts/analyze-bundle-expo.js`
   - Analyzes Hermes bytecode bundles
   - Dependency size reporting

3. **Bundle Size Check**
   - `scripts/check-bundle-size.js`
   - CI-integrated size validation
   - Supports multiple bundle formats

### Running Analysis

```bash
# Full analysis
npm run analyze:expo

# Check size limits
node scripts/check-bundle-size.js

# Traditional analyzer (if clean project state)
npm run analyze:bundle
```

### References

- [Hermes Engine](https://hermesengine.dev/)
- [React Native Performance](https://reactnative.dev/docs/performance)
- [Expo Bundle Analysis](https://docs.expo.dev/build-reference/migrating/)

---

*Report generated automatically by Bundle Analysis System*
