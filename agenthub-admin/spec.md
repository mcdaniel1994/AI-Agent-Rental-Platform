# AgentHub Admin Panel — Build Specification
**Spec Version:** 1.0  
**Page Name:** AgentHub Admin Panel  
**Route:** `/admin`  
**Page Type:** Internal SaaS Admin Dashboard  
**Stack:** Single-file HTML with Tailwind CSS (CDN), Vanilla JavaScript (no frameworks)  
**Target Breakpoints:** Desktop-first (min 1280px primary), functional at 768px+  
**Data:** 100% hardcoded — no API connections, no backend  
**Implementation Status:** Frontend prototype only (no persistence)  
**Last Updated:** 2026-04-27  

---

## 1. Purpose & Context

AgentHub is a SaaS platform where companies rent pre-configured AI agents equipped with skills (discrete capabilities like web browsing, document reading, calendar management). This admin panel is the internal control surface for AgentHub staff to monitor the platform, manage users, oversee agents, configure contracts, and triage errors.

Repository scope note: this repository currently contains the admin panel prototype only. Backend services, persistence, and client-facing application surfaces are out of scope for this implementation.

**Primary user:** AgentHub internal admin staff  
**User goal:** Quickly assess platform health, manage entities (users, agents, skills, contracts), and resolve operational issues  
**Success state:** Admin can navigate all six sections, view all data, open and close all modals, and toggle dark mode — without any broken UI or missing interactions

---

## 2. Design Tokens & Theme

### Aesthetic Direction
**Refined dark-tech / monochromatic precision.** Think Bloomberg Terminal meets Linear.app. Tight grid, high information density, understated elegance. The UI should feel like a tool built for professionals who value clarity over decoration.

### Typography
- **Display / Headings:** `"DM Mono"` (Google Fonts) — gives a technical, terminal-adjacent feel
- **Body / UI:** `"Geist"` or fallback `"IBM Plex Sans"` (Google Fonts)
- **Code / Prompts:** `"JetBrains Mono"` (Google Fonts) — used in system prompt modal
- Scale: `text-xs` (11px) for badges/meta, `text-sm` (13px) for table rows, `text-base` (15px) for body, `text-lg`/`text-xl` for section headers, `text-3xl` for metric numbers

### Color Palette — CSS Variables
Define in a `<style>` block at the top of the file:

```css
:root {
  --bg-base: #f4f4f5;        /* zinc-100 */
  --bg-surface: #ffffff;
  --bg-elevated: #fafafa;
  --border: #e4e4e7;          /* zinc-200 */
  --text-primary: #18181b;    /* zinc-900 */
  --text-secondary: #71717a;  /* zinc-500 */
  --text-muted: #a1a1aa;      /* zinc-400 */
  --accent: #2563eb;          /* blue-600 */
  --accent-hover: #1d4ed8;
  --danger: #dc2626;          /* red-600 */
  --warning: #d97706;         /* amber-600 */
  --success: #16a34a;         /* green-600 */
  --sidebar-bg: #18181b;      /* zinc-900 */
  --sidebar-text: #e4e4e7;
  --sidebar-muted: #71717a;
  --sidebar-active: #2563eb;
}

.dark {
  --bg-base: #09090b;         /* zinc-950 */
  --bg-surface: #18181b;      /* zinc-900 */
  --bg-elevated: #27272a;     /* zinc-800 */
  --border: #3f3f46;          /* zinc-700 */
  --text-primary: #fafafa;    /* zinc-50 */
  --text-secondary: #a1a1aa;  /* zinc-400 */
  --text-muted: #71717a;      /* zinc-500 */
  --sidebar-bg: #09090b;
}
```

### Spacing
- Sidebar width: `w-60` (240px), fixed
- Content area padding: `p-8`
- Card padding: `p-5`
- Table cell padding: `px-4 py-3`
- Border radius: `rounded-lg` for cards/modals, `rounded-md` for inputs/buttons, `rounded-full` for badges

### Shadows
- Cards: `shadow-sm`
- Modals: `shadow-2xl`
- Dropdowns: `shadow-lg ring-1 ring-black/5`

### Transitions
- All hover states: `transition-colors duration-150`
- Skill expand/collapse: `transition-all duration-200 ease-in-out` with `max-height` toggle
- Dark mode toggle: `transition-colors duration-300` on `<html>` element
- Modal open: fade-in via `opacity-0 → opacity-100` + slight scale `scale-95 → scale-100`, `duration-200`

---

## 3. Layout & Grid

### Page Shell
```
┌─────────────────────────────────────────────┐
│  SIDEBAR (fixed, 240px)  │  MAIN CONTENT    │
│                          │  ┌─────────────┐ │
│  [Logo]                  │  │  TOP BAR    │ │
│  [Nav Items × 6]         │  ├─────────────┤ │
│                          │  │  PAGE BODY  │ │
│  [Footer: version]       │  │  (scrolls)  │ │
│                          │  └─────────────┘ │
└─────────────────────────────────────────────┘
```

