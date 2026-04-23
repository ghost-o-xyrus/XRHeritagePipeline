# Architectural Assumptions and Development Constraints

This document defines all major assumptions, constraints, architectural decisions, and development conventions currently established for the XR Heritage Pipeline Application.

The purpose of this document is to:

- prevent architectural drift
- reduce contributor confusion
- maintain implementation consistency
- avoid conflicting development approaches
- establish clear MVP boundaries
- preserve long-term scalability

All contributors should read this document before contributing code.

---

# 1. Core System Philosophy

The XR Heritage Pipeline Application is **NOT** intended to be:

- a fully autonomous XR scene generator
- a procedural world generation system
- a deep Unity editor automation framework
- a cloud-based platform
- a backend-heavy enterprise application

The application IS intended to be:

- a workflow-oriented desktop assistant
- a semi-automated workflow system
- a reusable XR project preparation framework
- a lightweight automation layer
- a structured pipeline navigation system

---

# 2. Automation Philosophy Assumptions

The system follows a **semi-automated workflow philosophy**.

This means:

### The application MAY automate:

- folder generation
- template copying
- project setup
- launching external tools
- reusable project preparation
- workflow guidance operations

### The application MUST NOT automatically:

- generate complete XR scenes
- perform autonomous scene layout
- make artistic decisions
- perform deep Unity scene editing
- automatically optimize models intelligently
- procedurally generate environments

Creative decisions remain user-controlled.

---

# 3. Technology Stack Assumptions

The application stack is fixed unless explicitly changed by maintainers.

## Frontend

- HTML
- CSS
- Vanilla JavaScript

### Assumption

We are intentionally NOT using:

- React
- Vue
- Angular
- Svelte

Reason:

- reduced complexity
- faster implementation
- lower dependency overhead
- easier contributor onboarding

---

## Desktop Framework

- Electron

Used for:

- desktop application shell
- filesystem access
- local automation
- launching external software

---

## Backend Runtime

- Node.js

Used for:

- filesystem operations
- automation helpers
- external process launching

---

## Workflow Storage

- JSON files

Used for:

- workflow definitions
- instructions
- pipeline structure
- helper action mappings

---

# 4. Architecture Assumptions

The architecture is intentionally layered.

Contributors MUST preserve layer separation.

---

## UI Layer

Responsible ONLY for:

- rendering
- interaction display
- navigation visuals

UI components MUST NOT directly manipulate filesystem operations.

---

## Logic Layer

Responsible for:

- workflow control
- navigation coordination
- state handling
- action routing

---

## Automation Layer

Responsible for:

- filesystem actions
- project setup
- external tool launching

Automation code MUST remain isolated from UI rendering systems.

---

## Workflow Data Layer

Workflow content MUST remain externalized in JSON.

Workflow instructions MUST NOT be hardcoded into UI components.

---

# 5. Electron Assumptions

Electron is currently used only as:

- application wrapper
- filesystem bridge
- desktop launcher

### Assumption

Most application logic should remain frontend-compatible where possible.

Reason:

This improves modularity and future portability.

---

# 6. Unity Integration Assumptions

The application DOES NOT directly manipulate Unity scenes.

The application MAY:

- generate folder structures
- install templates
- prepare starter projects

The application MUST NOT:

- edit Unity scene graphs directly
- inject scene objects automatically
- depend on Unity editor scripting initially

---

# 7. Blender Integration Assumptions

The application DOES NOT control Blender internally.

The application MAY:

- launch Blender
- assist workflows
- provide optimization instructions

Actual mesh editing remains user-controlled.

---

# 8. MVP Scope Assumptions

Current development target is:

# MVP VERSION 0.1

The current objective is to build:

- a visible application shell
- workflow navigation
- JSON-driven rendering
- pipeline switching
- step navigation
- instructional rendering
- fake helper buttons
- placeholder automation systems

---

## Explicitly OUT OF SCOPE right now

- advanced automation
- Unity integration systems
- real XR generation
- asset optimization engines
- photogrammetry processing
- AI systems
- procedural generation

---

# 9. Workflow Assumptions

Workflow pipelines are currently assumed to be:

- linear
- sequential
- non-branching

We are NOT implementing:

- workflow graphs
- dependency trees
- dynamic branching pipelines

---

# 10. State Management Assumptions

State management is intentionally lightweight.

We are NOT implementing:

- Redux
- global reactive stores
- complex synchronization systems

State should remain simple and modular.

---

# 11. File Structure Assumptions

Folder structure is considered part of the architecture.

Contributors should NOT arbitrarily reorganize directories.

Large structural changes must be discussed before implementation.

---

# 12. Styling Assumptions

The UI philosophy is:

- minimal
- readable
- structured
- workflow-oriented

We are NOT building:

- flashy UI systems
- animation-heavy interfaces
- game-like UI behavior

---

# 13. Offline-First Assumption

The application is designed primarily as:

- local-first
- offline-capable

The application currently assumes:

- no cloud backend
- no online authentication
- no remote database

---

# 14. Cross-Platform Assumptions

Primary development target currently:

- Windows desktop systems

Cross-platform compatibility is desirable but not primary during MVP development.

---

# 15. Contributor Assumptions

Contributors are expected to:

- preserve architecture boundaries
- avoid random dependency additions
- avoid introducing frameworks without approval
- maintain modularity
- document major changes

---

# 16. Dependency Assumptions

We intentionally minimize dependencies.

Before adding a dependency:

contributors should justify:

- why native JS cannot solve it
- why the dependency is necessary
- long-term maintenance impact

---

# 17. Naming Conventions

Current conventions:

## JavaScript Files

Use:

```plaintext
camelCase.js
```

Example:

```plaintext
workflowLoader.js
```

---

## CSS Files

Use descriptive lowercase names.

Example:

```plaintext
sidebar.css
```

---

## JSON Workflow Files

Use:

```plaintext
snake_case.json
```

Example:

```plaintext
asset_optimization.json
```

---

# 18. Git Workflow Assumptions

Contributors SHOULD use feature branches.

Example:

```plaintext
feature/sidebar-navigation
feature/workflow-rendering
feature/json-loader
```

Contributors SHOULD NOT commit directly to main whenever possible.

---

# 19. Documentation Assumptions

Major systems should be documented.

Complex logic should include:

- comments
- usage explanation
- expected inputs/outputs

---

# 20. Future Expansion Assumptions

The architecture is intentionally designed for future extension.

Possible future systems MAY include:

- advanced automation
- XR validation systems
- procedural augmentation systems
- Unity editor integration
- optimization validation tools

However:

future expansion MUST preserve modularity.

---

# 21. Most Important Assumption

The application prioritizes:

- implementation feasibility
- workflow clarity
- modularity
- maintainability
- scalability

over:

- excessive automation
- experimental architectures
- overengineering

---

# Final Contributor Rule

When implementing a feature:

contributors should always ask:

> Does this preserve the lightweight, modular, workflow-oriented philosophy of the application?

If not:

the implementation should be reconsidered.

---