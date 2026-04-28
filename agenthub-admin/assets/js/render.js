function getUserStatusBadgeClass(status) {
  if (status === "Active") {
    return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
  }
  if (status === "Suspended") {
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  }
  return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
}

function getPlanBadgeClass(plan) {
  if (plan === "Enterprise") {
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
  }
  if (plan === "Pro") {
    return "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400";
  }
  return "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400";
}

function getAgentStatusBadgeClass(status) {
  if (status === "Active") {
    return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
  }
  if (status === "Failing") {
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  }
  return "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400";
}

function getAgentStatusDotClass(status) {
  if (status === "Active") {
    return "bg-green-500";
  }
  if (status === "Failing") {
    return "bg-red-500";
  }
  return "bg-zinc-500";
}

function getErrorTypeBadgeClass(type) {
  if (type === "TIMEOUT") {
    return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
  }
  if (type === "AUTH_FAILURE") {
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  }
  if (type === "PARSE_ERROR") {
    return "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400";
  }
  if (type === "RATE_LIMIT") {
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
  }
  return "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400";
}

function getErrorStatusMarkup(status) {
  const isResolved = status === "Resolved";
  const colorClass = isResolved ? "text-[var(--success)]" : "text-[var(--danger)]";
  return '<span class="' + colorClass + ' text-sm font-medium"><span aria-hidden="true" class="mr-1">&middot;</span>' + status + "</span>";
}

function inferContractStatus(endDate) {
  const now = new Date();
  const parsedEndDate = new Date(endDate + " 23:59:59");
  return parsedEndDate > now ? "Active" : "Completed";
}

function renderUsers() {
  const tbody = document.getElementById("tbody-users");
  if (!tbody) {
    return;
  }

  tbody.innerHTML = USERS.map(function (user, index) {
    return (
      '<tr class="border-b border-[var(--border)] hover:bg-[var(--bg-elevated)] transition-colors">' +
      '<td class="px-4 py-3 text-[var(--text-primary)] font-medium">' + user.name + "</td>" +
      '<td class="px-4 py-3 text-[var(--text-secondary)]">' + user.email + "</td>" +
      '<td class="px-4 py-3"><span class="text-xs font-medium px-2 py-0.5 rounded-full ' + getPlanBadgeClass(user.plan) + '">' + user.plan + "</span></td>" +
      '<td class="px-4 py-3"><span class="text-xs font-medium px-2 py-0.5 rounded-full ' + getUserStatusBadgeClass(user.status) + '">' + user.status + "</span></td>" +
      '<td class="px-4 py-3 text-right">' +
      '<div class="relative inline-block text-left">' +
      '<button type="button" class="dropdown-trigger cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" data-dropdown="dropdown-users-' + index + '" aria-label="Open actions">&#8942;</button>' +
      '<div id="dropdown-users-' + index + '" class="dropdown-menu absolute right-0 mt-1 w-40 bg-[var(--bg-surface)] border border-[var(--border)] rounded-md shadow-lg ring-1 ring-black/5 z-30">' +
      '<button type="button" class="action-view-user cursor-pointer block w-full px-3 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]" data-index="' + index + '">View detail</button>' +
      '<button type="button" class="cursor-pointer block w-full px-3 py-2 text-left text-sm text-[var(--danger)] hover:bg-[var(--bg-elevated)]" data-index="' + index + '">Delete</button>' +
      "</div>" +
      "</div>" +
      "</td>" +
      "</tr>"
    );
  }).join("");
}

