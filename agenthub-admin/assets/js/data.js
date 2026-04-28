const USERS = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@nexaflow.com",
    plan: "Enterprise",
    status: "Active",
    memberSince: "2023-11-08",
    activeAgents: 12,
    totalSpend: "$32,400",
    notes: "Primary operations lead at NexaFlow with multi-agent reporting workflows."
  },
  {
    name: "Marcus Webb",
    email: "m.webb@orbitaltech.io",
    plan: "Pro",
    status: "Active",
    memberSince: "2024-02-14",
    activeAgents: 5,
    totalSpend: "$11,250",
    notes: "Uses scheduling and web monitoring agents for launch coordination."
  },
  {
    name: "Priya Nair",
    email: "priya@stacklabs.dev",
    plan: "Starter",
    status: "Suspended",
    memberSince: "2024-06-30",
    activeAgents: 1,
    totalSpend: "$1,290",
    notes: "Account temporarily suspended pending billing verification."
  },
  {
    name: "James Okafor",
    email: "j.okafor@cloudnine.ai",
    plan: "Enterprise",
    status: "Active",
    memberSince: "2023-08-22",
    activeAgents: 9,
    totalSpend: "$26,980",
    notes: "Runs analytics-heavy contracts tied to database and document tooling."
  },
  {
    name: "Elena Vasquez",
    email: "evasquez@bridgeops.com",
    plan: "Pro",
    status: "Active",
    memberSince: "2024-01-19",
    activeAgents: 4,
    totalSpend: "$8,740",
    notes: "Support automation account with periodic contract refreshes."
  },
  {
    name: "Tom Lindqvist",
    email: "tom.l@finvault.co",
    plan: "Starter",
    status: "Pending",
    memberSince: "2025-04-12",
    activeAgents: 0,
    totalSpend: "$0",
    notes: "New account pending first contract approval and identity review."
  },
  {
    name: "Aiko Tanaka",
    email: "a.tanaka@synthai.jp",
    plan: "Enterprise",
    status: "Active",
    memberSince: "2023-12-01",
    activeAgents: 7,
    totalSpend: "$18,560",
    notes: "Finance-focused deployment with strict data quality requirements."
  },
  {
    name: "Diego Ruiz",
    email: "diego@automate.mx",
    plan: "Pro",
    status: "Suspended",
    memberSince: "2024-03-10",
    activeAgents: 3,
    totalSpend: "$6,980",
    notes: "Suspended after repeated OAuth failures pending security rotation."
  }
];

const AGENTS = [
  {
    name: "Nexus-7",
    owner: "Sarah Chen",
    status: "Active",
    skills: ["Web Browsing", "Document Reader", "Email Composer"],
    systemPrompt:
      "You are Nexus-7, an intelligent research assistant deployed for NexaFlow Inc. Prioritize reliable web sources and summarize findings into concise operational briefings. When confidence is low, provide assumptions and recommended next checks."
  },
  {
    name: "Orbital Scout",
    owner: "Marcus Webb",
    status: "Active",
    skills: ["Web Browsing", "Calendar Manager"],
    systemPrompt:
      "You are Orbital Scout, a launch coordination assistant. Track schedule-critical updates from approved sources and map them to calendar events with explicit time zones. Flag possible conflicts and suggest next actions."
  },
  {
    name: "DataMiner Pro",
    owner: "James Okafor",
    status: "Failing",
    skills: ["Database Query", "Document Reader", "Data Formatter"],
    systemPrompt:
      "You are DataMiner Pro, an analytics execution agent. Build read-only SQL queries that answer business questions with minimal latency and clear traceability. If a query risks timeout, propose an optimized plan before execution."
  },
  {
    name: "FinBot Alpha",
    owner: "Aiko Tanaka",
    status: "Active",
    skills: ["Financial Analyzer", "Document Reader"],
    systemPrompt:
      "You are FinBot Alpha, a financial analysis agent. Extract key ratios and trend indicators from approved data feeds and uploaded documents. Present output in audit-friendly tables with explicit source references."
  },
  {
    name: "SupportBot v2",
    owner: "Elena Vasquez",
    status: "Inactive",
    skills: ["Email Composer", "Calendar Manager"],
    systemPrompt:
      "You are SupportBot v2, a support operations assistant. Draft customer-ready responses in a helpful and concise tone, then queue follow-ups in calendar workflows. Avoid sending any message without final human approval."
  },
  {
    name: "AutomateX",
    owner: "Diego Ruiz",
    status: "Failing",
    skills: ["Web Browsing", "Data Formatter", "Task Scheduler"],
    systemPrompt:
      "You are AutomateX, a workflow automation agent. Orchestrate repetitive tasks across web, formatting, and scheduling tools while respecting platform rate limits. When a dependency fails, stop safely and return a recovery checklist."
  }
];