- `<html>` element receives `class="dark"` toggled by JS
- Body: `flex h-screen overflow-hidden` with `bg-[var(--bg-base)]`
- Sidebar: `fixed left-0 top-0 h-full w-60 flex-shrink-0 bg-[var(--sidebar-bg)]`
- Main: `ml-60 flex flex-col h-full overflow-hidden`
- Top bar: `h-14 flex items-center justify-between px-6 border-b bg-[var(--bg-surface)] border-[var(--border)]` — NOT scrollable, stays fixed
- Page body: `flex-1 overflow-y-auto p-8`

### Sections
Each of the 6 nav items maps to a `<section>` with `id`. Only one section is visible at a time — controlled by JS toggling `hidden` class. No page reloads.

---

## 4. Persistent Components

### 4.1 Sidebar
- Background: `var(--sidebar-bg)` (dark in both light and dark mode)
- Top: Logo area — text "AgentHub" in `DM Mono`, white, with a small geometric icon (SVG inline — e.g. a hexagon or circuit node)
- Nav list: 6 items (see Section 5 for names)
  - Each item: icon (Heroicons inline SVG, 18×18) + label
  - Default state: `text-[var(--sidebar-muted)]` + subtle hover: `bg-white/5 text-white`
  - Active state: left border accent `border-l-2 border-[var(--sidebar-active)] bg-white/10 text-white`
  - Active state is set by JS when a nav item is clicked
- Bottom: version label `v0.1.0-prototype` in muted small text

**Nav Items (in order):**
1. Dashboard — icon: `chart-bar`
2. User Management — icon: `users`
3. Agent Management — icon: `cpu-chip`
4. Skills — icon: `puzzle-piece`
5. Agent Contracts — icon: `document-text`
6. Error Log — icon: `exclamation-triangle`

### 4.2 Top Bar
- Height: `h-14`
- Left: Current section title (updates dynamically via JS when nav changes), `text-sm font-semibold text-[var(--text-primary)]`
- Right: Dark mode toggle button
  - Toggle is a pill-shaped button `rounded-full px-3 py-1.5`
  - Shows sun icon in dark mode, moon icon in light mode
  - On click: adds/removes `dark` class on `<html>` element
  - Label: "Light" / "Dark" next to icon

### 4.3 Modal System (shared)
Reusable overlay pattern used in all 6 sections:
- Backdrop: `fixed inset-0 bg-black/50 backdrop-blur-sm z-40`
- Modal panel: `fixed inset-0 z-50 flex items-center justify-center p-6`
- Panel inner: `bg-[var(--bg-surface)] rounded-lg shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto`
- Header row: title (left) + `×` close button (right)
- Close triggers: `×` button AND clicking the backdrop
- Open animation: `opacity-0 scale-95 → opacity-100 scale-100`, `duration-200`
- JS pattern: each modal has a unique `id`, opened/closed by toggling `hidden` class and animation classes

### 4.4 Action Dropdown (shared)
Reusable pattern used in all tables/lists:
- Trigger: `⋮` button (`text-[var(--text-muted)] hover:text-[var(--text-primary)]`)
- Menu: `absolute right-0 mt-1 w-40 bg-[var(--bg-surface)] border border-[var(--border)] rounded-md shadow-lg z-30`
- Menu items: `px-3 py-2 text-sm cursor-pointer hover:bg-[var(--bg-elevated)]`
- Dangerous actions (Delete): `text-[var(--danger)]`
- Close behavior: clicking outside closes open dropdown (JS `document.addEventListener('click', ...)`)
- Only one dropdown open at a time — opening a new one closes the previous

---

## 5. Section Specifications

---

### 5.1 Dashboard

**Route trigger:** Nav item "Dashboard" (default active on load)

#### Metric Cards
4 cards in a `grid grid-cols-4 gap-4` row. Each card:
- Container: `bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-5`
- Top row: label (`text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide`) + icon (18px, right-aligned, muted color)
- Main number: `text-3xl font-semibold font-mono text-[var(--text-primary)] mt-2`
- Sub-label: `text-xs text-[var(--text-muted)] mt-1`

**Card 1 — Total Revenue**
- Label: "Total Revenue"
- Icon: dollar sign
- Value: `$84,320`
- Sub-label: "This month"

**Card 2 — Discount Losses**
- Label: "Discount & Coupon Losses"
- Icon: tag
- Value: `$3,180`
- Sub-label: "This month"
- Number color: `text-[var(--warning)]`