function renderAgents() {
  const list = document.getElementById("agent-list");
  if (!list) {
    return;
  }

  list.innerHTML = AGENTS.map(function (agent, index) {
    const skillsMarkup = agent.skills
      .map(function (skill) {
        return '<span class="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)]">' + skill + "</span>";
      })
      .join("");

    return (
      '<article class="bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-4 mb-3 shadow-sm">' +
      '<div class="flex items-start justify-between gap-3">' +
      '<div class="min-w-0">' +
      '<div class="flex items-center gap-2">' +
      '<span class="h-2 w-2 rounded-full ' + getAgentStatusDotClass(agent.status) + '"></span>' +
      '<h3 class="text-sm font-semibold text-[var(--text-primary)]">' + agent.name + "</h3>" +
      "</div>" +
      '<p class="text-sm text-[var(--text-secondary)] mt-1">Owner: ' + agent.owner + ' <span class="mx-1">&middot;</span> <span class="text-xs font-medium px-2 py-0.5 rounded-full ' + getAgentStatusBadgeClass(agent.status) + '">' + agent.status + "</span></p>" +
      "</div>" +
      '<div class="relative">' +
      '<button type="button" class="dropdown-trigger cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" data-dropdown="dropdown-agents-' + index + '" aria-label="Open actions">&#8942;</button>' +
      '<div id="dropdown-agents-' + index + '" class="dropdown-menu absolute right-0 mt-1 w-40 bg-[var(--bg-surface)] border border-[var(--border)] rounded-md shadow-lg ring-1 ring-black/5 z-30">' +
      '<button type="button" class="action-configure-agent cursor-pointer block w-full px-3 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]" data-index="' + index + '">Configure</button>' +
      '<button type="button" class="cursor-pointer block w-full px-3 py-2 text-left text-sm text-[var(--danger)] hover:bg-[var(--bg-elevated)]" data-index="' + index + '">Delete</button>' +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="mt-3 border-t border-[var(--border)] pt-3">' +
      '<button type="button" class="skill-toggle cursor-pointer text-xs text-[var(--text-secondary)] flex items-center gap-1 select-none" data-agent-index="' + index + '">' +
      '<span id="toggle-arrow-' + index + '" class="inline-flex">' + ICON_CHEVRON_RIGHT + "</span>" +
      "Skills" +
      "</button>" +
      '<div id="skills-' + index + '" class="skill-list mt-2 flex flex-wrap gap-1.5">' + skillsMarkup + "</div>" +
      "</div>" +
      "</article>"
    );
  }).join("");
}

function renderSkills() {
  const tbody = document.getElementById("tbody-skills");
  if (!tbody) {
    return;
  }

  tbody.innerHTML = SKILLS.map(function (skill, index) {
    return (
      '<tr class="border-b border-[var(--border)] hover:bg-[var(--bg-elevated)] transition-colors">' +
      '<td class="px-4 py-3 text-[var(--text-primary)] font-medium">' + skill.name + "</td>" +
      '<td class="px-4 py-3 text-[var(--text-secondary)]">' + skill.description + "</td>" +
      '<td class="px-4 py-3 text-[var(--text-secondary)]"><span class="font-medium text-[var(--text-primary)]">' + skill.agentsEnabled + '</span> agents</td>' +
      '<td class="px-4 py-3 text-right">' +
      '<div class="relative inline-block text-left">' +
      '<button type="button" class="dropdown-trigger cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" data-dropdown="dropdown-skills-' + index + '" aria-label="Open actions">&#8942;</button>' +
      '<div id="dropdown-skills-' + index + '" class="dropdown-menu absolute right-0 mt-1 w-40 bg-[var(--bg-surface)] border border-[var(--border)] rounded-md shadow-lg ring-1 ring-black/5 z-30">' +
      '<button type="button" class="action-view-skill cursor-pointer block w-full px-3 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]" data-index="' + index + '">View detail</button>' +
      '<button type="button" class="cursor-pointer block w-full px-3 py-2 text-left text-sm text-[var(--danger)] hover:bg-[var(--bg-elevated)]" data-index="' + index + '">Delete</button>' +
      "</div>" +
      "</div>" +
      "</td>" +
      "</tr>"
    );
  }).join("");
}

