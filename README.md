# XRHeritagePipeline


Root Structure
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
ROOT FILES
package.json

Language: JSON
Defines Electron + Node.js dependencies, npm scripts, build commands, and application metadata. Depends on Electron runtime and npm ecosystem.

package-lock.json

Language: JSON
Locks dependency versions for consistent builds across contributors. Generated automatically by npm.

README.md

Language: Markdown
Main project documentation explaining setup, architecture, workflows, and contributor onboarding.

.gitignore

Language: Git config
Prevents node_modules, build artifacts, temp files, Unity exports, and generated assets from being committed.

LICENSE

Language: Text
Defines repository licensing for contributors and distribution.

ELECTRON LAYER
electron/
│
├── main.js
├── preload.js
├── ipc/
│   ├── actionRouter.js
│   └── ipcChannels.js
└── window/
    └── createWindow.js
electron/main.js

Language: JavaScript (Node.js + Electron)
Main Electron entry point that initializes the app lifecycle and launches the main application window. Depends on Electron APIs.

electron/preload.js

Language: JavaScript
Secure bridge exposing backend functions to frontend renderer using Electron contextBridge APIs.

electron/ipc/actionRouter.js

Language: JavaScript
Routes frontend helper-action requests to backend automation handlers. Depends on Electron IPC and automation modules.

electron/ipc/ipcChannels.js

Language: JavaScript
Defines standardized IPC event/channel names used between frontend and backend systems.

electron/window/createWindow.js

Language: JavaScript
Creates and configures the Electron BrowserWindow instance and initial application settings.

FRONTEND APPLICATION LAYER
src/
│
├── index.html
├── styles/
├── renderer/
├── components/
├── logic/
├── state/
└── utils/
MAIN FRONTEND ENTRY
src/index.html

Language: HTML
Primary application layout containing navigation bar, sidebar, content panel, and status area.

STYLES
src/styles/
│
├── main.css
├── layout.css
├── sidebar.css
├── navigation.css
├── contentPanel.css
├── buttons.css
└── statusbar.css
main.css

Language: CSS
Global styling rules and typography shared across the application.

layout.css

Language: CSS
Controls major interface layout regions and responsive panel positioning.

sidebar.css

Language: CSS
Styles workflow step navigation sidebar components.

navigation.css

Language: CSS
Styles top pipeline navigation system.

contentPanel.css

Language: CSS
Controls workflow instruction rendering layout and instructional content presentation.

buttons.css

Language: CSS
Styles helper automation buttons and interaction controls.

statusbar.css

Language: CSS
Styles bottom workflow status display region.

RENDERER SYSTEM
src/renderer/
│
├── appRenderer.js
├── pipelineRenderer.js
├── stepRenderer.js
├── checklistRenderer.js
├── actionRenderer.js
└── statusRenderer.js
appRenderer.js

Language: JavaScript
Initializes renderer-side UI systems and coordinates overall frontend rendering flow.

pipelineRenderer.js

Language: JavaScript
Renders pipeline navigation and handles pipeline switching behavior.

stepRenderer.js

Language: JavaScript
Loads and renders workflow step instructions from JSON workflow data.

checklistRenderer.js

Language: JavaScript
Renders workflow checklist UI elements and completion tracking visuals.

actionRenderer.js

Language: JavaScript
Renders helper automation buttons and binds frontend events to IPC requests.

statusRenderer.js

Language: JavaScript
Updates active pipeline, step progress, and workflow status display.

UI COMPONENTS
src/components/
│
├── topNavigation.js
├── sidebar.js
├── contentPanel.js
├── helperButtons.js
└── statusBar.js
topNavigation.js

Language: JavaScript
Handles top-level pipeline navigation interactions and UI updates.

sidebar.js

Language: JavaScript
Controls sidebar workflow step rendering and navigation logic.

contentPanel.js

Language: JavaScript
Manages instructional workflow content display inside the main content area.

helperButtons.js

Language: JavaScript
Handles helper button click interactions and frontend action dispatching.

statusBar.js

Language: JavaScript
Displays workflow progress and currently active pipeline information.

APPLICATION LOGIC LAYER
src/logic/
│
├── workflowLoader.js
├── pipelineManager.js
├── stepManager.js
├── navigationController.js
├── actionDispatcher.js
└── validationManager.js
workflowLoader.js

Language: JavaScript
Loads and parses workflow JSON files from the data layer.

pipelineManager.js

Language: JavaScript
Controls active pipeline state and pipeline transition logic.

stepManager.js

Language: JavaScript
Manages active workflow step state and step progression handling.

navigationController.js

Language: JavaScript
Coordinates UI navigation interactions between pipelines and workflow steps.

actionDispatcher.js

Language: JavaScript
Routes frontend helper actions to Electron IPC automation systems.

validationManager.js

Language: JavaScript
Handles lightweight workflow validation checks and future checklist verification logic.

STATE SYSTEM
src/state/
│
├── appState.js
├── pipelineState.js
└── uiState.js
appState.js

Language: JavaScript
Stores lightweight global application state shared across systems.

pipelineState.js

Language: JavaScript
Tracks active pipeline and workflow progression information.

uiState.js

Language: JavaScript
Maintains temporary UI interaction states and active selections.

UTILITY HELPERS
src/utils/
│
├── fileUtils.js
├── jsonUtils.js
├── logger.js
└── pathUtils.js
fileUtils.js

Language: JavaScript
Provides reusable filesystem helper utilities for local file operations.

jsonUtils.js

Language: JavaScript
Handles workflow JSON parsing and validation utilities.

