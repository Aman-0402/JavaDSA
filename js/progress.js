import { getJSON, setJSON } from "./storage.js";

function getState() {
  return getJSON("progress", { completedLessons: {}, retyped: {}, viewedSections: {}, solvedLeetcode: {} });
}

function saveState(state) {
  setJSON("progress", state);
}

export function markRetyped(retypeId) {
  const state = getState();
  state.retyped[retypeId] = true;
  saveState(state);
}

export function isRetyped(retypeId) {
  return !!getState().retyped[retypeId];
}

export function markLessonViewed(lessonId) {
  const state = getState();
  state.viewedSections[lessonId] = true;
  saveState(state);
}

export function checkLessonCompletion(lesson) {
  const state = getState();
  const requiredRetypes = lesson.completionRules?.requireRetypeIds || [];
  const allRetyped = requiredRetypes.every((id) => state.retyped[id]);
  const viewed = !!state.viewedSections[lesson.id];
  const complete = viewed && allRetyped;
  if (complete) {
    state.completedLessons[lesson.id] = true;
    saveState(state);
  }
  return complete;
}

export function isLessonCompleted(lessonId) {
  return !!getState().completedLessons[lessonId];
}

export function getOverallProgress(allLessonIds) {
  const state = getState();
  const total = allLessonIds.length || 1;
  const done = allLessonIds.filter((id) => state.completedLessons[id]).length;
  return Math.round((done / total) * 100);
}

export function isLcSolved(lcId) {
  const state = getState();
  return !!(state.solvedLeetcode && state.solvedLeetcode[lcId]);
}

export function toggleLcSolved(lcId) {
  const state = getState();
  if (!state.solvedLeetcode) state.solvedLeetcode = {};
  if (state.solvedLeetcode[lcId]) delete state.solvedLeetcode[lcId];
  else state.solvedLeetcode[lcId] = true;
  saveState(state);
  return !!state.solvedLeetcode[lcId];
}

export function getLeetcodeProgress(allLcIds) {
  const state = getState();
  const solved = state.solvedLeetcode || {};
  const total = allLcIds.length;
  const done = allLcIds.filter((id) => solved[id]).length;
  return { done, total };
}
