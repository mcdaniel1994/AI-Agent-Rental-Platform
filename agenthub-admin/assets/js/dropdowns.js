function closeAllDropdowns() {
  document.querySelectorAll(".dropdown-menu.open").forEach(function (menu) {
    menu.classList.remove("open");
  });
}

function initDropdowns() {
  document.addEventListener("click", function (event) {
    const trigger = event.target.closest(".dropdown-trigger");
    const clickedMenu = event.target.closest(".dropdown-menu");

    if (trigger) {
      event.preventDefault();
      const targetMenuId = trigger.getAttribute("data-dropdown");
      const targetMenu = targetMenuId ? document.getElementById(targetMenuId) : null;
      if (!targetMenu) {
        return;
      }

      const alreadyOpen = targetMenu.classList.contains("open");
      closeAllDropdowns();
      if (!alreadyOpen) {
        targetMenu.classList.add("open");
      }
      return;
    }

    if (!clickedMenu) {
      closeAllDropdowns();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeAllDropdowns();
    }
  });
}
