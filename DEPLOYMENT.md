# LEXD — Production Deployment Guide

## Overview

This project uses **EAS (Expo Application Services)** for production builds, store submissions, and OTA updates. This guide covers the complete deployment pipeline for iOS App Store and Google Play Store.

---

## Prerequisites

### Required Accounts & Credentials

| Service | Account | What You Need |
|---------|---------|---------------|
| **Expo** | expo.dev | `EXPO_TOKEN` for CI/CD automation |
| **Apple Developer** | developer.apple.com | Team ID (`CZCJLA5GHT`), ASC API Key (`.p8`) |
| **Google Play Console** | play.google.com/console | Service Account JSON, keystore |
| **Vercel** | vercel.com | Domain hosting for AASA & Asset Links |

### Local Setup

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo
eas login

# Verify project is linked
eas project:info
```

---

## Build Profiles

Defined in `eas.json`:

| Profile | Purpose | Output | Distribution |
|---------|---------|--------|--------------|
| `development` | Dev client with Expo DevTools | Debug APK/IPA | Internal (EAS internal) |
| `preview` | QA testing, feature previews | APK + IPA | Internal (EAS internal) |
| `staging` | Production-like testing | APK + IPA | Internal (EAS internal) |
| `production` | App Store / Play Store release | AAB + IPA | Store submission |

### Build Commands

```bash
# Development build (with DevTools)
eas build --profile development --platform android
eas build --profile development --platform ios

# Preview build (internal QA)
eas build --profile preview --platform android
eas build --profile preview --platform ios

# Staging build (production-like testing)
eas build --profile staging --platform android
eas build --profile staging --platform ios

# Production build (store release)
eas build --profile production --platform android
eas build --profile production --platform ios

# Production build + submit (one command)
eas build --profile production --platform android --submit
eas build --profile production --platform ios --submit

# Build both platforms at once
eas build --profile production
```

---

## Android Production Build

### Configuration Highlights

- **Build type:** `app-bundle` (AAB) — required for Play Store
- **Minification:** Enabled via ProGuard
- **Resource shrinking:** Enabled — removes unused assets
- **Cleartext traffic:** Disabled — forces HTTPS
- **Allow backup:** Disabled — prevents sensitive data backup
- **Google Services:** Firebase config via `google-services.json`

### Pre-Build Checklist (Android)

- [ ] `google-services.json` is present and valid
- [ ] `assetlinks.json` SHA256 fingerprint matches Play Console → App Integrity → App Signing
- [ ] `vercel.json` deployed to Vercel root (not just repo)
- [ ] `google-play-service-account.json` placed in `keys/` directory
- [ ] Version bump not needed (EAS `autoIncrement` handles it)

### Build & Submit

```bash
# Build AAB
eas build --profile production --platform android

# Submit to Play Store Internal track
eas submit --platform android --profile production

# Or combined
eas build --profile production --platform android --submit
```

### Play Store Release Tracks

| Track | Purpose | How to Promote |
|-------|---------|----------------|
| `internal` | Immediate testing (up to 100 testers) | Manual in Play Console |
| `closed` | Closed beta (selected testers) | Promote from Internal |
| `open` | Open beta (anyone with link) | Promote from Closed |
| `production` | Public release | Promote from Open/Internal |

To change the submission track, edit `eas.json`:
```json
"android": {
  "serviceAccountKeyPath": "./keys/google-play-service-account.json",
  "track": "closed"
}
```

---

## iOS Production Build

### Configuration Highlights

- **Bundle ID:** `com.nuvotech.lexd`
- **Team ID:** `CZCJLA5GHT`
- **ASC App ID:** `6503253700`
- **Associated Domains:** `applinks:lexdservices.com`, `applinks:www.lexdservices.com`
- **Background modes:** `remote-notification`, `fetch`

### Pre-Build Checklist (iOS)

- [ ] Apple Developer Portal: Associated Domains capability enabled for App ID
- [ ] Provisioning profiles regenerated after capability change
- [ ] AASA file deployed and accessible at `https://lexdservices.com/.well-known/apple-app-site-association`
- [ ] AASA returns `Content-Type: application/json`
- [ ] ASC API Key (`.p8`) placed in `keys/` directory
- [ ] `eas credentials` configured (or EAS manages them automatically)

