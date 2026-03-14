# Architecture Decision Record: Feature-Based Architecture

## Context

The ChinaLink Express mobile application had grown to a point where the existing folder structure was becoming difficult to maintain:

- **Tight Coupling**: Components were importing from unrelated features
- **Unclear Boundaries**: Business logic mixed with UI components
- **Duplication**: Similar functionality implemented differently across features
- **Testing Difficulty**: Components with mixed responsibilities were hard to test in isolation
- **Onboarding Friction**: New developers struggled to understand where to place new code

The project needed an architecture that would:

1. Scale as the application grows
2. Make dependencies explicit and enforceable
3. Improve testability through better separation of concerns
4. Reduce cognitive load for developers

## Decision

We will adopt a **Feature-Based Architecture** inspired by Feature-Sliced Design (FSD) principles, with strict enforcement of:

### 1. Single Responsibility Principle (SRP)

- **Screens**: Layout composition only (< 100 lines)
- **Components**: UI rendering only (< 150 lines)
- **Hooks**: Data/business logic only (< 100 lines)
- **API**: HTTP calls only

### 2. Layer Structure

```
src/
├── app/              # App initialization, providers, navigation
├── entities/         # Business entities (User, Order, etc.)
├── features/         # User-facing features
│   ├── auth/         # Authentication feature
│   ├── orders/       # Order management feature
│   └── goods/        # Goods management feature
├── widgets/          # Complex reusable UI components
├── pages/            # Route pages (thin wrappers)
└── shared/           # Shared resources
    ├── api/          # API client configuration
    ├── ui/           # Design system components
    ├── lib/          # Utility functions
    └── constants/    # App constants
```

### 3. Import Rules

- `shared/` → Can only import from shared/
- `widgets/` → Can import from shared/
- `features/{A}/` → Can import from shared/, widgets/, entities/
- `features/{A}/` → **CANNOT** import from features/{B}/
- `entities/` → Can import from shared/
- `app/` → Can import from all layers

### 4. File Size Limits

| File Type  | Max Lines | Enforcement                       |
| ---------- | --------- | --------------------------------- |
| Screens    | 100       | ESLint warning + pre-commit check |
| Components | 150       | ESLint warning + pre-commit check |
| Hooks      | 100       | ESLint warning + pre-commit check |
| Services   | 200       | Code review                       |

## Consequences

### Positive

1. **Better Maintainability**: Each file has a single, clear responsibility
2. **Improved Testability**: Components can be tested in isolation with mocked props
3. **Easier Onboarding**: Clear folder structure and templates guide developers
4. **Reduced Coupling**: Features are independent and can be modified without affecting others
5. **Scalability**: New features follow established patterns
6. **Code Reuse**: Shared components are truly reusable without business logic

### Negative

1. **Initial Learning Curve**: Team needs to learn new patterns and constraints
2. **More Files**: Single responsibility creates more files (but smaller, focused ones)
3. **Strict Enforcement**: Requires discipline and tooling to maintain
4. **Migration Effort**: Existing code needs gradual refactoring

### Neutral

1. **Bundle Size**: No significant impact - tree shaking handles unused code
2. **Performance**: No runtime impact - architecture is compile-time only

## Migration Strategy

### Phase 1: Foundation (Complete)

- ✅ Created folder structure
- ✅ Established import rules
- ✅ Created templates for new code
- ✅ Set up ESLint rules for file size limits
- ✅ Created re-export files for backward compatibility

### Phase 2: Gradual Refactoring (Ongoing)

- Refactor screens as they are modified
- Extract shared/ui components incrementally
- Move hooks to feature folders
- No breaking changes - old imports still work

### Phase 3: Full Adoption (Future)

- Remove legacy folders
- Remove backward compatibility re-exports
- Archive old import patterns

## Templates

All new code should be created from templates:

- `templates/ScreenTemplate.tsx` - For new screens
- `templates/ComponentTemplate.tsx` - For new components
- `templates/ComponentTemplate.styles.ts` - For component styles
- `templates/HookTemplate.ts` - For new hooks

## Verification

Before committing, run:

```bash
npm run check:architecture
```

This checks:

- File size limits
- Import rule violations
- Prohibited patterns

## References

- [Feature-Sliced Design Documentation](https://feature-sliced.design/)
- [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)
- [React Architecture Patterns](https://reactpatterns.com/)

## Related Documents

- `templates/ScreenTemplate.tsx`
- `templates/ComponentTemplate.tsx`
- `templates/HookTemplate.ts`
- `AGENTS.md` - Development guidelines
