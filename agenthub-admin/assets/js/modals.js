function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) {
    return;
  }

  modal.classList.remove("hidden");
  const panel = modal.querySelector(".modal-panel");
  const backdrop = modal.querySelector("[data-modal-backdrop]");

  if (panel) {
    panel.classList.remove("opacity-100", "scale-100");
    panel.classList.add("opacity-0", "scale-95");
  }
  if (backdrop) {
    backdrop.classList.remove("opacity-100");
    backdrop.classList.add("opacity-0");
  }

  requestAnimationFrame(function () {
    if (panel) {
      panel.classList.remove("opacity-0", "scale-95");
      panel.classList.add("opacity-100", "scale-100");
    }
    if (backdrop) {
      backdrop.classList.remove("opacity-0");
      backdrop.classList.add("opacity-100");
    }
  });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) {
    return;
  }

  const panel = modal.querySelector(".modal-panel");
  const backdrop = modal.querySelector("[data-modal-backdrop]");
  if (panel) {
    panel.classList.remove("opacity-100", "scale-100");
    panel.classList.add("opacity-0", "scale-95");
  }
  if (backdrop) {
    backdrop.classList.remove("opacity-100");
    backdrop.classList.add("opacity-0");
  }

  window.setTimeout(function () {
    modal.classList.add("hidden");
  }, 180);
}

function openUserModal(index) {
  const user = USERS[index];
  if (!user) {
    return;
  }

  document.getElementById("user-modal-title").textContent = user.name;
  document.getElementById("user-full-name").textContent = user.name;
  document.getElementById("user-email").textContent = user.email;
  document.getElementById("user-plan").textContent = user.plan;
  document.getElementById("user-status").textContent = user.status;
  document.getElementById("user-member-since").textContent = user.memberSince;
  document.getElementById("user-active-agents").textContent = String(user.activeAgents);
  document.getElementById("user-total-spend").textContent = user.totalSpend;
  document.getElementById("user-notes").textContent = user.notes;

  openModal("modal-user-detail");
}

function openAgentModal(index) {
  const agent = AGENTS[index];
  if (!agent) {
    return;
  }

  document.getElementById("agent-modal-title").textContent = "Configure - " + agent.name;
  document.getElementById("agent-system-prompt").textContent = agent.systemPrompt;

  openModal("modal-agent-configure");
}

function openSkillModal(index) {
  const skill = SKILLS[index];
  if (!skill) {
    return;
  }

  document.getElementById("skill-modal-title").textContent = skill.name;
  document.getElementById("skill-name").textContent = skill.name;
  document.getElementById("skill-description").textContent = skill.description;
  document.getElementById("skill-enabled-count").textContent = String(skill.agentsEnabled);
  document.getElementById("skill-date-added").textContent = skill.dateAdded;
  document.getElementById("skill-permissions").textContent = skill.permissionsRequired;

  openModal("modal-skill-detail");
}

function openContractModal(index) {
  const contract = CONTRACTS[index];
  if (!contract) {
    return;
  }

  document.getElementById("contract-modal-title").textContent = "Contract - " + contract.client + " / " + contract.agent;
  document.getElementById("contract-client").textContent = contract.client;
  document.getElementById("contract-agent").textContent = contract.agent;
  document.getElementById("contract-status").textContent = inferContractStatus(contract.endDate);
  document.getElementById("contract-start").textContent = contract.startDate;
  document.getElementById("contract-end").textContent = contract.endDate;

  const itemizedBody = document.getElementById("contract-itemized");
  itemizedBody.innerHTML = contract.itemizedSkills
    .map(function (item) {
      return (
        '<tr class="border-b border-[var(--border)]">' +
        '<td class="py-2 text-sm text-[var(--text-primary)]">' + item.skill + "</td>" +
        '<td class="py-2 text-sm text-right text-[var(--text-secondary)]">' + item.price + "</td>" +
        "</tr>"
      );
    })
    .join("");

  document.getElementById("contract-total").textContent = contract.totalPaid;

  openModal("modal-contract-detail");
}

function openErrorModal(index) {
  const errorRecord = ERRORS[index];
  if (!errorRecord) {
    return;
  }

  document.getElementById("error-modal-title").textContent = "Error - " + errorRecord.errorType + " - " + errorRecord.agent;
  document.getElementById("error-timestamp").textContent = errorRecord.timestamp;
  document.getElementById("error-agent").textContent = errorRecord.agent;

  const typeBadge = document.getElementById("error-type");
  typeBadge.textContent = errorRecord.errorType;
  typeBadge.className = "text-xs font-code font-medium px-2 py-0.5 rounded-full " + getErrorTypeBadgeClass(errorRecord.errorType);

  document.getElementById("error-status").textContent = errorRecord.status;
  document.getElementById("error-description").textContent = errorRecord.description;
  document.getElementById("error-trace").textContent = errorRecord.trace;

  openModal("modal-error-detail");
}

function initModalActionHandlers() {
  document.addEventListener("click", function (event) {
    const userTrigger = event.target.closest(".action-view-user");
    if (userTrigger) {
      closeAllDropdowns();
      openUserModal(Number(userTrigger.getAttribute("data-index")));
      return;
    }

    const agentTrigger = event.target.closest(".action-configure-agent");
    if (agentTrigger) {
      closeAllDropdowns();
      openAgentModal(Number(agentTrigger.getAttribute("data-index")));
      return;
    }

    const skillTrigger = event.target.closest(".action-view-skill");
    if (skillTrigger) {
      closeAllDropdowns();
      openSkillModal(Number(skillTrigger.getAttribute("data-index")));
      return;
    }

    const contractTrigger = event.target.closest(".action-view-contract");
    if (contractTrigger) {
      closeAllDropdowns();
      openContractModal(Number(contractTrigger.getAttribute("data-index")));
      return;
    }

    const errorTrigger = event.target.closest(".action-view-error");
    if (errorTrigger) {
      closeAllDropdowns();
      openErrorModal(Number(errorTrigger.getAttribute("data-index")));
    }
  });
}

function initModalCloseHandlers() {
  const closeMappings = [
    ["close-modal-user", "modal-user-detail"],
    ["close-modal-agent", "modal-agent-configure"],
    ["close-modal-skill", "modal-skill-detail"],
    ["close-modal-contract", "modal-contract-detail"],
    ["close-modal-error", "modal-error-detail"]
  ];

  closeMappings.forEach(function (mapping) {
    const button = document.getElementById(mapping[0]);
    if (!button) {
      return;
    }

    button.addEventListener("click", function () {
      closeModal(mapping[1]);
    });
  });

  const backdropMappings = [
    ["backdrop-user", "modal-user-detail"],
    ["backdrop-agent", "modal-agent-configure"],
    ["backdrop-skill", "modal-skill-detail"],
    ["backdrop-contract", "modal-contract-detail"],
    ["backdrop-error", "modal-error-detail"]
  ];

  backdropMappings.forEach(function (mapping) {
    const backdrop = document.getElementById(mapping[0]);
    if (!backdrop) {
      return;
    }

    backdrop.addEventListener("click", function (event) {
      if (event.target === backdrop) {
        closeModal(mapping[1]);
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    [
      "modal-user-detail",
      "modal-agent-configure",
      "modal-skill-detail",
      "modal-contract-detail",
      "modal-error-detail"
    ].forEach(function (modalId) {
      const modal = document.getElementById(modalId);
      if (modal && !modal.classList.contains("hidden")) {
        closeModal(modalId);
      }
    });
  });
}
