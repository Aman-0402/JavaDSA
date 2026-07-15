export async function loadRoadmap() {
  const res = await fetch("data/roadmap.json");
  if (!res.ok) throw new Error("Failed to load roadmap.json");
  return res.json();
}

const lessonCache = new Map();

export async function loadLesson(lessonId) {
  if (lessonCache.has(lessonId)) return lessonCache.get(lessonId);
  const res = await fetch(`data/lessons/${lessonId}.json`);
  if (!res.ok) throw new Error(`Failed to load lesson: ${lessonId}`);
  const data = await res.json();
  lessonCache.set(lessonId, data);
  return data;
}

export function allTopicIds(roadmap) {
  const ids = [];
  for (const mod of roadmap.modules) {
    for (const topic of mod.topics) ids.push(topic.lesson);
  }
  return ids;
}

let leetcodeIdsCache = null;

export async function allLeetcodeIds(roadmap) {
  if (leetcodeIdsCache) return leetcodeIdsCache;
  const lessonIds = allTopicIds(roadmap);
  const lessons = await Promise.all(lessonIds.map((id) => loadLesson(id).catch(() => null)));
  const ids = [];
  for (const lesson of lessons) {
    if (!lesson?.sections) continue;
    for (const section of lesson.sections) {
      if (section.type === "leetcode") ids.push(section.id);
    }
  }
  leetcodeIdsCache = ids;
  return ids;
}
