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

3.  **Export from Feature Index**
    -   Open `src/features/index.js`.
    -   Add: `export { default as <FeatureName> } from './<FeatureName>';`

4.  **Register Route & Navigation**
    -   Open `src/App.jsx`.
    -   Import the new component from `./features`.
    -   Add entry to `MENU_GROUPS` with `id` (route path), `label` (display name), and `icon`.
    -   Add entry to `FEATURE_COMPONENTS` mapping the `id` to the component.

5.  **Update Documentation**
    -   Open `README.md`.
    -   Add the new feature to the "Features" table with a short description.

6.  **Verify**
    -   Run the dev server.
    -   Navigate to the new route.
    -   Check for console errors.

---

# Update/Rename Feature Workflow

When updating or renaming an existing feature, follow **all** steps below to avoid missing references.

## Steps

1.  **Rename/Update Component File**
    -   Rename `src/features/<OldName>.jsx` → `src/features/<NewName>.jsx` (or directory).
    -   Update component name and `export default` inside the file.

2.  **Update Feature Index**
    -   Open `src/features/index.js`.
    -   Update the export name and path.

3.  **Update App.jsx**
    -   Update the import statement.
    -   Update `MENU_GROUPS`: change `id` (route) and `label` (display name).
    -   Update `FEATURE_COMPONENTS`: change key and component reference.

4.  **Update Documentation**
    -   Open `README.md`.
    -   Update the feature name and description in the "Features" table.

5.  **Verify**
    -   Run the dev server.
    -   Navigate to the updated route.
    -   Check for console errors.
