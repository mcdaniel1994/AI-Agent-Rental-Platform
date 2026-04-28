function initSkillToggles() {
  document.querySelectorAll(".skill-toggle").forEach(function (toggleButton) {
    toggleButton.addEventListener("click", function () {
      const index = toggleButton.getAttribute("data-agent-index");
      const list = document.getElementById("skills-" + index);
      const arrow = document.getElementById("toggle-arrow-" + index);
      if (!list || !arrow) {
        return;
      }

      const expanded = list.classList.toggle("expanded");
      arrow.style.transform = expanded ? "rotate(90deg)" : "rotate(0deg)";
    });
  });
}

function initMarkResolved() {
  document.addEventListener("click", function (event) {
    const resolveAction = event.target.closest(".action-resolve-error");
    if (!resolveAction) {
      return;
    }

    const index = Number(resolveAction.getAttribute("data-index"));
    if (Number.isNaN(index) || !ERRORS[index]) {
      return;
    }

    ERRORS[index].status = "Resolved";
    const statusCell = document.getElementById("error-status-" + index);
    if (statusCell) {
      statusCell.innerHTML = getErrorStatusMarkup("Resolved");
    }
    closeAllDropdowns();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderAllSections();
  initNavigation();
  initDarkMode();
  initDropdowns();
  initModalActionHandlers();
  initModalCloseHandlers();
  initSkillToggles();
  initMarkResolved();
});
