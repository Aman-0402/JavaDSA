export function getCurrentLessonId(defaultId) {
  const hash = window.location.hash.replace("#", "");
  return hash || defaultId;
}

export function navigateToLesson(lessonId) {
  window.location.hash = lessonId;
}

export function onRouteChange(handler) {
  window.addEventListener("hashchange", () => {
    handler(getCurrentLessonId());
  });
}