**Card 3 — Active Agents**
- Label: "Active Agents"
- Icon: cpu-chip
- Value: `142`
- Sub-label: "Across all clients"

**Card 4 — Failing Agents**
- Label: "Failing Agents"
- Icon: exclamation-circle
- Value: `7`
- Sub-label: "Currently flagged"
- Number color: `text-[var(--danger)]`

#### Weekly Activity Chart
- Placed below metric cards, full width
- Container: `bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-5 mt-6`
- Header: "Weekly Activity" in `text-sm font-semibold`
- Body: A hardcoded inline SVG bar chart showing 7 days (Mon–Sun) with two series: "Agent Runs" (blue bars) and "Errors" (red bars)
  - Bars rendered as SVG `<rect>` elements
  - X-axis labels: day abbreviations
  - Y-axis: 3–4 gridlines with numeric labels
  - Legend below chart: two colored dots + labels
  - Chart height: ~200px, full width of container

---

### 5.2 User Management

**Route trigger:** Nav item "User Management"

#### Table
- Wrapper: `bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg overflow-hidden`
- Section header above table: "Users" `text-lg font-semibold` + record count badge `text-xs bg-[var(--bg-elevated)] px-2 py-0.5 rounded-full`
- Table: `w-full text-sm border-collapse`
- Header row: `bg-[var(--bg-elevated)] text-[var(--text-secondary)] text-xs uppercase tracking-wide`
- Row hover: `hover:bg-[var(--bg-elevated)] transition-colors`
- Bottom border between rows: `border-b border-[var(--border)]`

**Columns:** Name | Email | Plan | Status | Actions

**Hardcoded Rows (8 users):**
| Name | Email | Plan | Status |
|---|---|---|---|
| Sarah Chen | sarah.chen@nexaflow.com | Enterprise | Active |
| Marcus Webb | m.webb@orbitaltech.io | Pro | Active |
| Priya Nair | priya@stacklabs.dev | Starter | Suspended |
| James Okafor | j.okafor@cloudnine.ai | Enterprise | Active |
| Elena Vasquez | evasquez@bridgeops.com | Pro | Active |
| Tom Lindqvist | tom.l@finvault.co | Starter | Pending |
| Aiko Tanaka | a.tanaka@synthai.jp | Enterprise | Active |
| Diego Ruiz | diego@automate.mx | Pro | Suspended |

**Status Badges:**
- Active: `bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400`
- Suspended: `bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400`
- Pending: `bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400`
- All badges: `text-xs font-medium px-2 py-0.5 rounded-full`

**Plan Badges:**
- Enterprise: `bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400`
- Pro: `bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400`
- Starter: `bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400`

**Action Dropdown Options:**
1. "View detail" → opens User Detail Modal
2. "Delete" → no-op (hardcoded; show item but clicking does nothing, or console.log)

#### User Detail Modal
- Title: User's full name
- Fields displayed as a two-column label/value grid:
  - Full Name
  - Email
  - Plan
  - Status
  - Member Since (hardcoded date)
  - Active Agents (hardcoded count)
  - Total Spend (hardcoded dollar value)
  - Notes (one sentence of placeholder text)
- Each "View detail" row opens a modal pre-populated with that row's data
- JS: store user data as a JS array of objects; on "View detail" click, find matching object by index and populate modal fields via `innerHTML` or `textContent`

---

### 5.3 Agent Management

**Route trigger:** Nav item "Agent Management"

#### Agent List
- Layout: vertical stack of cards (not a table)
- Each agent: `bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-4 mb-3`

**Hardcoded Agents (6 agents):**

| Agent Name | Owner | Status | Skills |
|---|---|---|---|
| Nexus-7 | Sarah Chen | Active | Web Browsing, Document Reader, Email Composer |
| Orbital Scout | Marcus Webb | Active | Web Browsing, Calendar Manager |
| DataMiner Pro | James Okafor | Failing | Database Query, Document Reader, Data Formatter |
| FinBot Alpha | Aiko Tanaka | Active | Financial Analyzer, Document Reader |
| SupportBot v2 | Elena Vasquez | Inactive | Email Composer, Calendar Manager |
| AutomateX | Diego Ruiz | Failing | Web Browsing, Data Formatter, Task Scheduler |

**Agent Card Layout:**
```
┌──────────────────────────────────────────────┐
│  [Status dot] Agent Name        [⋮ dropdown] │
│  Owner: Name · Status badge                  │
│  ─────────────────────────────────────────── │
│  Skills ▸  [click to expand]                 │
│  [Hidden by default]                         │
│  • Skill 1  • Skill 2  • Skill 3             │
└──────────────────────────────────────────────┘
```

