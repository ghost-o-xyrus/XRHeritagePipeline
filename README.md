# XR Heritage Pipeline

A workflow-oriented desktop application for preparing XR-ready heritage visualization environments using reusable pipelines, lightweight automation systems, and XR project preparation frameworks.

##  Running the Project

Follow the steps below to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/ghost-o-xyrus/XRHeritagePipeline.git
cd <project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Project

```bash
npm run
```

---

# Overview

The XR Heritage Pipeline Application is designed as a semi-automated workflow assistant for XR heritage visualization projects.

The system focuses on:

- structured workflow guidance
- reusable XR project preparation
- lightweight automation systems
- Unity XR starter project generation
- asset optimization workflows
- interaction layer integration

The architecture is intentionally:

- modular
- lightweight
- template-driven
- implementation-feasible
- easy to extend
- collaborative-development friendly

---

# Technology Stack

| Technology | Purpose |
|---|---|
| Electron | Desktop application framework |
| Node.js | Backend logic and automation |
| HTML/CSS/JavaScript | Frontend UI system |
| JSON | Workflow data storage |
| Unity | XR scene integration |
| Blender | Asset optimization workflows |
| Meshroom / WebODM | Photogrammetry workflows |

---

# Repository Architecture

```plaintext
XR-Heritage-Pipeline/
│
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
├── LICENSE
│
├── electron/
├── src/
├── data/
├── automation/
├── integrations/
├── templates/
├── assets/
├── docs/
├── tests/
└── scripts/
```

---

# Root Files

## `package.json`

- **Language:** JSON
- Defines Electron + Node.js dependencies, npm scripts, build commands, and application metadata.
- Depends on Electron runtime and npm ecosystem.

---

## `package-lock.json`

- **Language:** JSON
- Locks dependency versions for consistent builds across contributors.

---

## `README.md`

- **Language:** Markdown
- Main project documentation and contributor onboarding guide.

---

## `.gitignore`

- **Language:** Git Config
- Prevents temporary files, build artifacts, and generated assets from being committed.

---

## `LICENSE`

- **Language:** Text
- Defines repository licensing and usage permissions.

---

# Electron Layer

```plaintext
electron/
│
├── main.js
├── preload.js
├── ipc/
│   ├── actionRouter.js
│   └── ipcChannels.js
└── window/
    └── createWindow.js
```

---

## `electron/main.js`

- **Language:** JavaScript (Electron + Node.js)
- Main Electron entry point responsible for app lifecycle and window initialization.
- Depends on Electron APIs.

---

## `electron/preload.js`

- **Language:** JavaScript
- Secure bridge exposing backend functionality to frontend renderer processes.
- Uses Electron `contextBridge`.

---

## `electron/ipc/actionRouter.js`

- **Language:** JavaScript
- Routes frontend helper-action requests to backend automation handlers.
- Depends on Electron IPC and automation modules.

---

## `electron/ipc/ipcChannels.js`

- **Language:** JavaScript
- Central registry for IPC event channel names.

---

## `electron/window/createWindow.js`

- **Language:** JavaScript
- Creates and configures the Electron application window.

---

# Frontend Application Layer

```plaintext
src/
│
├── index.html
├── styles/
├── renderer/
├── components/
├── logic/
├── state/
└── utils/
```

---

# Main Frontend Entry

## `src/index.html`

- **Language:** HTML
- Main application layout containing:
  - top navigation
  - sidebar navigation
  - content panel
  - status area

---

# Styles

```plaintext
src/styles/
│
├── main.css
├── layout.css
├── sidebar.css
├── navigation.css
├── contentPanel.css
├── buttons.css
└── statusbar.css
```

---

## `main.css`

- **Language:** CSS
- Global typography and application styling rules.

---

## `layout.css`

- **Language:** CSS
- Defines overall application layout structure.

---

## `sidebar.css`

- **Language:** CSS
- Styles workflow sidebar navigation components.

---

## `navigation.css`

- **Language:** CSS
- Styles top pipeline navigation bar.

---

## `contentPanel.css`

- **Language:** CSS
- Styles instructional workflow content rendering.

---

## `buttons.css`

- **Language:** CSS
- Styles helper automation buttons and controls.

---

## `statusbar.css`

- **Language:** CSS
- Styles bottom workflow status area.

---

# Renderer System

```plaintext
src/renderer/
│
├── appRenderer.js
├── pipelineRenderer.js
├── stepRenderer.js
├── checklistRenderer.js
├── actionRenderer.js
└── statusRenderer.js
```

---

## `appRenderer.js`

- **Language:** JavaScript
- Initializes frontend rendering systems and UI orchestration logic.

---

## `pipelineRenderer.js`

- **Language:** JavaScript
- Renders pipeline navigation and manages pipeline switching.

---

## `stepRenderer.js`

- **Language:** JavaScript
- Renders workflow step content from JSON workflow files.

