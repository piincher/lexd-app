# Universal Links & Android App Links Setup Guide

## Overview

Your app now supports both **iOS Universal Links** and **Android App Links** using your domain `chinalinkexpress.com` hosted on Vercel.

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

Then replace `PLACEHOLDER_GET_FROM_GOOGLE_PLAY_CONSOLE_OR_KEYSTORE` in `assetlinks.json` with the actual fingerprint.

### vercel.json (headers configuration)

The included `vercel.json` ensures the AASA file is served with `Content-Type: application/json`. This is **critical** — Apple requires this exact content type.

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

**Method 3 — AASA Validation Tool**
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

---

## Step 6: App Store Review Readiness

### Apple Review Guidelines for Universal Links
- ✅ Real domain with HTTPS
- ✅ AASA file served at `/.well-known/apple-app-site-association`
- ✅ `Content-Type: application/json`
- ✅ Associated Domains entitlement enabled
- ✅ App handles the incoming URLs meaningfully

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

---

## Supported URL Patterns

| URL | Screen |
|-----|--------|
| `https://chinalinkexpress.com/home` | Home tab |
| `https://chinalinkexpress.com/dashboard` | Customer Dashboard |
| `https://chinalinkexpress.com/goods-list` | My Goods |
| `https://chinalinkexpress.com/goods/:id` | Goods Detail |
| `https://chinalinkexpress.com/goods/:id/edit` | Edit Goods |
| `https://chinalinkexpress.com/tracking/:id` | Container Tracking |
| `https://chinalinkexpress.com/order/:id` | Order Detail |
| `https://chinalinkexpress.com/ticket/:id` | Ticket Detail |
| `https://chinalinkexpress.com/support` | Support Tickets |
| `https://chinalinkexpress.com/notifications` | Notifications |
| `https://chinalinkexpress.com/payments` | Payments |
| `https://chinalinkexpress.com/faq` | FAQ |
| `https://chinalinkexpress.com/login` | Login |
| `https://chinalinkexpress.com/admin/*` | Admin screens |

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
2. Check `parseDeepLink` in `src/shared/hooks/useDeepLinks.ts` handles the path
3. Check React Navigation `screensConfig` has the route mapped

---

## Files Modified in This Setup

| File | Change |
|------|--------|
| `app.json` | Added `associatedDomains` (iOS) and `intentFilters` (Android) |
| `src/shared/lib/deepLinking.ts` | Added `https://` prefixes, custom `getInitialURL` and `subscribe` handlers |
| `src/shared/hooks/useDeepLinks.ts` | Updated `parseDeepLink` to strip `https://chinalinkexpress.com/` prefix |
| `.well-known/apple-app-site-association` | AASA file for Apple |
| `.well-known/assetlinks.json` | Android digital asset links file |
| `.well-known/vercel.json` | Vercel headers config for correct Content-Type |
