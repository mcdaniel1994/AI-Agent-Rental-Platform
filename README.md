# AI Agent Rental Platform

AgentHub is a prototype internal dashboard for managing rented AI agents, their skills, customer contracts, and operational health.

The current repository focuses on a frontend-only admin experience built with static data and modular vanilla JavaScript.

## Current Status

- Prototype stage: no backend, no API calls, no persistence.
- Primary deliverable in this repo: AgentHub Admin panel.
- UI behaviors are fully interactive for demo and portfolio review.

## Quick Start

1. Clone this repository.
2. Open `agenthub-admin/index.html` in a modern browser.
3. Use the sidebar to navigate sections and test interactions:
   - Dropdown actions
   - Modal views
   - Dark mode toggle
   - Skill expand/collapse
   - Mark error as resolved (session-only)

## Repository Layout

```
.
├── README.md
├── spec.md
└── agenthub-admin/
	├── index.html
	├── README.md
	├── spec.md
	└── assets/
		├── css/
		├── icons/
		└── js/
```

## What Is Implemented

- Dashboard metrics and weekly activity chart
- User management table with detail modal
- Agent management cards with configurable system prompt modal
- Skills registry table with detail modal
- Contract table with detailed pricing modal
- Error log with detail modal and mark-resolved action
- Shared interaction patterns: navigation, dropdowns, modals, dark mode

## Tech Stack

- HTML
- Tailwind CSS (CDN)
- Vanilla JavaScript modules loaded with `defer`
- CSS variables for light/dark theme tokens

## Limitations

- Hardcoded data only (`agenthub-admin/assets/js/data.js`)
- No auth, database, backend services, or deployment pipeline
- State changes (for example, marking an error resolved) reset on refresh

## Documentation

- App implementation guide: `agenthub-admin/README.md`
- Build specification (root): `spec.md`
- Build specification (app folder): `agenthub-admin/spec.md`

## 📌 About This Project

A project built during the AI Engineering program at 4Geeks Academy. [![4Geeks Academy](https://img.shields.io/badge/AI%20Engineering-4Geeks%20Academy-orange)](https://4geeksacademy.com/)


## 👋 About Me

**Cory McDaniel**  
AI Engineer - Dallas-Fort Worth, TX

Former controls engineer. Now building AI systems that help small businesses save time through automation.

- [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/corymcdanielai/)
- 📧 corymcdaniel01@gmail.com
- 📍 Dallas-Fort Worth, TX