- Status dot: 8px circle, color-coded: green (Active), red (Failing), zinc (Inactive)
- Expand control: `text-xs text-[var(--text-secondary)] flex items-center gap-1 cursor-pointer select-none`
- Arrow icon rotates 90° when expanded (CSS transform)
- Skills list: `mt-2 flex flex-wrap gap-1.5` — each skill is a `text-xs px-2 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)]`
- Skill section uses `max-height: 0 → max-height: 200px` with `overflow-hidden transition-all duration-200` controlled by JS toggling a class

**Action Dropdown Options:**
1. "Configure" → opens Configure Modal (system prompt)
2. "Delete" → no-op

#### Configure Modal (System Prompt)
- Title: "Configure — [Agent Name]"
- Sub-label: "System Prompt"
- Body: a `<pre>` or `<textarea readonly>` block using `JetBrains Mono` with `text-xs`, showing a multi-line hardcoded system prompt for that agent (2–4 sentences of realistic-looking prompt text, e.g. "You are Nexus-7, an intelligent research assistant deployed for NexaFlow Inc. Your primary task is to browse the web and summarize findings into structured reports...")
- Styling: `bg-[var(--bg-elevated)] rounded-md p-4 text-[var(--text-secondary)] overflow-x-auto`

---

### 5.4 Skills

**Route trigger:** Nav item "Skills"

#### Explainer Banner
At top of section, before the table:
- Container: `bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6`
- Icon: info circle (blue)
- Text: `"Skills are discrete capabilities that can be attached to AI agents. Each skill grants an agent access to a specific tool or action — such as browsing the internet, reading uploaded documents, or managing calendar events. Skills are configured at the platform level and selectively enabled per agent contract."`
- Text style: `text-sm text-blue-800 dark:text-blue-300`

#### Skills Table
Same table pattern as User Management.

**Columns:** Skill Name | Description | Agents Enabled | Actions

**Hardcoded Skills (7 skills):**
| Skill Name | Description | Agents Enabled |
|---|---|---|
| Web Browsing | Allows the agent to search and retrieve content from the internet in real time. | 18 |
| Document Reader | Enables parsing and extracting structured data from uploaded PDFs and DOCX files. | 24 |
| Email Composer | Grants ability to draft, format, and prepare emails for human review or auto-send. | 11 |
| Calendar Manager | Allows reading and writing to connected calendar services (Google, Outlook). | 9 |
| Database Query | Enables running read-only SQL queries against a connected data source. | 6 |
| Data Formatter | Transforms raw output into structured formats: JSON, CSV, or Markdown tables. | 14 |
| Task Scheduler | Lets agents create and manage time-based tasks and reminders on behalf of a user. | 5 |

**Agents Enabled:** display as plain number with a muted label, e.g. `18 agents`

**Action Dropdown Options:**
1. "View detail" → opens Skill Detail Modal
2. "Delete" → no-op

#### Skill Detail Modal
- Title: Skill name
- Fields: Name, Description (full), Agents Currently Using, Date Added (hardcoded), Permissions Required (hardcoded string, e.g. "network_access: true")

---

### 5.5 Agent Contracts

**Route trigger:** Nav item "Agent Contracts"

#### Contracts Table
Same table pattern.

**Columns:** Client | Agent | Contracted Skills | Start Date | End Date | Total Paid | Actions

**Hardcoded Contracts (6 contracts):**
| Client | Agent | Skills | Start | End | Total |
|---|---|---|---|---|---|
| NexaFlow Inc. | Nexus-7 | Web Browsing, Document Reader, Email Composer | Jan 1, 2025 | Jun 30, 2025 | $4,200 |
| Orbital Technologies | Orbital Scout | Web Browsing, Calendar Manager | Feb 15, 2025 | Aug 14, 2025 | $2,800 |
| CloudNine AI | DataMiner Pro | Database Query, Document Reader, Data Formatter | Mar 1, 2025 | Feb 28, 2026 | $9,600 |
| SynthAI Japan | FinBot Alpha | Financial Analyzer, Document Reader | Jan 15, 2025 | Jul 14, 2025 | $5,100 |
| BridgeOps LLC | SupportBot v2 | Email Composer, Calendar Manager | Apr 1, 2025 | Sep 30, 2025 | $3,400 |
| Automate.mx | AutomateX | Web Browsing, Data Formatter, Task Scheduler | May 1, 2025 | Oct 31, 2025 | $4,750 |

**Contracted Skills column:** render as comma-separated inline text (truncate to 2 visible + "+N more" if >2, no truncation needed for prototype)

**Status:** Infer from dates — if end date is in future → "Active" badge, if past → "Completed" badge

**Action Dropdown Options:**
1. "View detail" → opens Contract Detail Modal
2. (No delete — contracts are records)

