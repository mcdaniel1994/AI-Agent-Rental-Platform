function updateDarkModeToggleUI() {
  const iconTarget = document.getElementById("dark-mode-icon");
  const labelTarget = document.getElementById("dark-mode-label");
  if (!iconTarget || !labelTarget) {
    return;
  }

  const isDark = document.documentElement.classList.contains("dark");
  iconTarget.innerHTML = isDark ? ICON_SUN : ICON_MOON;
  labelTarget.textContent = isDark ? "Light" : "Dark";
}

function initDarkMode() {
  const toggleButton = document.getElementById("dark-mode-toggle");
  if (!toggleButton) {
    return;
  }

  toggleButton.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark");
    updateDarkModeToggleUI();
  });

  updateDarkModeToggleUI();
}