---

## `checklistRenderer.js`

- **Language:** JavaScript
- Renders workflow checklists and completion states.

---

## `actionRenderer.js`

- **Language:** JavaScript
- Renders helper automation buttons and binds action events.

---

## `statusRenderer.js`

- **Language:** JavaScript
- Updates workflow status display and progress indicators.

---

# UI Components

```plaintext
src/components/
│
├── topNavigation.js
├── sidebar.js
├── contentPanel.js
├── helperButtons.js
└── statusBar.js
```

---

## `topNavigation.js`

- **Language:** JavaScript
- Handles top-level pipeline navigation interactions.

---

## `sidebar.js`

- **Language:** JavaScript
- Manages workflow step navigation rendering and interactions.

---

## `contentPanel.js`

- **Language:** JavaScript
- Controls workflow instruction display in the main content panel.

---

## `helperButtons.js`

- **Language:** JavaScript
- Handles helper automation button interactions.

---

## `statusBar.js`

- **Language:** JavaScript
- Displays workflow progress and active pipeline information.

---

# Application Logic Layer

```plaintext
src/logic/
│
├── workflowLoader.js
├── pipelineManager.js
├── stepManager.js
├── navigationController.js
├── actionDispatcher.js
└── validationManager.js
```

---

## `workflowLoader.js`

- **Language:** JavaScript
- Loads and parses workflow JSON files from the data layer.

---

## `pipelineManager.js`

- **Language:** JavaScript
- Controls active pipeline state and transitions.

---

## `stepManager.js`

- **Language:** JavaScript
- Manages active workflow step state.

---

## `navigationController.js`

- **Language:** JavaScript
- Coordinates navigation interactions between pipelines and steps.

---

## `actionDispatcher.js`

- **Language:** JavaScript
- Routes frontend actions to Electron IPC automation systems.

---

## `validationManager.js`

- **Language:** JavaScript
- Handles workflow validation and checklist verification logic.

---

# State Management

```plaintext
src/state/
│
├── appState.js
├── pipelineState.js
└── uiState.js
```

---

## `appState.js`

- **Language:** JavaScript
- Stores global application state shared across systems.

---

## `pipelineState.js`

- **Language:** JavaScript
- Tracks workflow progression and active pipeline state.

---

## `uiState.js`

- **Language:** JavaScript
- Stores temporary UI interaction states.

---

# Utility Helpers

```plaintext
src/utils/
│
├── fileUtils.js
├── jsonUtils.js
├── logger.js
└── pathUtils.js
```

---

## `fileUtils.js`

- **Language:** JavaScript
- Reusable filesystem helper utilities.

---

## `jsonUtils.js`

- **Language:** JavaScript
- Handles JSON parsing and validation utilities.

---

## `logger.js`

- **Language:** JavaScript
- Centralized logging system for debugging and workflow events.

---

## `pathUtils.js`

- **Language:** JavaScript
- Cross-platform filesystem path utilities.

---

# Workflow Data Layer

```plaintext
data/
│
├── asset_acquisition.json
├── asset_optimization.json
├── scene_setup.json
├── interaction_layer.json
└── schemas/
    └── workflowSchema.json
```

---

## `asset_acquisition.json`

- **Language:** JSON
- Stores workflow instructions for monument acquisition workflows.

---

## `asset_optimization.json`

- **Language:** JSON
- Stores optimization workflow definitions and helper actions.

---

## `scene_setup.json`

- **Language:** JSON
- Stores Unity XR scene setup workflow instructions.

---

## `interaction_layer.json`

- **Language:** JSON
- Stores XR interaction integration workflow steps.

---

## `workflowSchema.json`

- **Language:** JSON Schema
- Defines validation rules for workflow JSON files.

---

# Helper Automation Layer

```plaintext
automation/
│
├── actions/
├── filesystem/
├── projectSetup/
└── toolLaunchers/
```

---

# Automation Actions

```plaintext
automation/actions/
│
├── createProjectStructure.js
├── installTemplates.js
├── installScripts.js
├── openFolder.js
└── copyWorkflowAssets.js
```

---

## `createProjectStructure.js`

- **Language:** JavaScript (Node.js)
- Creates standardized XR project folder structures.

---

## `installTemplates.js`

- **Language:** JavaScript
- Copies reusable Unity templates into generated project environments.

---

## `installScripts.js`

- **Language:** JavaScript
- Installs reusable XR scripts into target project directories.

---

## `openFolder.js`

- **Language:** JavaScript
- Opens directories using OS shell integration.

---

## `copyWorkflowAssets.js`

- **Language:** JavaScript
- Copies reusable assets and starter resources into generated projects.

---

# Filesystem Helpers

```plaintext
automation/filesystem/
│
├── directoryManager.js
├── fileCopier.js
└── templateManager.js
```

---

## `directoryManager.js`