#### Contract Detail Modal
- Title: "Contract — [Client] / [Agent]"
- Sections:
  - **Summary:** Client, Agent, Status, Start Date, End Date
  - **Itemized Skills:** a mini-table listing each skill + its individual price (hardcoded; e.g. Web Browsing: $800/mo, Document Reader: $600/mo, etc.)
  - **Total:** sum line at bottom, bold
- Dividers between sections: `border-t border-[var(--border)] my-4`

---

### 5.6 Error Log

**Route trigger:** Nav item "Error Log"

#### Error Table
Same table pattern.

**Columns:** Timestamp | Agent | Error Type | Description | Status | Actions

**Hardcoded Errors (8 entries):**
| Timestamp | Agent | Error Type | Description | Status |
|---|---|---|---|---|
| 2025-05-14 09:12:03 | DataMiner Pro | `TIMEOUT` | Database query exceeded 30s limit on report generation task. | Unresolved |
| 2025-05-14 07:55:41 | AutomateX | `AUTH_FAILURE` | OAuth token expired for connected calendar service. | Unresolved |
| 2025-05-13 22:30:17 | Nexus-7 | `PARSE_ERROR` | Failed to extract structured data from malformed PDF input. | Resolved |
| 2025-05-13 18:04:52 | AutomateX | `RATE_LIMIT` | Web browsing tool hit provider rate limit after 50 requests. | Resolved |
| 2025-05-13 11:28:09 | DataMiner Pro | `TIMEOUT` | Secondary DB query timed out during financial aggregation. | Unresolved |
| 2025-05-12 16:43:31 | SupportBot v2 | `NULL_RESPONSE` | Email composer returned empty output on draft request. | Resolved |
| 2025-05-12 08:17:22 | FinBot Alpha | `AUTH_FAILURE` | API key revoked for external financial data provider. | Unresolved |
| 2025-05-11 14:55:00 | Orbital Scout | `PARSE_ERROR` | Calendar event payload missing required `start_time` field. | Resolved |

**Error Type Badges:**
- `TIMEOUT`: `bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400`
- `AUTH_FAILURE`: `bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400`
- `PARSE_ERROR`: `bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400`
- `RATE_LIMIT`: `bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400`
- `NULL_RESPONSE`: `bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400`
- All: `text-xs font-mono font-medium px-2 py-0.5 rounded-full`

**Resolved Status:**
- Unresolved: red dot `·` + "Unresolved" in `text-[var(--danger)]`
- Resolved: green dot `·` + "Resolved" in `text-[var(--success)]`

**Action Dropdown Options:**
1. "View detail" → opens Error Detail Modal
2. "Mark as resolved" → changes the row's status cell to "Resolved" (JS DOM update only, no persistence)

#### Error Detail Modal
- Title: "Error — [Error Type] · [Agent Name]"
- Fields: Timestamp, Agent, Error Type (badge), Status, Description (full)
- Error Trace section:
  - Label: "Trace"
  - Body: `<pre>` block with `JetBrains Mono text-xs`, showing a realistic-looking multi-line stack trace (hardcoded per error type, e.g. `AgentRuntime.execute() → ToolDispatcher.call('db_query') → DBConnector.run() → TimeoutError: exceeded 30000ms`)
  - Same styling as Configure modal code block

---

## 6. JavaScript Behavior Map

All JS is inline at the bottom of the `<body>` in a single `<script>` block.

| Behavior | Trigger | Action |
|---|---|---|
| Section switching | Nav item click | Hide all sections, show target section, update active nav class, update top bar title |
| Dark mode toggle | Top bar toggle button | Add/remove `dark` class on `<html>`, update button icon/label |
| Dropdown open | `⋮` button click | Position and show dropdown menu, close any other open dropdown |
| Dropdown close | Click outside | `document.addEventListener('click')` — if click target not inside dropdown, close all |
| Modal open | "View detail" or "Configure" menu item click | Populate modal fields with row data, remove `hidden` class, trigger open animation |
| Modal close | `×` button click | Add `hidden` class |
| Modal close | Backdrop click | Add `hidden` class (check `event.target === backdrop`) |
| Skill expand | Expand control click | Toggle `max-height` class on skill list container, rotate arrow icon |
| Mark as resolved | "Mark as resolved" menu item click | Find row's status cell, update `innerHTML` to Resolved state |

**Data pattern:** Each section's hardcoded data is stored as a `const` JS array of objects at the top of the script block. Tables/cards are rendered from these arrays using `forEach` + `innerHTML` append into a container `<div>`. This allows the "View detail" modal to retrieve full record data by index without DOM scraping.

---

## 7. Accessibility Requirements

- All interactive elements (buttons, dropdowns, expand controls) must have `cursor-pointer`
- Modal close button must have `aria-label="Close modal"`
- Nav items must have `role="button"` or be `<button>` elements
- Status badges must not rely on color alone — include text label
- All SVG icons: `aria-hidden="true"` (decorative) or include `<title>` if standalone

