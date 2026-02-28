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

## Implementation Checklist (New Feature)
-   [ ] Create feature directory.
-   [ ] Implement main component.
-   [ ] Add sub-components as needed.
-   [ ] Export from `src/features/index.js`.
-   [ ] Register route and navigation in `src/App.jsx` (`MENU_GROUPS` + `FEATURE_COMPONENTS`).
-   [ ] Verify responsiveness and styling (Tailwind CSS).
-   [ ] Update `README.md` to include the new feature in the features list.

## Update/Rename Checklist
When updating or renaming an existing feature, ensure **all** of the following are updated:
-   [ ] Rename/update the component file (`src/features/<FeatureName>.jsx` or `src/features/<FeatureName>/`).
-   [ ] Update component name and `export default` inside the file.
-   [ ] Update export in `src/features/index.js`.
-   [ ] Update `src/App.jsx`:
    -   [ ] Import statement.
    -   [ ] `MENU_GROUPS` — update `id` (route) and `label` (display name).
    -   [ ] `FEATURE_COMPONENTS` — update key and component reference.
-   [ ] Update `README.md` — feature name and description in the features table.
