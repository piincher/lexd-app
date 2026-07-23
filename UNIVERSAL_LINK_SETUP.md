# Universal Links & Android App Links Setup Guide

## Overview

Your app supports both **iOS Universal Links** and **Android App Links** using your domain `lexdservices.com` hosted on Vercel.

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

> **Note:** Vercel serves files in `public/` at the root. So `public/.well-known/apple-app-site-association` becomes `https://lexdservices.com/.well-known/apple-app-site-association`.

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
curl -I https://lexdservices.com/.well-known/apple-app-site-association
```
Expected:
- HTTP 200
- `Content-Type: application/json`
- No redirects

### Android Asset Links
```bash
curl -I https://lexdservices.com/.well-known/assetlinks.json
```
Expected:
- HTTP 200
- `Content-Type: application/json`

---

## Step 3: Apple Developer Portal Configuration

You **must** enable the Associated Domains capability in your Apple Developer account.

1. Go to [Apple Developer Portal](https://developer.apple.com)
2. Certificates, Identifiers & Profiles → Identifiers
3. Find your app ID: `com.nuvotech.lexd`
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
  "applinks:lexdservices.com",
  "applinks:www.lexdservices.com"
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
3. Type: `https://lexdservices.com/goods/YOUR_GOODS_ID`
4. You should see a banner at the top saying "Open in LEXD"
5. Tap it — the app should open to the goods detail screen

**Method 2 — Notes App Test**
1. Paste `https://lexdservices.com/dashboard` in Apple Notes
2. Tap the link
3. It should open directly in the app (no Safari intermediate)

**Method 3 — Share Token Test (Critical)**
1. Paste `https://www.lexdservices.com/s/abc123` in Apple Notes
2. Tap the link
3. It should open directly in the app to the shared shipment screen

**Method 4 — AASA Validation Tool**
Use Apple's validation tool:
```bash
# On Mac with Xcode installed
xcrun simctl openurl booted "https://lexdservices.com/home"
```

Or use this online validator:
https://branch.io/resources/aasa-validator/

### Android Testing

**Method 1 — ADB Test**
```bash
adb shell am start -W -a android.intent.action.VIEW -d "https://lexdservices.com/home" com.nuvotech.lexd
```

**Method 2 — Verify Digital Asset Links**
```bash
adb shell pm verify-app-links --re-verify com.nuvotech.lexd
```

Check the status:
```bash
adb shell pm get-app-links com.nuvotech.lexd
```
You should see `lexdservices.com` listed with `legacy_failure: false`.

**Method 3 — Share Token Test**
```bash
adb shell am start -W -a android.intent.action.VIEW -d "https://www.lexdservices.com/s/abc123" com.nuvotech.lexd
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
1. Tap a link like `https://lexdservices.com/home` on a device with your app installed
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
| `https://lexdservices.com/` | Home |
| `https://lexdservices.com/home` | Home tab |
| `https://lexdservices.com/login` | Login |
| `https://lexdservices.com/verify` | Verification |
| `https://lexdservices.com/faq` | FAQ |
| `https://lexdservices.com/about` | About us |
| `https://www.lexdservices.com/s/:token` | **Shared Shipment** |
| `https://lexdservices.com/demo` | Guest demo |
| `https://lexdservices.com/demo-preview` | Demo preview |
| `https://lexdservices.com/onboarding` | Onboarding |

