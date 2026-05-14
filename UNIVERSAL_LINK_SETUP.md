# Universal Links & Android App Links Setup Guide

## Overview

Your app supports both **iOS Universal Links** and **Android App Links** using your domain `chinalinkexpress.com` hosted on Vercel.

---

## Step 1: Deploy the AASA & Asset Links Files to Vercel

Copy these files from this repo into your Vercel website project:

### Files to copy
```
.well-known/apple-app-site-association
.well-known/assetlinks.json
vercel.json
```

Place them in your Vercel project like this:
```
your-vercel-project/
  public/
    .well-known/
      apple-app-site-association
      assetlinks.json
  vercel.json
```

> **Note:** Vercel serves files in `public/` at the root. So `public/.well-known/apple-app-site-association` becomes `https://chinalinkexpress.com/.well-known/apple-app-site-association`.

### Before you deploy — Update assetlinks.json

The `assetlinks.json` file has a **placeholder** for your Android signing certificate SHA256 fingerprint.

**Option A — Get from Google Play Console (recommended)**
1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app → Setup → App integrity → App signing
3. Copy the **SHA-256 certificate fingerprint**

**Option B — Get from your keystore**
```bash
keytool -list -v -keystore your-keystore.jks -alias your-alias
```

Then replace the fingerprint in `assetlinks.json` with the actual value.

> **CRITICAL:** If the SHA256 fingerprint does not match your Google Play signing certificate exactly, Android App Links will fail verification silently and users will see a browser chooser dialog instead of opening your app directly.

### vercel.json (headers configuration)

The included `vercel.json` ensures both files are served with `Content-Type: application/json`. This is **critical** — Apple and Google both require this exact content type.

Deploy to Vercel:
```bash
vercel --prod
```

---

## Step 2: Verify the Files Are Accessible

After deploying, verify these URLs return the correct content:

### Apple AASA
```bash
curl -I https://chinalinkexpress.com/.well-known/apple-app-site-association
```
Expected:
- HTTP 200
- `Content-Type: application/json`
- No redirects

### Android Asset Links
```bash
curl -I https://chinalinkexpress.com/.well-known/assetlinks.json
```
Expected:
- HTTP 200
- `Content-Type: application/json`

---

## Step 3: Apple Developer Portal Configuration

You **must** enable the Associated Domains capability in your Apple Developer account.