---

## 8. File Structure

This is a single-file prototype. There is no build system, no bundler, and no node_modules. The entire deliverable is one `.html` file. The internal structure of that file must follow this exact order:

```
agenthub-admin.html
│
├── <head>
│   ├── <meta charset="UTF-8">
│   ├── <meta name="viewport" content="width=device-width, initial-scale=1.0">
│   ├── <title>AgentHub Admin</title>
│   ├── <!-- Tailwind dark mode config (must come BEFORE cdn script) -->
│   │   <script>tailwind.config = { darkMode: 'class' }</script>
│   ├── <!-- Tailwind CDN -->
│   │   <script src="https://cdn.tailwindcss.com"></script>
│   ├── <!-- Google Fonts -->
│   │   <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
│   └── <!-- Custom CSS: CSS variables + utility overrides -->
│       <style> ... </style>
│
└── <body class="flex h-screen overflow-hidden bg-[var(--bg-base)]">
    │
    ├── <!-- SIDEBAR (fixed, always visible) -->
    │   <aside id="sidebar"> ... </aside>
    │
    ├── <!-- MAIN WRAPPER -->
    │   <div class="ml-60 flex flex-col h-full overflow-hidden">
    │   │
    │   ├── <!-- TOP BAR (fixed height, never scrolls) -->
    │   │   <header id="topbar"> ... </header>
    │   │
    │   └── <!-- PAGE BODY (scrollable) -->
    │       <main id="page-body" class="flex-1 overflow-y-auto p-8">
    │       │
    │       ├── <!-- SECTION: Dashboard -->
    │       │   <section id="section-dashboard"> ... </section>
    │       │
    │       ├── <!-- SECTION: User Management -->
    │       │   <section id="section-users" class="hidden"> ... </section>
    │       │
    │       ├── <!-- SECTION: Agent Management -->
    │       │   <section id="section-agents" class="hidden"> ... </section>
    │       │
    │       ├── <!-- SECTION: Skills -->
    │       │   <section id="section-skills" class="hidden"> ... </section>
    │       │
    │       ├── <!-- SECTION: Agent Contracts -->
    │       │   <section id="section-contracts" class="hidden"> ... </section>
    │       │
    │       └── <!-- SECTION: Error Log -->
    │           <section id="section-errors" class="hidden"> ... </section>
    │
    ├── <!-- MODALS (all portaled to end of body, outside scroll container) -->
    │   ├── <div id="modal-user-detail"> ... </div>
    │   ├── <div id="modal-agent-configure"> ... </div>
    │   ├── <div id="modal-skill-detail"> ... </div>
    │   ├── <div id="modal-contract-detail"> ... </div>
    │   └── <div id="modal-error-detail"> ... </div>
    │
    └── <!-- JAVASCRIPT (single block, end of body) -->
        <script> ... </script>
```

### ID & Naming Conventions
The agent must follow these naming conventions exactly — JS references these IDs directly:

| Element | ID Pattern | Example |
|---|---|---|
| Nav items | `nav-{section-key}` | `nav-dashboard`, `nav-users` |
| Sections | `section-{section-key}` | `section-dashboard`, `section-agents` |
| Modals | `modal-{entity}-{action}` | `modal-user-detail`, `modal-error-detail` |
| Modal close buttons | `close-modal-{entity}` | `close-modal-user`, `close-modal-error` |
| Modal backdrops | `backdrop-{entity}` | `backdrop-user`, `backdrop-agent` |
| Table body containers | `tbody-{section-key}` | `tbody-users`, `tbody-contracts` |
| Agent card containers | `agent-list` | (single container) |
| Skill list per agent | `skills-{agent-index}` | `skills-0`, `skills-1` |
| Dark mode toggle button | `dark-mode-toggle` | — |
| Top bar title | `topbar-title` | — |

### Internal `<style>` Block Contents
The `<style>` block in `<head>` must contain — in this order:
1. `:root { }` — all light mode CSS variables (see Section 2)
2. `.dark { }` — all dark mode CSS variable overrides (see Section 2)
3. `* { font-family: 'IBM Plex Sans', sans-serif; }` — global font reset
4. `.font-mono-display { font-family: 'DM Mono', monospace; }` — utility class
5. `.font-code { font-family: 'JetBrains Mono', monospace; }` — utility class
6. `.skill-list { max-height: 0; overflow: hidden; transition: max-height 0.2s ease-in-out; }` — skill expand base state
7. `.skill-list.expanded { max-height: 200px; }` — expanded state
8. `.modal-panel { transition: opacity 0.2s ease, transform 0.2s ease; }` — modal animation base
9. `.dropdown-menu { display: none; }` — dropdown hidden base
10. `.dropdown-menu.open { display: block; }` — dropdown visible state

