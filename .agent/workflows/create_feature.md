---
description: Create a new feature with component structure and routing
---

# Create New Feature Workflow

This workflow guides the creation of a new feature, ensuring all necessary files and configurations are in place.

## Steps

1.  **Create Directory Structure**
    -   Create the directory `src/features/<FeatureName>`
    -   Create subdirectories `components` and `hooks` if anticipated, otherwise keep flat for simple features.

2.  **Create Main Component**
    -   Create `src/features/<FeatureName>/<FeatureName>.jsx`.
    -   Apply standard boilerplate (imports, component definition, export).
    -   Implement initial UI or placeholder.

3.  **Register Route**
    -   Open `src/App.jsx` (or main router file).
    -   Import the new component (consider `React.lazy`).
    -   Add a `<Route>` entry for the new feature.
    -   *Example*: `<Route path="/<feature-path>" element={<FeatureName />} />`

4.  **Add Navigation (Optional)**
    -   If the feature should be accessible from the main menu, add a link to `src/layouts/Header.jsx` (or Sidebar).

5.  **Verify**
    -   Run the dev server.
    -   Navigate to the new route.
    -   Check for console errors.