### Build & Submit

```bash
# Build IPA
eas build --profile production --platform ios

# Submit to App Store Connect
eas submit --platform ios --profile production

# Or combined
eas build --profile production --platform ios --submit

# Shortcut: Build + TestFlight
easc build --profile production --platform ios --submit
```

### App Store Release

1. EAS submits to App Store Connect
2. Go to [App Store Connect](https://appstoreconnect.apple.com)
3. Select the build → Add to a new version
4. Fill in release notes, screenshots, metadata
5. Submit for review

---

---

## Credentials & Keys Setup

### Directory Structure

```
chinalinexpress/
  keys/
    AuthKey_XXXXXX.p8           # Apple App Store Connect API Key
    google-play-service-account.json  # Google Play service account
    .gitignore                  # keys/ should be gitignored
```

### Apple App Store Connect API Key

1. Go to [App Store Connect](https://appstoreconnect.apple.com) → Users & Access → Keys
2. Create a new key with **App Manager** role
3. Download the `.p8` file
4. Copy Key ID and Issuer ID
5. Place in `keys/` and update `eas.json`:
   ```json
   "ascApiKeyPath": "./keys/AuthKey_XXXXXX.p8",
   "ascApiKeyIssuerId": "YOUR_ISSUER_ID",
   "ascApiKeyId": "YOUR_KEY_ID"
   ```

### Google Play Service Account

1. Go to [Google Play Console](https://play.google.com/console) → Setup → API access
2. Link a Google Cloud project
3. Create a service account with **Release Manager** role
4. Download JSON key
5. Place in `keys/` and update `eas.json`:
   ```json
   "serviceAccountKeyPath": "./keys/google-play-service-account.json"
   ```

### Expo Access Token (Optional)

Only needed if you set up CI/CD later. For manual builds, you don't need this.

---

## Troubleshooting

### Build fails with "commit required"

`eas.json` has `requireCommit: true`. Stage and commit your changes before building:
```bash
git add -A
git commit -m "Prepare production build"
eas build --profile production
```

### Android: "autoVerify failed"

1. Verify `assetlinks.json` SHA256 matches Play Console
2. Check Content-Type: `curl -I https://lexdservices.com/.well-known/assetlinks.json`
3. Re-verify on device: `adb shell pm verify-app-links --re-verify com.nuvotech.lexd`

### iOS: "Universal link opens Safari"

1. Check AASA accessibility: `curl https://lexdservices.com/.well-known/apple-app-site-association`
2. Check Content-Type is `application/json`
3. iOS caches AASA — uninstall app, wait 5 minutes, reinstall
4. Verify Associated Domains capability in Apple Developer Portal

### EAS Update not received by app

1. Check channel matches: `eas update:list`
2. Ensure app was built with matching runtime version
3. Check `updates.url` in `app.json` points to correct EAS project

---

## Files Reference

| File | Purpose |
|------|---------|
| `eas.json` | EAS build profiles, submit config |
| `app.json` | Expo config, plugins, native settings |
| `.eas/workflows/build-and-submit.yml` | EAS-native CI/CD pipeline |
| `.github/workflows/eas-build.yml` | GitHub Actions build & submit |
| `.github/workflows/eas-update.yml` | GitHub Actions OTA updates |
| `.well-known/apple-app-site-association` | iOS Universal Links |
| `.well-known/assetlinks.json` | Android App Links |
| `.well-known/vercel.json` | Vercel headers config |
| `UNIVERSAL_LINK_SETUP.md` | Deep linking setup & testing |