const SKILLS = [
  {
    name: "Web Browsing",
    description:
      "Allows the agent to search and retrieve content from the internet in real time.",
    agentsEnabled: 18,
    dateAdded: "2024-01-10",
    permissionsRequired: "network_access: true"
  },
  {
    name: "Document Reader",
    description:
      "Enables parsing and extracting structured data from uploaded PDFs and DOCX files.",
    agentsEnabled: 24,
    dateAdded: "2024-01-18",
    permissionsRequired: "file_read: true, ocr_access: true"
  },
  {
    name: "Email Composer",
    description:
      "Grants ability to draft, format, and prepare emails for human review or auto-send.",
    agentsEnabled: 11,
    dateAdded: "2024-02-02",
    permissionsRequired: "email_draft: true"
  },
  {
    name: "Calendar Manager",
    description:
      "Allows reading and writing to connected calendar services (Google, Outlook).",
    agentsEnabled: 9,
    dateAdded: "2024-02-26",
    permissionsRequired: "calendar_read: true, calendar_write: true"
  },
  {
    name: "Database Query",
    description:
      "Enables running read-only SQL queries against a connected data source.",
    agentsEnabled: 6,
    dateAdded: "2024-03-11",
    permissionsRequired: "db_readonly: true"
  },
  {
    name: "Data Formatter",
    description:
      "Transforms raw output into structured formats: JSON, CSV, or Markdown tables.",
    agentsEnabled: 14,
    dateAdded: "2024-03-21",
    permissionsRequired: "transform_write: true"
  },
  {
    name: "Task Scheduler",
    description:
      "Lets agents create and manage time-based tasks and reminders on behalf of a user.",
    agentsEnabled: 5,
    dateAdded: "2024-04-04",
    permissionsRequired: "scheduler_write: true"
  }
];

const CONTRACTS = [
  {
    client: "NexaFlow Inc.",
    agent: "Nexus-7",
    skills: ["Web Browsing", "Document Reader", "Email Composer"],
    startDate: "Jan 1, 2025",
    endDate: "Jun 30, 2025",
    totalPaid: "$4,200",
    itemizedSkills: [
      { skill: "Web Browsing", price: "$800/mo" },
      { skill: "Document Reader", price: "$600/mo" },
      { skill: "Email Composer", price: "$500/mo" }
    ]
  },
  {
    client: "Orbital Technologies",
    agent: "Orbital Scout",
    skills: ["Web Browsing", "Calendar Manager"],
    startDate: "Feb 15, 2025",
    endDate: "Aug 14, 2025",
    totalPaid: "$2,800",
    itemizedSkills: [
      { skill: "Web Browsing", price: "$800/mo" },
      { skill: "Calendar Manager", price: "$600/mo" }
    ]
  },
  {
    client: "CloudNine AI",
    agent: "DataMiner Pro",
    skills: ["Database Query", "Document Reader", "Data Formatter"],
    startDate: "Mar 1, 2025",
    endDate: "Feb 28, 2026",
    totalPaid: "$9,600",
    itemizedSkills: [
      { skill: "Database Query", price: "$1,100/mo" },
      { skill: "Document Reader", price: "$600/mo" },
      { skill: "Data Formatter", price: "$700/mo" }
    ]
  },
  {
    client: "SynthAI Japan",
    agent: "FinBot Alpha",
    skills: ["Financial Analyzer", "Document Reader"],
    startDate: "Jan 15, 2025",
    endDate: "Jul 14, 2025",
    totalPaid: "$5,100",
    itemizedSkills: [
      { skill: "Financial Analyzer", price: "$1,300/mo" },
      { skill: "Document Reader", price: "$600/mo" }
    ]
  },
  {
    client: "BridgeOps LLC",
    agent: "SupportBot v2",
    skills: ["Email Composer", "Calendar Manager"],
    startDate: "Apr 1, 2025",
    endDate: "Sep 30, 2025",
    totalPaid: "$3,400",
    itemizedSkills: [
      { skill: "Email Composer", price: "$500/mo" },
      { skill: "Calendar Manager", price: "$600/mo" }
    ]
  },
  {
    client: "Automate.mx",
    agent: "AutomateX",
    skills: ["Web Browsing", "Data Formatter", "Task Scheduler"],
    startDate: "May 1, 2025",
    endDate: "Oct 31, 2025",
    totalPaid: "$4,750",
    itemizedSkills: [
      { skill: "Web Browsing", price: "$800/mo" },
      { skill: "Data Formatter", price: "$700/mo" },
      { skill: "Task Scheduler", price: "$450/mo" }
    ]
  }
];

