---
description: "Repository coding instructions for VS Code Copilot in Solid-Native"
---

# Solid-Native Copilot Instructions

## Import conventions
- Prefer @/ alias for modules inside src (example: @/components/BottomIconNavBar).
- Avoid deep relative imports when @/ is available.
- Use relative imports for same-folder modules only.
- When moving files, update imports consistently to prevent unresolved modules.

## Alias consistency
- Keep alias setup synchronized in both tsconfig.json and vite.config.ts.
- Do not introduce a new alias in one config without updating the other.

## Change hygiene
- Keep edits focused and minimal.
- Preserve existing component behavior unless the task explicitly asks for behavior changes.
