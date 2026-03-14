# E2E Testing Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd chinalinexpress
npm install
```

### 2. Build the App

**iOS:**
```bash
npm run e2e:build:ios
```

**Android:**
```bash
npm run e2e:build:android
```

### 3. Run Tests

**iOS:**
```bash
npm run e2e:ios
```

**Android:**
```bash
npm run e2e:android
```

## 📁 Test Structure

```
e2e/
├── tests/
│   ├── auth.e2e.js           # Login, OTP, Logout
│   ├── containerDetail.e2e.js # Container management
│   ├── assignGoods.e2e.js     # Goods assignment
│   └── packingList.e2e.js     # Packing list generation
├── utils/
│   ├── selectors.js          # Element selectors
│   ├── commands.js           # Reusable commands
│   └── index.js              # Main exports
├── config.json               # Jest config
├── init.js                   # Test setup
└── environment.js            # Custom environment
```

## ✅ Test Coverage

| Flow | Scenarios | Time (est.) |
|------|-----------|-------------|
| Auth | Login, OTP, Logout, Session | ~3 min |
| Container Detail | View, Status Update, Actions | ~3 min |
| Assign Goods | Select, Search, Assign | ~2 min |
| Packing List | View, Print, Share | ~2 min |

**Total estimated runtime: < 10 minutes**

## 🔧 Configuration

### Test Data

Edit `e2e/utils/commands.js`:

```javascript
TEST_DATA = {
  validPhone: '76696177',    // Your test phone
  testOtpCode: '1234',        // Your test OTP
  adminPhone: '17865673',     // Admin test account
}
```

### Selectors

Add testIDs to your components:

```jsx
<Button 
  testID="continue-button"
  onPress={handlePress}
  title="Continue"
/>
```

## 📊 CI/CD

Tests run automatically on:
- Push to `main` or `develop`
- Pull requests to `main`

View results in GitHub Actions tab.

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Metro not running | Start with `npm start` |
| iOS build fails | Run `cd ios && pod install` |
| Android build fails | Clean with `cd android && ./gradlew clean` |
| Tests timeout | Increase timeout in `e2e/config.json` |
| Element not found | Check testID is correct |

## 📝 Adding New Tests

1. Add selectors to `utils/selectors.js`
2. Add commands to `utils/commands.js` (optional)
3. Create test file in `tests/`
4. Run tests to verify

Example test:

```javascript
import { waitForElement, tapById } from '../utils/selectors';

describe('New Feature', () => {
  it('should work', async () => {
    await waitForElement('my-button');
    await tapById('my-button');
    await expect(element(by.id('result'))).toBeVisible();
  });
});
```

## 📚 Resources

- Full docs: `e2e/README.md`
- Detox docs: https://wix.github.io/Detox/
