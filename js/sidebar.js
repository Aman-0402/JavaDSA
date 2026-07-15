import { isLessonCompleted, getOverallProgress, getLeetcodeProgress } from "./progress.js";
import { allTopicIds, allLeetcodeIds } from "./content-loader.js";

export function renderSidebar(roadmap, activeLessonId, onSelect) {
  const nav = document.getElementById("sidebarNav");
  nav.innerHTML = "";

  roadmap.modules.forEach((mod, modIdx) => {
    const modWrap = document.createElement("div");
    modWrap.className = "nav-module";

    const header = document.createElement("button");
    header.className = "nav-module-header";
    header.innerHTML = `<i data-lucide="chevron-down" class="icon chevron"></i><span>${mod.title}</span>`;

    const topicsWrap = document.createElement("div");
    topicsWrap.className = "nav-topics";

    mod.topics.forEach((topic) => {
      const link = document.createElement("button");
      const completed = isLessonCompleted(topic.lesson);
      link.className = "nav-topic-link" + (topic.lesson === activeLessonId ? " active" : "") + (completed ? " completed" : "");
      link.innerHTML = `<span class="status-dot"></span><span class="topic-title">${topic.title}</span>`;
      link.addEventListener("click", () => onSelect(topic.lesson));
      topicsWrap.appendChild(link);
    });

    header.addEventListener("click", () => {
      header.classList.toggle("collapsed");
      topicsWrap.classList.toggle("collapsed");
    });

    modWrap.appendChild(header);
    modWrap.appendChild(topicsWrap);
    nav.appendChild(modWrap);
  });

  if (window.lucide) window.lucide.createIcons();
  updateOverallProgress(roadmap);
  updateLeetcodeProgress(roadmap);
}

export function updateOverallProgress(roadmap) {
  const ids = allTopicIds(roadmap);
  const pct = getOverallProgress(ids);
  const fill = document.getElementById("progressFill");
  const label = document.getElementById("progressLabelValue");
  if (fill) fill.style.width = `${pct}%`;
  if (label) label.textContent = `${pct}%`;
}

export async function updateLeetcodeProgress(roadmap) {
  const label = document.getElementById("lcProgressLabelValue");
  if (!label) return;
  const ids = await allLeetcodeIds(roadmap);
  const { done, total } = getLeetcodeProgress(ids);
  label.textContent = `${done}/${total}`;
}