### Customer (Auth Required)
| URL | Screen |
|-----|--------|
| `https://lexdservices.com/dashboard` | Customer Dashboard |
| `https://lexdservices.com/containers` | My Containers |
| `https://lexdservices.com/goods-list` | My Goods |
| `https://lexdservices.com/goods/:id` | Goods Detail |
| `https://lexdservices.com/goods/:id/edit` | Edit Goods |
| `https://lexdservices.com/tracking/:id` | Container Tracking |
| `https://lexdservices.com/order/:id` | Order Detail |
| `https://lexdservices.com/ticket/:id` | Ticket Detail |
| `https://lexdservices.com/support` | Support Tickets |
| `https://lexdservices.com/support/new` | Create Ticket |
| `https://lexdservices.com/notifications` | Notifications |
| `https://lexdservices.com/payments` | Payments |
| `https://lexdservices.com/payments/:id` | Payment Detail |
| `https://lexdservices.com/route-check` | Route Check |
| `https://lexdservices.com/scan` | Scan QR |
| `https://lexdservices.com/scan-qr` | Scan QR |
| `https://lexdservices.com/batch/:data` | Batch Update |
| `https://lexdservices.com/active-order/:id` | Active Order |
| `https://lexdservices.com/user-orders/:type` | User Orders |
| `https://lexdservices.com/outstanding` | Outstanding Payments |
| `https://lexdservices.com/shipping` | Shipping |
| `https://lexdservices.com/shipping/method` | Shipping Method |
| `https://lexdservices.com/clients` | Clients |
| `https://lexdservices.com/clients/:id` | Client Details |
| `https://lexdservices.com/receive` | Receive Goods |
| `https://lexdservices.com/consignees` | Consignees |
| `https://lexdservices.com/consignees/new` | Create Consignee |
| `https://lexdservices.com/consignees/:id` | Consignee Detail |
| `https://lexdservices.com/routes` | Routes |
| `https://lexdservices.com/routes/form` | Route Form |
| `https://lexdservices.com/unassigned` | Unassigned Goods |
| `https://lexdservices.com/whatsapp` | WhatsApp Requests |
| `https://lexdservices.com/campaigns` | Campaigns |
| `https://lexdservices.com/campaigns/new` | Create Campaign |
| `https://lexdservices.com/announcements/new` | Create Announcement |
| `https://lexdservices.com/search` | Global Search |
| `https://lexdservices.com/badges` | Badges |
| `https://lexdservices.com/reviews` | My Reviews |
| `https://lexdservices.com/promos` | Promos |
| `https://lexdservices.com/activity` | Activity |
| `https://lexdservices.com/packing/:id` | Packing List |
| `https://lexdservices.com/loading/:id` | Loading List |
| `https://lexdservices.com/certificate` | Certificate |
| `https://lexdservices.com/past-orders` | Past Orders |
| `https://lexdservices.com/stats` | Stats |

### Admin (Auth Required)
| URL | Screen |
|-----|--------|
| `https://lexdservices.com/admin/*` | Admin screens |
| `https://lexdservices.com/admin-goods/*` | Admin Goods |
| `https://lexdservices.com/admin-containers/*` | Admin Containers |

---

## Pre-Release Checklist

### Before every production release:

- [ ] **Verify AASA file size** — Must be under 128KB (currently ~6KB)
- [ ] **Verify AASA Content-Type** — `curl -I https://lexdservices.com/.well-known/apple-app-site-association`
- [ ] **Verify Asset Links Content-Type** — `curl -I https://lexdservices.com/.well-known/assetlinks.json`
- [ ] **Verify SHA256 fingerprint** — Compare `assetlinks.json` fingerprint with Google Play Console → App Integrity → App Signing
- [ ] **Test share token on iOS** — Paste `https://www.lexdservices.com/s/TEST` in Notes, tap it
- [ ] **Test share token on Android** — `adb shell am start -a android.intent.action.VIEW -d "https://www.lexdservices.com/s/TEST"`
- [ ] **Test customer deep link on iOS** — `https://lexdservices.com/tracking/TEST_ID`
- [ ] **Test customer deep link on Android** — `https://lexdservices.com/tracking/TEST_ID`
- [ ] **Verify Android autoVerify** — `adb shell pm get-app-links com.nuvotech.lexd` should show `legacy_failure: false`

---

## Troubleshooting

### iOS: Link opens Safari instead of app
1. Check AASA file is accessible: `curl https://lexdservices.com/.well-known/apple-app-site-association`
2. Check Content-Type is `application/json`
3. Check Associated Domains entitlement is enabled in Apple Developer Portal
4. Check `app.json` has the correct `associatedDomains` values
5. Rebuild and reinstall the app
6. **Note:** iOS caches the AASA file. To force refresh:
   - Install app → open it → put in background → toggle airplane mode → tap link
   - Or uninstall app → wait a few minutes → reinstall

### Android: Link opens browser instead of app
1. Check `assetlinks.json` has the correct SHA256 fingerprint
2. Run: `adb shell pm verify-app-links --re-verify com.nuvotech.lexd`
3. Check: `adb shell pm get-app-links com.nuvotech.lexd`
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