1. Go to [Apple Developer Portal](https://developer.apple.com)
2. Certificates, Identifiers & Profiles → Identifiers
3. Find your app ID: `com.nuvotech.chinalinkexpress`
4. Click **Edit**
5. Check **Associated Domains**
6. Save

Then regenerate your provisioning profiles:
- Development profile
- Distribution/App Store profile

> **Important:** If you use EAS Build, run `eas build` after this change and EAS will handle the entitlement automatically.

---

## Step 4: Rebuild the App

### iOS
```bash
cd chinalinexpress
eas build --platform ios --profile production
```

The `app.json` already includes:
```json
"associatedDomains": [
  "applinks:chinalinkexpress.com",
  "applinks:www.chinalinkexpress.com"
]
```

### Android
```bash
cd chinalinexpress
eas build --platform android --profile production
```

The `app.json` already includes the `intentFilters` with `autoVerify: true`.

---

## Step 5: Test Universal Links

### iOS Testing

**Method 1 — Safari Test**
1. Install the app on a physical device (Universal Links don't work in Simulator)
2. Open Safari
3. Type: `https://chinalinkexpress.com/goods/YOUR_GOODS_ID`
4. You should see a banner at the top saying "Open in ChinaLinkExpress"
5. Tap it — the app should open to the goods detail screen

**Method 2 — Notes App Test**
1. Paste `https://chinalinkexpress.com/dashboard` in Apple Notes
2. Tap the link
3. It should open directly in the app (no Safari intermediate)

**Method 3 — Share Token Test (Critical)**
1. Paste `https://chinalinkexpress.com/s/abc123` in Apple Notes
2. Tap the link
3. It should open directly in the app to the shared shipment screen

**Method 4 — AASA Validation Tool**
Use Apple's validation tool:
```bash
# On Mac with Xcode installed
xcrun simctl openurl booted "https://chinalinkexpress.com/home"
```

Or use this online validator:
https://branch.io/resources/aasa-validator/

### Android Testing

**Method 1 — ADB Test**
```bash
adb shell am start -W -a android.intent.action.VIEW -d "https://chinalinkexpress.com/home" com.nuvotech.chinalinkexpress
```

**Method 2 — Verify Digital Asset Links**
```bash
adb shell pm verify-app-links --re-verify com.nuvotech.chinalinkexpress
```

Check the status:
```bash
adb shell pm get-app-links com.nuvotech.chinalinkexpress
```
You should see `chinalinkexpress.com` listed with `legacy_failure: false`.

**Method 3 — Share Token Test**
```bash
adb shell am start -W -a android.intent.action.VIEW -d "https://chinalinkexpress.com/s/abc123" com.nuvotech.chinalinkexpress
```

---

## Step 6: App Store Review Readiness

### Apple Review Guidelines for Universal Links
- ✅ Real domain with HTTPS
- ✅ AASA file served at `/.well-known/apple-app-site-association`
- ✅ `Content-Type: application/json`
- ✅ Associated Domains entitlement enabled
- ✅ App handles the incoming URLs meaningfully
- ✅ All declared paths open specific content (not just home screen)
- ✅ API paths excluded with `NOT` rules

### Google Play Review Guidelines for App Links
- ✅ Real domain with HTTPS
- ✅ Asset Links served at `/.well-known/assetlinks.json`
- ✅ `Content-Type: application/json`
- ✅ `autoVerify: true` in manifest
- ✅ App handles all declared URL paths meaningfully

### What the reviewer will check
If your app claims to support Universal Links (via the Associated Domains entitlement), the reviewer may:
1. Tap a link like `https://chinalinkexpress.com/home` on a device with your app installed
2. Verify the app opens instead of Safari
3. Check that the app shows relevant content for that URL

### Common rejection reasons to avoid
- ❌ AASA file returns 404 or redirect
- ❌ AASA has wrong Content-Type (e.g., `text/plain`)
- ❌ Links open Safari instead of the app
- ❌ App doesn't handle the linked content meaningfully
- ❌ AASA declares paths the app doesn't actually handle

---

## Supported URL Patterns

### Public (No Auth Required)
| URL | Screen |
|-----|--------|
| `https://chinalinkexpress.com/` | Home |
| `https://chinalinkexpress.com/home` | Home tab |
| `https://chinalinkexpress.com/login` | Login |
| `https://chinalinkexpress.com/verify` | Verification |
| `https://chinalinkexpress.com/faq` | FAQ |
| `https://chinalinkexpress.com/about` | About us |
| `https://chinalinkexpress.com/s/:token` | **Shared Shipment** |
| `https://chinalinkexpress.com/demo` | Guest demo |
| `https://chinalinkexpress.com/demo-preview` | Demo preview |
| `https://chinalinkexpress.com/onboarding` | Onboarding |

### Customer (Auth Required)
| URL | Screen |
|-----|--------|
| `https://chinalinkexpress.com/dashboard` | Customer Dashboard |
| `https://chinalinkexpress.com/containers` | My Containers |
| `https://chinalinkexpress.com/goods-list` | My Goods |
| `https://chinalinkexpress.com/goods/:id` | Goods Detail |
| `https://chinalinkexpress.com/goods/:id/edit` | Edit Goods |
| `https://chinalinkexpress.com/tracking/:id` | Container Tracking |
| `https://chinalinkexpress.com/order/:id` | Order Detail |
| `https://chinalinkexpress.com/ticket/:id` | Ticket Detail |
| `https://chinalinkexpress.com/support` | Support Tickets |
| `https://chinalinkexpress.com/support/new` | Create Ticket |
| `https://chinalinkexpress.com/notifications` | Notifications |
| `https://chinalinkexpress.com/payments` | Payments |
| `https://chinalinkexpress.com/payments/:id` | Payment Detail |
| `https://chinalinkexpress.com/route-check` | Route Check |
| `https://chinalinkexpress.com/scan` | Scan QR |
| `https://chinalinkexpress.com/scan-qr` | Scan QR |
| `https://chinalinkexpress.com/batch/:data` | Batch Update |
| `https://chinalinkexpress.com/active-order/:id` | Active Order |
| `https://chinalinkexpress.com/user-orders/:type` | User Orders |
| `https://chinalinkexpress.com/outstanding` | Outstanding Payments |
| `https://chinalinkexpress.com/shipping` | Shipping |
| `https://chinalinkexpress.com/shipping/method` | Shipping Method |
| `https://chinalinkexpress.com/clients` | Clients |
| `https://chinalinkexpress.com/clients/:id` | Client Details |
| `https://chinalinkexpress.com/receive` | Receive Goods |
| `https://chinalinkexpress.com/consignees` | Consignees |
| `https://chinalinkexpress.com/consignees/new` | Create Consignee |
| `https://chinalinkexpress.com/consignees/:id` | Consignee Detail |
| `https://chinalinkexpress.com/routes` | Routes |
| `https://chinalinkexpress.com/routes/form` | Route Form |
| `https://chinalinkexpress.com/unassigned` | Unassigned Goods |
| `https://chinalinkexpress.com/whatsapp` | WhatsApp Requests |
| `https://chinalinkexpress.com/campaigns` | Campaigns |
| `https://chinalinkexpress.com/campaigns/new` | Create Campaign |
| `https://chinalinkexpress.com/announcements/new` | Create Announcement |
| `https://chinalinkexpress.com/search` | Global Search |
| `https://chinalinkexpress.com/badges` | Badges |
| `https://chinalinkexpress.com/reviews` | My Reviews |
| `https://chinalinkexpress.com/promos` | Promos |
| `https://chinalinkexpress.com/activity` | Activity |
| `https://chinalinkexpress.com/packing/:id` | Packing List |
| `https://chinalinkexpress.com/loading/:id` | Loading List |
| `https://chinalinkexpress.com/certificate` | Certificate |
| `https://chinalinkexpress.com/past-orders` | Past Orders |
| `https://chinalinkexpress.com/stats` | Stats |

### Admin (Auth Required)
| URL | Screen |
|-----|--------|
| `https://chinalinkexpress.com/admin/*` | Admin screens |
| `https://chinalinkexpress.com/admin-goods/*` | Admin Goods |
| `https://chinalinkexpress.com/admin-containers/*` | Admin Containers |

---

## Pre-Release Checklist

### Before every production release:

- [ ] **Verify AASA file size** — Must be under 128KB (currently ~6KB)
- [ ] **Verify AASA Content-Type** — `curl -I https://chinalinkexpress.com/.well-known/apple-app-site-association`
- [ ] **Verify Asset Links Content-Type** — `curl -I https://chinalinkexpress.com/.well-known/assetlinks.json`
- [ ] **Verify SHA256 fingerprint** — Compare `assetlinks.json` fingerprint with Google Play Console → App Integrity → App Signing
- [ ] **Test share token on iOS** — Paste `https://chinalinkexpress.com/s/TEST` in Notes, tap it
- [ ] **Test share token on Android** — `adb shell am start -a android.intent.action.VIEW -d "https://chinalinkexpress.com/s/TEST"`
- [ ] **Test customer deep link on iOS** — `https://chinalinkexpress.com/tracking/TEST_ID`
- [ ] **Test customer deep link on Android** — `https://chinalinkexpress.com/tracking/TEST_ID`
- [ ] **Verify Android autoVerify** — `adb shell pm get-app-links com.nuvotech.chinalinkexpress` should show `legacy_failure: false`

---

## Troubleshooting

### iOS: Link opens Safari instead of app
1. Check AASA file is accessible: `curl https://chinalinkexpress.com/.well-known/apple-app-site-association`
2. Check Content-Type is `application/json`
3. Check Associated Domains entitlement is enabled in Apple Developer Portal
4. Check `app.json` has the correct `associatedDomains` values
5. Rebuild and reinstall the app
6. **Note:** iOS caches the AASA file. To force refresh:
   - Install app → open it → put in background → toggle airplane mode → tap link
   - Or uninstall app → wait a few minutes → reinstall

### Android: Link opens browser instead of app
1. Check `assetlinks.json` has the correct SHA256 fingerprint
2. Run: `adb shell pm verify-app-links --re-verify com.nuvotech.chinalinkexpress`
3. Check: `adb shell pm get-app-links com.nuvotech.chinalinkexpress`
4. Make sure `autoVerify: true` is in `app.json` intentFilters

### Both: App opens but shows wrong screen
1. Check the URL path matches the linking config in `src/shared/lib/deepLinking.ts`
2. Check `parseDeepLink` in `src/shared/lib/parseDeepLink.ts` handles the path
3. Check React Navigation `screensConfig` has the route mapped

---

## Files Modified in This Setup

| File | Change |
|------|--------|
| `app.json` | Added `associatedDomains` (iOS) and `intentFilters` (Android) |
| `src/shared/lib/deepLinking.ts` | Added `https://` prefixes, custom `getInitialURL` and `subscribe` handlers |
| `src/shared/lib/parseDeepLink.ts` | Parses both custom scheme and universal link URLs |
| `.well-known/apple-app-site-association` | AASA file for Apple — includes all customer + share token routes + API exclusions |
| `.well-known/assetlinks.json` | Android digital asset links file |
| `.well-known/vercel.json` | Vercel headers config for correct Content-Type |
