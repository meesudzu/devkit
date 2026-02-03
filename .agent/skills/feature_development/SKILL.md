---
name: Feature Development
description: Guidelines and best practices for creating new features in the application.
---

# Feature Development Skill

This skill outlines the standards and practices for adding new features to the application.

## Core Principles (Senior Engineer Standards)
1.  **Clean Code**:
    -   **DRY (Don't Repeat Yourself)**: Extract usage patterns into reusable hooks or components.
    -   **SOLID**: Components should have a single responsibility.
    -   **Meaningful Naming**: Variables and functions should clearly describe their intent (e.g., `isModalOpen` vs `open`).
2.  **Component Structure**:
    -   **Small & Focused**: Break down large views into smaller sub-components.
    -   **Colocation**: Keep related styles, tests, and types close to the component.
3.  **Modern React**:
    -   Use Functional Components and Hooks.
    -   Avoid `useEffect` for derived state; use `useMemo` or simple derivation during render.

## Feature Structure
When creating a new feature, follow this directory structure:

```
src/features/<FeatureName>/
├── index.js          # Public API export
├── <FeatureName>.jsx # Main Feature Component
├── components/       # Sub-components specific to this feature
└── hooks/            # Custom hooks specific to this feature
```

## Routing
-   All new page-level features must be registered in the main router (typically `src/App.jsx` or a dedicated `routes` file).
-   Use lazy loading for page components to optimize bundle size:
    ```javascript
    const NewFeature = lazy(() => import('./features/NewFeature'));
    ```

## Implementation Checklist
-   [ ] Create feature directory.
-   [ ] Implement main component.
-   [ ] Add sub-components as needed.
-   [ ] Register route.
-   [ ] Verify responsiveness and styling (Tailwind CSS).
