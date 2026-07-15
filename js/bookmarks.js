import { getJSON, setJSON } from "./storage.js";

function getState() {
  return getJSON("bookmarks", {});
}

export function isBookmarked(lessonId) {
  return !!getState()[lessonId];
}

export function toggleBookmark(lessonId) {
  const state = getState();
  if (state[lessonId]) delete state[lessonId];
  else state[lessonId] = true;
  setJSON("bookmarks", state);
  return !!state[lessonId];
}

export function getAllBookmarks() {
  return Object.keys(getState());
}