function renderContracts() {
  const tbody = document.getElementById("tbody-contracts");
  if (!tbody) {
    return;
  }

  tbody.innerHTML = CONTRACTS.map(function (contract, index) {
    return (
      '<tr class="border-b border-[var(--border)] hover:bg-[var(--bg-elevated)] transition-colors">' +
      '<td class="px-4 py-3 text-[var(--text-primary)] font-medium">' + contract.client + "</td>" +
      '<td class="px-4 py-3 text-[var(--text-secondary)]">' + contract.agent + "</td>" +
      '<td class="px-4 py-3 text-[var(--text-secondary)]">' + contract.skills.join(", ") + "</td>" +
      '<td class="px-4 py-3 text-[var(--text-secondary)]">' + contract.startDate + "</td>" +
      '<td class="px-4 py-3 text-[var(--text-secondary)]">' + contract.endDate + "</td>" +
      '<td class="px-4 py-3 text-[var(--text-primary)] font-medium">' + contract.totalPaid + "</td>" +
      '<td class="px-4 py-3 text-right">' +
      '<div class="relative inline-block text-left">' +
      '<button type="button" class="dropdown-trigger cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" data-dropdown="dropdown-contracts-' + index + '" aria-label="Open actions">&#8942;</button>' +
      '<div id="dropdown-contracts-' + index + '" class="dropdown-menu absolute right-0 mt-1 w-40 bg-[var(--bg-surface)] border border-[var(--border)] rounded-md shadow-lg ring-1 ring-black/5 z-30">' +
      '<button type="button" class="action-view-contract cursor-pointer block w-full px-3 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]" data-index="' + index + '">View detail</button>' +
      "</div>" +
      "</div>" +
      "</td>" +
      "</tr>"
    );
  }).join("");
}

function renderErrors() {
  const tbody = document.getElementById("tbody-errors");
  if (!tbody) {
    return;
  }

  tbody.innerHTML = ERRORS.map(function (errorRecord, index) {
    return (
      '<tr class="border-b border-[var(--border)] hover:bg-[var(--bg-elevated)] transition-colors">' +
      '<td class="px-4 py-3 text-[var(--text-secondary)] font-code text-xs">' + errorRecord.timestamp + "</td>" +
      '<td class="px-4 py-3 text-[var(--text-primary)] font-medium">' + errorRecord.agent + "</td>" +
      '<td class="px-4 py-3"><span class="text-xs font-code font-medium px-2 py-0.5 rounded-full ' + getErrorTypeBadgeClass(errorRecord.errorType) + '">' + errorRecord.errorType + "</span></td>" +
      '<td class="px-4 py-3 text-[var(--text-secondary)]">' + errorRecord.description + "</td>" +
      '<td id="error-status-' + index + '" class="px-4 py-3">' + getErrorStatusMarkup(errorRecord.status) + "</td>" +
      '<td class="px-4 py-3 text-right">' +
      '<div class="relative inline-block text-left">' +
      '<button type="button" class="dropdown-trigger cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" data-dropdown="dropdown-errors-' + index + '" aria-label="Open actions">&#8942;</button>' +
      '<div id="dropdown-errors-' + index + '" class="dropdown-menu absolute right-0 mt-1 w-40 bg-[var(--bg-surface)] border border-[var(--border)] rounded-md shadow-lg ring-1 ring-black/5 z-30">' +
      '<button type="button" class="action-view-error cursor-pointer block w-full px-3 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]" data-index="' + index + '">View detail</button>' +
      '<button type="button" class="action-resolve-error cursor-pointer block w-full px-3 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]" data-index="' + index + '">Mark as resolved</button>' +
      "</div>" +
      "</div>" +
      "</td>" +
      "</tr>"
    );
  }).join("");
}

function renderStaticIcons() {
  const iconTargets = [
    ["icon-nav-dashboard", ICON_DASHBOARD],
    ["icon-nav-users", ICON_USERS],
    ["icon-nav-agents", ICON_AGENTS],
    ["icon-nav-skills", ICON_SKILLS],
    ["icon-nav-contracts", ICON_CONTRACTS],
    ["icon-nav-errors", ICON_ERRORS],
    ["metric-icon-revenue", ICON_DOLLAR],
    ["metric-icon-discount", ICON_TAG],
    ["metric-icon-active", ICON_AGENTS],
    ["metric-icon-failing", ICON_EXCLAMATION_CIRCLE],
    ["icon-skills-banner", ICON_INFO]
  ];

  iconTargets.forEach(function (pair) {
    const element = document.getElementById(pair[0]);
    if (element) {
      element.innerHTML = pair[1];
    }
  });
}

function renderAllSections() {
  renderStaticIcons();
  renderUsers();
  renderAgents();
  renderSkills();
  renderContracts();
  renderErrors();
}
