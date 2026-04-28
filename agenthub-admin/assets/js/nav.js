const SECTION_CONFIG = [
  { key: "dashboard", title: "Dashboard" },
  { key: "users", title: "User Management" },
  { key: "agents", title: "Agent Management" },
  { key: "skills", title: "Skills" },
  { key: "contracts", title: "Agent Contracts" },
  { key: "errors", title: "Error Log" }
];

function setActiveNav(sectionKey) {
  SECTION_CONFIG.forEach(function (section) {
    const navButton = document.getElementById("nav-" + section.key);
    if (!navButton) {
      return;
    }

    const isActive = section.key === sectionKey;
    navButton.classList.remove(
      "text-white",
      "bg-white/10",
      "border-[var(--sidebar-active)]",
      "text-[var(--sidebar-muted)]",
      "hover:bg-white/5",
      "hover:text-white",
      "border-transparent"
    );

    if (isActive) {
      navButton.classList.add("text-white", "bg-white/10", "border-[var(--sidebar-active)]");
    } else {
      navButton.classList.add("text-[var(--sidebar-muted)]", "hover:bg-white/5", "hover:text-white", "border-transparent");
    }
  });
}

function setVisibleSection(sectionKey) {
  SECTION_CONFIG.forEach(function (section) {
    const element = document.getElementById("section-" + section.key);
    if (!element) {
      return;
    }

    if (section.key === sectionKey) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  });
}

function updateTopbarTitle(sectionKey) {
  const config = SECTION_CONFIG.find(function (section) {
    return section.key === sectionKey;
  });
  const titleElement = document.getElementById("topbar-title");
  if (!titleElement || !config) {
    return;
  }

  titleElement.textContent = config.title;
}

function showSection(sectionKey) {
  setVisibleSection(sectionKey);
  setActiveNav(sectionKey);
  updateTopbarTitle(sectionKey);
}

function initNavigation() {
  SECTION_CONFIG.forEach(function (section) {
    const navButton = document.getElementById("nav-" + section.key);
    if (!navButton) {
      return;
    }

    navButton.addEventListener("click", function () {
      showSection(section.key);
    });
  });

  showSection("dashboard");
}
