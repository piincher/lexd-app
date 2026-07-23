# LEXD - Theme System Documentation

## Overview

The theme system provides comprehensive support for **Light**, **Dark**, and **System** (auto) modes throughout the app. It integrates with:
- React Native Paper (Material Design components)
- React Navigation (screen transitions)
- Status Bar (automatic style adjustment)
- Custom components (theme-aware styling)

## Quick Start

### 1. Wrap Your App with ThemeProvider

Already done in `App.tsx`:

```tsx
import { ThemeProvider } from '@src/providers';

const App = () => (
  <ThemeProvider>
    <YourApp />
  </ThemeProvider>
);
```

### 2. Use Theme in Components

```tsx
import { useAppTheme } from '@src/providers';

const MyComponent = () => {
  const { colors, isDark, toggleTheme } = useAppTheme();
  
  return (
    <View style={{ backgroundColor: colors.background.default }}>
      <Text style={{ color: colors.text.primary }}>
        Current theme: {isDark ? 'Dark' : 'Light'}
      </Text>
      <Button onPress={toggleTheme} title="Toggle Theme" />
    </View>
  );
};
```

## Theme Hook API

### `useAppTheme()`

Returns the complete theme context:

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';     // Current theme setting
  setTheme: (theme: ThemeMode) => void;   // Change theme
  isDark: boolean;                        // Is dark mode active
  toggleTheme: () => void;                // Toggle light/dark
  colors: ThemeColors;                    // Current color palette
  paperTheme: MD3Theme;                   // React Native Paper theme
  navigationTheme: NavigationTheme;       // React Navigation theme
  statusBarTheme: StatusBarTheme;         // Status bar configuration
}
```

### `useThemeStyles()`

Create dynamic styles based on theme:

```tsx
const styles = useThemeStyles((colors, isDark) => ({
  container: {
    backgroundColor: colors.background.default,
    padding: isDark ? 20 : 16,  // Different padding for dark mode
  },
  text: {
    color: colors.text.primary,
  },
}));
```

## Color Reference

### Primary Colors (Green)

| Token | Light | Dark |
|-------|-------|------|
| `colors.primary.main` | `#22C55E` | `#4ADE80` |
| `colors.primary.light` | `#4ADE80` | `#86EFAC` |
| `colors.primary.dark` | `#15803D` | `#22C55E` |

### Background Colors

| Token | Light | Dark |
|-------|-------|------|
| `colors.background.default` | `#FFFFFF` | `#0F172A` |
| `colors.background.paper` | `#F5F5F5` | `#1E293B` |
| `colors.background.card` | `#FFFFFF` | `#334155` |
| `colors.background.elevated` | `#FAFAFA` | `#475569` |

### Text Colors

| Token | Light | Dark |
|-------|-------|------|
| `colors.text.primary` | `#1F2937` | `#F9FAFB` |
| `colors.text.secondary` | `#6B7280` | `#D1D5DB` |
| `colors.text.disabled` | `#9CA3AF` | `#9CA3AF` |
| `colors.text.inverse` | `#FFFFFF` | `#1F2937` |

### Accent Colors (Gold & Red)

| Token | Light | Dark |
|-------|-------|------|
| `colors.accent.gold` | `#D4AF37` | `#F4D03F` |
| `colors.accent.goldLight` | `#F4D03F` | `#F7DC6F` |
| `colors.accent.red` | `#DC2626` | `#EF4444` |

### Semantic Colors

| Token | Light | Dark |
|-------|-------|------|
| `colors.status.success` | `#16A34A` | `#4ADE80` |
| `colors.status.warning` | `#D4AF37` | `#F4D03F` |
| `colors.status.error` | `#DC2626` | `#EF4444` |
| `colors.status.info` | `#3B82F6` | `#60A5FA` |

## Shadow Styles

```tsx
import { useShadowStyles } from '@src/hooks';

const Component = () => {
  const shadowStyle = useShadowStyles('md'); // 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'colored'
  
  return <View style={[styles.card, shadowStyle]} />;
};
```

## Border Radius & Spacing

```tsx
import { useBorderRadius, useSpacing } from '@src/hooks';

const Component = () => {
  const borderRadius = useBorderRadius(); // Access all border radius values
  const spacing = useSpacing(); // Access all spacing values
  
  return (
    <View style={{ 
      borderRadius: borderRadius.lg, 
      padding: spacing.md 
    }} />
  );
};
```

## Theme Components

### ThemeToggle

```tsx
import { ThemeToggle } from '@src/components/ThemeToggle';

// Icon button (toggles light/dark)
<ThemeToggle variant="icon" />

// Button with label
<ThemeToggle variant="button" />

// Full menu with system option
<ThemeToggle variant="menu" />
```

### StatusBar

```tsx
import { StatusBar } from '@src/components/StatusBar';

// Automatic based on theme
<StatusBar />

// Force specific style
<StatusBar style="dark" />

// With spacer for iOS
<StatusBar withSpacer />
```

## Migration Guide

### Step 1: Update Imports

**Before:**
```tsx
import { COLORS } from '@src/constants/Colors';
import { StyleSheet } from 'react-native';
```

