import { getJSON, setJSON } from "./storage.js";

function getState() {
  return getJSON("notes", {});
}

export function getNote(lessonId) {
  return getState()[lessonId] || "";
}

export function setNote(lessonId, text) {
  const state = getState();
  if (text.trim().length === 0) delete state[lessonId];
  else state[lessonId] = text;
  setJSON("notes", state);
}