- **Language:** JavaScript
- Handles recursive folder generation and directory validation.

---

## `fileCopier.js`

- **Language:** JavaScript
- Handles safe file copy operations and overwrite behavior.

---

## `templateManager.js`

- **Language:** JavaScript
- Manages workflow template installation logic.

---

# Project Setup

```plaintext
automation/projectSetup/
│
├── unityProjectGenerator.js
└── xrEnvironmentSetup.js
```

---

## `unityProjectGenerator.js`

- **Language:** JavaScript
- Generates reusable Unity XR starter project structures.

---

## `xrEnvironmentSetup.js`

- **Language:** JavaScript
- Handles XR starter environment setup operations.

---

# Tool Launchers

```plaintext
automation/toolLaunchers/
│
├── launchBlender.js
├── launchUnity.js
└── launchMeshroom.js
```

---

## `launchBlender.js`

- **Language:** JavaScript
- Launches Blender using Node.js process execution APIs.

---

## `launchUnity.js`

- **Language:** JavaScript
- Launches Unity projects from the workflow application.

---

## `launchMeshroom.js`

- **Language:** JavaScript
- Launches Meshroom for photogrammetry workflows.

---

# External Integrations

```plaintext
integrations/
│
├── unity/
├── blender/
└── photogrammetry/
```

---

## `integrations/unity/README.md`

- **Language:** Markdown
- Documents Unity integration assumptions and XR setup requirements.

---

## `integrations/blender/README.md`

- **Language:** Markdown
- Documents Blender optimization workflow expectations.

---

## `integrations/photogrammetry/README.md`

- **Language:** Markdown
- Documents Meshroom/WebODM workflow assumptions and export requirements.

---

# Template Storage

```plaintext
templates/
│
├── unityXRStarter/
├── interactionPrefabs/
├── scripts/
└── environments/
```

---

## `templates/unityXRStarter/`

- **Language:** Unity Assets
- Stores reusable Unity XR starter project templates.

---

## `templates/interactionPrefabs/`

- **Language:** Unity Prefabs / Assets
- Stores reusable XR interaction prefabs and interaction systems.

---

## `templates/scripts/`

- **Language:** C#
- Stores reusable Unity XR scripts copied into generated projects.

---

## `templates/environments/`

- **Language:** Unity Assets
- Stores reusable environment setup assets.

---

# Static Assets

```plaintext
assets/
│
├── icons/
├── images/
└── ui/
```

---

## `assets/icons/`

- **Language:** PNG / SVG
- Stores application icons and navigation graphics.

---

## `assets/images/`

- **Language:** Image Assets
- Stores instructional diagrams and workflow images.

---

## `assets/ui/`

- **Language:** UI Assets
- Stores reusable interface graphics.

---

# Documentation

```plaintext
docs/
│
├── architecture.md
├── workflow-spec.md
├── automation-spec.md
├── contribution-guide.md
└── coding-standards.md
```

---

## `architecture.md`

- **Language:** Markdown
- Documents layered architecture and module responsibilities.

---

## `workflow-spec.md`

- **Language:** Markdown
- Defines workflow JSON structures and rendering behavior.

---

## `automation-spec.md`

- **Language:** Markdown
- Defines helper automation execution standards and action mappings.

---

## `contribution-guide.md`

- **Language:** Markdown
- Contributor onboarding and collaboration workflow documentation.

---

## `coding-standards.md`

- **Language:** Markdown
- Defines project-wide coding conventions and standards.

---

# Testing

```plaintext
tests/
│
├── workflow/
├── automation/
└── integration/
```

---

## `tests/workflow/`

- **Language:** JavaScript Tests
- Tests workflow parsing and rendering systems.

---

## `tests/automation/`

- **Language:** JavaScript Tests
- Tests helper automation and filesystem operations.

---

## `tests/integration/`

- **Language:** JavaScript Tests
- Tests Electron integration and workflow execution pipelines.

---

# Development Scripts

```plaintext
scripts/
│
├── setup-dev-env.js
├── generate-workflow.js
└── validate-json.js
```

---

## `setup-dev-env.js`

- **Language:** JavaScript
- Initializes contributor development environments.

---

## `generate-workflow.js`

- **Language:** JavaScript
- Generates starter workflow JSON templates.

---

## `validate-json.js`

- **Language:** JavaScript
- Validates workflow JSON files against schema rules.

---

# Design Philosophy

The system architecture follows these principles:

- lightweight architecture
- modular systems
- reusable workflows
- template-driven design
- human-supervised workflows
- implementation feasibility
- low dependency complexity
- scalable future expansion

---

# Current Goal

The immediate development goal is:

> Build a fully navigable and visually complete workflow application shell first.

Initial focus:

- UI framework
- navigation systems
- workflow rendering
- placeholder automation systems
- JSON workflow integration
- modular architecture foundation

Functionality can then be expanded incrementally.

---