**After:**
```tsx
import { useAppTheme } from '@src/providers';
import { StyleSheet } from 'react-native';
```

### Step 2: Convert Static Styles to Dynamic

**Before:**
```tsx
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 16,
  },
  text: {
    color: COLORS.blue,
  },
});

const MyComponent = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Hello</Text>
  </View>
);
```

**After:**
```tsx
const createStyles = (colors: any) => StyleSheet.create({
  container: {
    backgroundColor: colors.background.default,
    padding: 16,
  },
  text: {
    color: colors.primary.main,
  },
});

const MyComponent = () => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
    </View>
  );
};
```

### Step 3: Update Color References

| Old (COLORS) | New (Theme) |
|--------------|-------------|
| `COLORS.white` | `colors.background.default` |
| `COLORS.black` | `colors.text.primary` (inverse for backgrounds) |
| `COLORS.blue` | `colors.primary.main` |
| `COLORS.green` | `colors.primary.main` |
| `COLORS.gold` | `colors.accent.gold` |
| `COLORS.grey` | `colors.text.secondary` |
| `COLORS.lightBackground` | `colors.background.paper` |

### Step 4: Update React Native Paper Components

React Native Paper components automatically use the theme:

```tsx
import { Button, Card, TextInput } from 'react-native-paper';

// These automatically adapt to light/dark mode
<Button mode="contained">Press me</Button>
<Card>
  <Card.Title title="Title" />
  <Card.Content>
    <TextInput label="Input" />
  </Card.Content>
</Card>
```

### Step 5: Update Custom Components

For custom components, use the `colors` from `useAppTheme`:

```tsx
const CustomCard = ({ children }) => {
  const { colors } = useAppTheme();
  
  return (
    <View style={{
      backgroundColor: colors.background.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 12,
      padding: 16,
      // Use shadows from theme
      shadowColor: colors.primary.dark,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 4,
    }}>
      {children}
    </View>
  );
};
```

## Best Practices

### 1. Use `useMemo` for Styles

```tsx
const styles = React.useMemo(() => createStyles(colors), [colors]);
```

### 2. Avoid Hardcoded Colors

❌ Bad:
```tsx
<Text style={{ color: '#000' }}>Text</Text>
```

✅ Good:
```tsx
<Text style={{ color: colors.text.primary }}>Text</Text>
```

### 3. Use Semantic Colors

❌ Bad:
```tsx
<ErrorIcon color="#FF0000" />
```

✅ Good:
```tsx
<ErrorIcon color={colors.status.error} />
```

### 4. Handle Images for Dark Mode

```tsx
const { isDark } = useAppTheme();

<Image 
  source={isDark ? require('./logo-dark.png') : require('./logo-light.png')} 
/>
```

### 5. Use Paper Components When Possible

Paper components handle theming automatically:
- Button
- Card
- TextInput
- List
- Divider
- Appbar
- etc.

## Theme Persistence

The theme preference is automatically saved to AsyncStorage and restored on app launch. Users can select:

- **Light**: Always use light theme
- **Dark**: Always use dark theme  
- **System** (default): Follow device system setting

## Troubleshooting

### Flash of Wrong Theme

If you see a flash of the wrong theme on app launch, make sure:
1. `ThemeProvider` is wrapping your app
2. You're using the `isLoading` state properly

### Colors Not Updating

Make sure you're:
1. Using `useAppTheme()` inside a component
2. Not caching styles outside the component
3. Using `React.useMemo` for style creation

### Status Bar Not Matching

Use the `ThemeStatusBar` component:
```tsx
import { ThemeStatusBar } from '@src/components/StatusBar';

<ThemeStatusBar />
```

## Examples

### Card Component

```tsx
import { useCardStyles } from '@src/hooks';

const Card = ({ children }) => {
  const cardStyle = useCardStyles(true); // true = elevated
  
  return <View style={cardStyle}>{children}</View>;
};
```

### Text Component

```tsx
import { useTextStyles } from '@src/hooks';

const ThemedText = ({ variant = 'primary', children }) => {
  const textStyle = useTextStyles(variant);
  
  return <Text style={textStyle}>{children}</Text>;
};
```

### Gradient Background

```tsx
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers';

const GradientBackground = ({ children }) => {
  const { isDark, colors } = useAppTheme();
  
  return (
    <LinearGradient
      colors={isDark ? colors.gradients.dark : colors.gradients.primary}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
};
```

## File Structure

```
src/
├── constants/
│   └── Theme.ts           # Theme definitions
├── providers/
│   ├── ThemeProvider.tsx  # Theme context provider
│   └── index.ts           # Exports
├── hooks/
│   └── useTheme.ts        # Theme hooks
└── components/
    ├── ThemeToggle.tsx    # Theme toggle UI
    └── StatusBar.tsx      # Themed status bar
```

## Support

For questions or issues with the theme system, refer to:
- React Native Paper theming: https://callstack.github.io/react-native-paper/docs/guides/theming
- React Navigation theming: https://reactnavigation.org/docs/themes/