### Internal `<script>` Block Structure
The JS block must be organized in this order:
1. `// --- DATA ---` — all hardcoded arrays (users, agents, skills, contracts, errors)
2. `// --- RENDER ---` — functions that build DOM from data arrays on page load
3. `// --- NAV ---` — section switching logic
4. `// --- DARK MODE ---` — toggle handler
5. `// --- DROPDOWNS ---` — open/close logic, outside-click listener
6. `// --- MODALS ---` — open/close functions, populate-from-data functions
7. `// --- SKILLS EXPAND ---` — expand/collapse per agent card
8. `// --- MARK RESOLVED ---` — error log DOM update
9. `// --- INIT ---` — calls render functions, sets default active section

---

## 9. Repository Structure

The agent must create the following repo tree exactly. Do not create files not listed here. Do not nest files differently than shown.

```
agenthub-admin/
│
├── index.html                  # Main entry point — the entire prototype lives here
│
├── assets/
│   ├── css/
│   │   └── variables.css       # CSS custom properties (:root and .dark blocks only)
│   │                           # Imported via <link> in index.html <head>
│   │
│   ├── js/
│   │   ├── data.js             # All hardcoded data arrays (users, agents, skills, contracts, errors)
│   │   ├── render.js           # DOM rendering functions — builds tables/cards from data.js
│   │   ├── nav.js              # Section switching + top bar title update
│   │   ├── darkmode.js         # Dark mode toggle logic
│   │   ├── dropdowns.js        # Dropdown open/close + outside-click listener
│   │   ├── modals.js           # Modal open/close + data population
│   │   └── interactions.js     # Skill expand/collapse + mark-as-resolved
│   │
│   └── icons/
│       └── icons.js            # Inline SVG strings exported as JS constants
│                               # (e.g. export const iconUsers = `<svg ...>...</svg>`)
│
├── README.md                   # Setup instructions and prototype overview
└── spec.md                     # This specification document (copied here by agent)
```

### File Responsibilities

**`index.html`**
- The browser entry point
- Contains the full HTML shell: `<html>`, `<head>`, `<body>`
- `<head>` loads in this order:
  1. Meta tags
  2. `<link>` to `assets/css/variables.css`
  3. Tailwind config `<script>` block (`darkMode: 'class'`)
  4. Tailwind CDN `<script>`
  5. Google Fonts `<link>`
- `<body>` contains: sidebar, top bar, all 6 `<section>` elements, all modals
- At bottom of `<body>`, scripts loaded in this order:
  1. `assets/js/icons.js`
  2. `assets/js/data.js`
  3. `assets/js/render.js`
  4. `assets/js/nav.js`
  5. `assets/js/darkmode.js`
  6. `assets/js/dropdowns.js`
  7. `assets/js/modals.js`
  8. `assets/js/interactions.js`
- All `<script>` tags use `defer` attribute — NO `type="module"` (keeps it openable as a plain file)

**`assets/css/variables.css`**
- Contains only `:root { }` and `.dark { }` CSS variable blocks (see Section 2)
- Contains global font reset and custom utility classes (`.font-mono-display`, `.font-code`, `.skill-list`, `.modal-panel`, `.dropdown-menu`)
- Contains NO Tailwind directives — this is plain CSS only

**`assets/js/data.js`**
- Declares all hardcoded data as global `const` arrays (no `export` — plain `<script defer>` loading)
- Variables: `const USERS = [...]`, `const AGENTS = [...]`, `const SKILLS = [...]`, `const CONTRACTS = [...]`, `const ERRORS = [...]`
- Each object in each array includes ALL fields needed by both the table row AND the detail modal for that entity

**`assets/js/render.js`**
- One render function per section: `renderUsers()`, `renderAgents()`, `renderSkills()`, `renderContracts()`, `renderErrors()`
- Each function reads from its corresponding data array and injects HTML into the relevant container element by ID
- Called once on page load from the last `<script>` tag in `index.html` or from an `init()` call

**`assets/js/nav.js`**
- Exports nothing — attaches click listeners to all `nav-*` elements on load
- On click: hides all sections, shows target section, updates active class on nav items, updates `#topbar-title` text

**`assets/js/darkmode.js`**
- Attaches click listener to `#dark-mode-toggle`
- Toggles `dark` class on `document.documentElement`
- Updates button icon and label text

**`assets/js/dropdowns.js`**
- Manages all `⋮` action dropdown menus
- Uses event delegation on `document` — listens for clicks, matches `.dropdown-trigger` class
- Closes all open dropdowns before opening the clicked one
- Outside-click listener closes any open dropdown