logger.js

Language: JavaScript
Provides centralized logging utilities for debugging and workflow events.

pathUtils.js

Language: JavaScript
Handles filesystem path normalization and cross-platform path utilities.

WORKFLOW DATA LAYER
data/
│
├── asset_acquisition.json
├── asset_optimization.json
├── scene_setup.json
├── interaction_layer.json
└── schemas/
    └── workflowSchema.json
asset_acquisition.json

Language: JSON
Stores workflow instructions and steps for monument acquisition workflows.

asset_optimization.json

Language: JSON
Defines optimization pipeline workflow steps and helper actions.

scene_setup.json

Language: JSON
Contains Unity XR scene setup workflow definitions.

interaction_layer.json

Language: JSON
Defines reusable XR interaction integration workflow steps.

workflowSchema.json

Language: JSON Schema
Defines validation structure for workflow JSON files.

HELPER AUTOMATION LAYER
automation/
│
├── actions/
├── filesystem/
├── projectSetup/
└── toolLaunchers/
ACTIONS
automation/actions/
│
├── createProjectStructure.js
├── installTemplates.js
├── installScripts.js
├── openFolder.js
└── copyWorkflowAssets.js
createProjectStructure.js

Language: JavaScript (Node.js)
Creates standardized XR project folder structures on disk.

installTemplates.js

Language: JavaScript
Copies reusable Unity templates into generated project environments.

installScripts.js

Language: JavaScript
Installs reusable XR interaction scripts into target project directories.

openFolder.js

Language: JavaScript
Opens project directories using operating system shell integration.

copyWorkflowAssets.js

Language: JavaScript
Copies reusable workflow assets and starter resources into projects.

FILESYSTEM HELPERS
automation/filesystem/
│
├── directoryManager.js
├── fileCopier.js
└── templateManager.js
directoryManager.js

Language: JavaScript
Handles recursive folder generation and directory existence checks.

fileCopier.js

Language: JavaScript
Handles safe file copying and overwrite behavior.

templateManager.js

Language: JavaScript
Manages reusable workflow template installation logic.

PROJECT SETUP
automation/projectSetup/
│
├── unityProjectGenerator.js
└── xrEnvironmentSetup.js
unityProjectGenerator.js

Language: JavaScript
Generates reusable Unity XR starter project structures.

xrEnvironmentSetup.js

Language: JavaScript
Handles XR-related starter environment setup operations.

TOOL LAUNCHERS
automation/toolLaunchers/
│
├── launchBlender.js
├── launchUnity.js
└── launchMeshroom.js
launchBlender.js

Language: JavaScript
Launches Blender executable using Node.js process execution APIs.

launchUnity.js

Language: JavaScript
Launches Unity projects from the workflow application.

launchMeshroom.js

Language: JavaScript
Launches Meshroom for photogrammetry workflows.

EXTERNAL INTEGRATIONS
integrations/
│
├── unity/
├── blender/
└── photogrammetry/
integrations/unity/README.md

Language: Markdown
Documents Unity integration assumptions, folder structure expectations, and XR setup dependencies.

integrations/blender/README.md

Language: Markdown
Documents Blender workflow integration requirements and optimization assumptions.

integrations/photogrammetry/README.md

Language: Markdown
Documents Meshroom/WebODM workflow expectations and export requirements.

TEMPLATE STORAGE
templates/
│
├── unityXRStarter/
├── interactionPrefabs/
├── scripts/
└── environments/
templates/unityXRStarter/

Language: Unity project assets
Stores reusable Unity XR starter project template files.

templates/interactionPrefabs/

Language: Unity prefabs/assets
Stores reusable XR interaction prefabs and interaction systems.

templates/scripts/

Language: C#
Stores reusable Unity XR scripts copied into generated projects.

templates/environments/

Language: Unity assets
Stores reusable lightweight environment setup assets.

STATIC ASSETS
assets/
│
├── icons/
├── images/
└── ui/
assets/icons/

Language: PNG/SVG
Stores application icons and navigation symbols.

assets/images/

Language: Image assets
Stores instructional images and future workflow diagrams.

assets/ui/

Language: UI assets
Stores reusable UI graphics and interface resources.

DOCUMENTATION
docs/
│
├── architecture.md
├── workflow-spec.md
├── automation-spec.md
├── contribution-guide.md
└── coding-standards.md
architecture.md

Language: Markdown
Documents layered architecture and module responsibilities.

workflow-spec.md

Language: Markdown
Defines workflow JSON structures and rendering behavior.

automation-spec.md

Language: Markdown
Defines helper automation execution standards and action mappings.

contribution-guide.md

Language: Markdown
Explains contribution workflow and development expectations for collaborators.

coding-standards.md

Language: Markdown
Defines project-wide code conventions and module structuring rules.

TESTING
tests/
│
├── workflow/
├── automation/
└── integration/
tests/workflow/

Language: JavaScript tests
Tests workflow parsing and rendering systems.

tests/automation/

Language: JavaScript tests
Tests filesystem and automation helper actions.

tests/integration/

Language: JavaScript tests
Tests Electron integration and workflow-to-automation interactions.

DEVELOPMENT SCRIPTS
scripts/
│
├── setup-dev-env.js
├── generate-workflow.js
└── validate-json.js
setup-dev-env.js

Language: JavaScript
Initializes contributor development environments and required folders.

generate-workflow.js

Language: JavaScript
Generates starter workflow JSON files for rapid pipeline creation.

validate-json.js

Language: JavaScript
Validates workflow JSON files against schema definitions.