const ERRORS = [
  {
    timestamp: "2025-05-14 09:12:03",
    agent: "DataMiner Pro",
    errorType: "TIMEOUT",
    description:
      "Database query exceeded 30s limit on report generation task.",
    status: "Unresolved",
    trace:
      "AgentRuntime.execute()\n  -> ToolDispatcher.call(\"db_query\")\n    -> DBConnector.run(query)\n      -> TimeoutError: exceeded 30000ms\n      at DBConnector.run (db.js:88:13)\n      at async DataMinerTask.generate (task.js:42:9)"
  },
  {
    timestamp: "2025-05-14 07:55:41",
    agent: "AutomateX",
    errorType: "AUTH_FAILURE",
    description: "OAuth token expired for connected calendar service.",
    status: "Unresolved",
    trace:
      "AgentRuntime.execute()\n  -> OAuthClient.refreshToken()\n    -> AuthProvider.exchange()\n      -> AuthError: invalid_grant\n      at OAuthClient.refreshToken (auth.js:61:17)\n      at async SchedulerAdapter.sync (scheduler.js:27:5)"
  },
  {
    timestamp: "2025-05-13 22:30:17",
    agent: "Nexus-7",
    errorType: "PARSE_ERROR",
    description:
      "Failed to extract structured data from malformed PDF input.",
    status: "Resolved",
    trace:
      "AgentRuntime.execute()\n  -> DocumentReader.parse(file)\n    -> PdfTokenizer.tokenize()\n      -> ParseError: unexpected xref table\n      at PdfTokenizer.tokenize (pdf.js:144:11)\n      at async DocumentReader.parse (reader.js:53:7)"
  },
  {
    timestamp: "2025-05-13 18:04:52",
    agent: "AutomateX",
    errorType: "RATE_LIMIT",
    description:
      "Web browsing tool hit provider rate limit after 50 requests.",
    status: "Resolved",
    trace:
      "AgentRuntime.execute()\n  -> WebTool.search(query)\n    -> ProviderClient.request()\n      -> RateLimitError: 429 too_many_requests\n      at ProviderClient.request (provider.js:119:15)\n      at async WebTool.search (web.js:31:9)"
  },
  {
    timestamp: "2025-05-13 11:28:09",
    agent: "DataMiner Pro",
    errorType: "TIMEOUT",
    description:
      "Secondary DB query timed out during financial aggregation.",
    status: "Unresolved",
    trace:
      "AgentRuntime.execute()\n  -> Pipeline.runStage(\"aggregation\")\n    -> DBConnector.run(query)\n      -> TimeoutError: read timeout after 30s\n      at QueryRunner.execute (query.js:97:14)\n      at async Pipeline.runStage (pipeline.js:74:5)"
  },
  {
    timestamp: "2025-05-12 16:43:31",
    agent: "SupportBot v2",
    errorType: "NULL_RESPONSE",
    description:
      "Email composer returned empty output on draft request.",
    status: "Resolved",
    trace:
      "AgentRuntime.execute()\n  -> EmailComposer.compose(payload)\n    -> TemplateEngine.render()\n      -> NullResponseError: renderer returned empty content\n      at EmailComposer.compose (email.js:45:13)\n      at async TicketFlow.draftReply (tickets.js:132:9)"
  },
  {
    timestamp: "2025-05-12 08:17:22",
    agent: "FinBot Alpha",
    errorType: "AUTH_FAILURE",
    description: "API key revoked for external financial data provider.",
    status: "Unresolved",
    trace:
      "AgentRuntime.execute()\n  -> FinancialAdapter.fetchQuotes()\n    -> ProviderClient.authenticate()\n      -> AuthError: key_revoked\n      at ProviderClient.authenticate (finance-provider.js:33:11)\n      at async FinancialAdapter.fetchQuotes (finance.js:89:7)"
  },
  {
    timestamp: "2025-05-11 14:55:00",
    agent: "Orbital Scout",
    errorType: "PARSE_ERROR",
    description:
      "Calendar event payload missing required start_time field.",
    status: "Resolved",
    trace:
      "AgentRuntime.execute()\n  -> CalendarManager.createEvent(payload)\n    -> SchemaValidator.validate(\"calendar_event\")\n      -> ParseError: missing required field 'start_time'\n      at SchemaValidator.validate (schema.js:58:12)\n      at async CalendarManager.createEvent (calendar.js:71:9)"
  }
];
