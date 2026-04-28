# AgentHub Admin Panel - Prototype

AgentHub Admin is a static internal dashboard prototype for monitoring rented AI agents, customers, contracts, skills, and error states.

## Run Locally

No build tooling is required.

1. Open `index.html` directly in a browser.
2. Optional: serve folder statically if you prefer local URLs.

## Folder Structure

- `index.html` - page shell, sections, and modal markup
- `assets/css/variables.css` - theme tokens and shared utility classes
- `assets/icons/icons.js` - inline SVG icon constants
- `assets/js/data.js` - hardcoded data arrays
- `assets/js/render.js` - render functions for each section
- `assets/js/nav.js` - section switching and top bar title updates
- `assets/js/darkmode.js` - dark mode behavior
- `assets/js/dropdowns.js` - shared dropdown logic
- `assets/js/modals.js` - modal open/close and data hydration
- `assets/js/interactions.js` - startup flow, skill toggles, and mark-resolved interaction

## Runtime Flow

1. Data constants are declared in `assets/js/data.js`.
2. `renderAllSections()` in `assets/js/render.js` maps data into table rows and cards.
3. `DOMContentLoaded` in `assets/js/interactions.js` initializes:
	 - Rendering
	 - Navigation
	 - Dark mode
	 - Dropdowns
	 - Modals
	 - Skill expand/collapse
	 - Error resolve action

This keeps the prototype easy to reason about and quick to modify for design iterations.

## Feature Coverage

- Dashboard metrics and SVG activity chart
- User table with status/plan badges and detail modal
- Agent cards with expandable skills and system prompt modal
- Skills table with explanatory banner and detail modal
- Contract table with detail modal and itemized pricing
- Error log with typed badges, detail modal, and session-level resolution updates

## Design and Theming

- Light and dark modes are controlled via CSS variables in `assets/css/variables.css`.
- Tailwind utility classes are used directly in HTML templates and rendered markup.
- Typography stack:
	- IBM Plex Sans (UI/body)
	- DM Mono (display accents)
	- JetBrains Mono (code/prompt content)

## Known Limits

- Data is hardcoded and non-persistent.
- No authentication or backend integration.
- No create/edit/delete persistence workflows.
- Intended for prototype review and portfolio demonstration.

## How to Extend Safely

- Add or modify records in `assets/js/data.js` first.
- Keep render mappings in `assets/js/render.js` in sync with data shape.
- If adding a modal action:
	- Add action trigger in renderer output.
	- Add handler and modal population logic in `assets/js/modals.js`.
	- Add close behavior mapping for backdrop/button.
- If adding a new section:
	- Add section config in `assets/js/nav.js`.
	- Add section markup in `index.html`.
	- Add renderer and invoke via `renderAllSections()`.

## Related Docs

- Repository overview: `../README.md`
- Detailed build spec: `spec.md`