**`assets/js/modals.js`**
- One open function per modal: `openUserModal(index)`, `openAgentModal(index)`, `openSkillModal(index)`, `openContractModal(index)`, `openErrorModal(index)`
- Each function pulls from the relevant data array by index and populates modal fields
- One shared `closeModal(modalId)` function handles all closes
- Backdrop click listeners attached per modal on load

**`assets/js/interactions.js`**
- `initSkillToggles()` — attaches expand/collapse listeners to all agent card expand controls
- `initMarkResolved()` — attaches "Mark as resolved" listeners to error log dropdown items, updates DOM on click

**`assets/icons/icons.js`**
- Plain JS file declaring SVG strings as global `const` variables
- Naming: `const ICON_DASHBOARD`, `const ICON_USERS`, `const ICON_AGENTS`, etc.
- Used by `render.js` and directly in `index.html` for sidebar icons
- All SVGs sized at `18×18`, `viewBox="0 0 24 24"`, stroke-based (Heroicons outline style)

**`README.md`**
```markdown
# AgentHub Admin Panel — Prototype

A fully hardcoded HTML prototype of the AgentHub internal admin panel.

## How to run
Open `index.html` in any modern browser. No build step required.

## Structure
- `index.html` — entry point
- `assets/css/` — CSS variables and custom utilities
- `assets/js/` — modular JS files (data, rendering, interactions)
- `assets/icons/` — inline SVG icon constants

## Notes
- All data is hardcoded. No API connections.
- Dark mode toggle is in the top bar.
- Built as a prototype for internal review only.
```

**`spec.md`**
- The agent copies this specification document into the repo root as `spec.md`
- No modifications — exact copy

---

### What the Agent Must NOT Create
- No `node_modules/`
- No `package.json` or `package-lock.json`
- No `tailwind.config.js` (config is inline in `index.html`)
- No `.gitignore` (unless explicitly asked)
- No `dist/` or `build/` folders
- No additional HTML pages beyond `index.html`
- No TypeScript files
- No framework config files (no `vite.config`, `webpack.config`, etc.)

---

## 10. File Delivery

- **Repo root folder name:** `agenthub-admin/`
- **Browser entry point:** `agenthub-admin/index.html` — must open directly in browser with no server
- **CDN dependencies (runtime only):**
  - `https://cdn.tailwindcss.com`
  - `https://fonts.googleapis.com`
- All JS files use plain `<script defer src="...">` tags — no ES modules, no bundler

---

## 11. Acceptance Criteria

```
✅ All 6 nav sections render and switch without page reload
✅ Active nav item is visually highlighted in sidebar
✅ Top bar section title updates when nav changes
✅ Dark mode toggles entire interface via `dark` class on <html>
✅ Dark mode persists across section switches within the session
✅ All 4 metric cards render with correct hardcoded values on Dashboard
✅ Weekly activity SVG bar chart renders with labeled axes and legend
✅ User Management table shows all 8 users with correct badges
✅ "View detail" opens user modal with that user's data populated
✅ Modal closes via × button
✅ Modal closes via backdrop click
✅ Action dropdown opens on ⋮ click and closes on outside click
✅ Only one dropdown is open at a time
✅ Agent Management shows all 6 agents as cards
✅ Skills expand/collapse with smooth animation per agent card
✅ Configure modal shows system prompt in monospace code block
✅ Skills section shows explainer banner above table
✅ Contracts table shows all 6 rows with correct data
✅ Contract detail modal shows itemized skill pricing
✅ Error Log table shows all 8 errors with color-coded type badges
✅ "Mark as resolved" updates row status in the DOM
✅ Error detail modal shows full stack trace in monospace block
✅ No horizontal scroll on 1280px+ viewport
✅ No broken layout on 768px viewport (scrollable if needed)
✅ All font families load from Google Fonts
```

---

## 12. Edge Cases & Constraints

- **No persistence:** All state (resolved errors, etc.) resets on page reload. This is expected.
- **No real deletions:** "Delete" menu items exist for visual completeness only. They must not remove rows from the DOM.
- **No form inputs:** No create/edit forms are in scope for this prototype.
- **Dropdown z-index:** Ensure dropdowns render above table row borders (`z-30`), modals above everything (`z-50`), backdrops below modals but above content (`z-40`).
- **Modal scroll:** Modal inner content must scroll independently if content exceeds viewport height (`max-h-[85vh] overflow-y-auto`).
- **Tailwind dark mode:** Must use `darkMode: 'class'` config — do NOT use `media` strategy.
- **Font fallbacks:** If Google Fonts fails to load, fallback to `monospace` for DM Mono / JetBrains Mono, `sans-serif` for IBM Plex Sans.
- **SVG chart:** Must render in both light and dark mode. Use CSS variables or conditional Tailwind classes for gridline/label colors.