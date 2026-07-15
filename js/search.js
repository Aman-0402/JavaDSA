export function setupSidebarSearch() {
  const input = document.getElementById("sidebarSearchInput");
  if (!input) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll(".nav-topic-link").forEach((el) => {
      const title = el.querySelector(".topic-title").textContent.toLowerCase();
      el.style.display = !q || title.includes(q) ? "flex" : "none";
    });
  });
}
